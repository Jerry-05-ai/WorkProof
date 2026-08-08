// server/models/InternalProject.js
// Company-scoped internal projects (distinct from the per-employee `projects`
// portfolio table). Backs the Company Dashboard → Projects page and the
// monthly project report. Follows the same conventions as the other models.

import { query } from '../config/database.js';
import { normalize, toIntOrNull } from '../utils/helpers.js';

const STATUSES = ['not_started', 'recruiting', 'in_progress', 'on_hold', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];

function safeJsonArray(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function jsonOrNull(value) {
  if (value === null || value === undefined) return null;
  const arr = Array.isArray(value) ? value : safeJsonArray(value);
  return JSON.stringify(arr);
}

function clampInt(value, min = 0, max = null) {
  const n = toIntOrNull(value);
  if (n === null) return null;
  let out = n;
  if (min !== null && out < min) out = min;
  if (max !== null && out > max) out = max;
  return out;
}

export const InternalProject = {
  STATUSES,
  PRIORITIES,

  // Idempotently ensure the backing table exists. Mirrors database/schema.sql
  // and database/migrations/2026_08_01_internal_projects.sql exactly. Called at
  // server startup so the Projects + Monthly Report features work even on a
  // database that was created before this migration was applied.
  async ensureTable() {
    await query(`
      CREATE TABLE IF NOT EXISTS internal_projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        company_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        department VARCHAR(150),
        client_name VARCHAR(255),
        start_date DATE,
        end_date DATE,
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        status ENUM('not_started', 'recruiting', 'in_progress', 'on_hold', 'completed') DEFAULT 'not_started',
        project_lead VARCHAR(255),
        required_roles TEXT,
        open_positions INT DEFAULT 0,
        filled_positions INT DEFAULT 0,
        tasks_completed INT DEFAULT 0,
        tasks_remaining INT DEFAULT 0,
        progress INT DEFAULT 0,
        assigned_recruiters JSON,
        assigned_employees JSON,
        documents JSON,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_company (company_id),
        INDEX idx_status (status),
        INDEX idx_priority (priority)
      )
    `);
  },

  async listForCompany(companyId) {
    const rows = await query(
      `SELECT * FROM internal_projects
       WHERE company_id = ? AND deleted_at IS NULL
       ORDER BY COALESCE(start_date, created_at) DESC, id DESC`,
      [companyId]
    );
    return rows.map(InternalProject.publicShape);
  },

  async findForCompany(id, companyId) {
    const rows = await query(
      `SELECT * FROM internal_projects
       WHERE id = ? AND company_id = ? AND deleted_at IS NULL
       LIMIT 1`,
      [id, companyId]
    );
    return rows.length ? InternalProject.publicShape(rows[0]) : null;
  },

  async create(companyId, createdBy, data) {
    const status = STATUSES.includes(data.status) ? data.status : 'not_started';
    const priority = PRIORITIES.includes(data.priority) ? data.priority : 'medium';

    const result = await query(
      `INSERT INTO internal_projects
        (company_id, name, description, department, client_name, start_date, end_date,
         priority, status, project_lead, required_roles, open_positions, filled_positions,
         tasks_completed, tasks_remaining, progress, assigned_recruiters, assigned_employees,
         documents, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        normalize(data.name),
        data.description ?? null,
        data.department ? normalize(data.department) : null,
        data.client_name ? normalize(data.client_name) : null,
        data.start_date || null,
        data.end_date || null,
        priority,
        status,
        data.project_lead ? normalize(data.project_lead) : null,
        data.required_roles ?? null,
        clampInt(data.open_positions) ?? 0,
        clampInt(data.filled_positions) ?? 0,
        clampInt(data.tasks_completed) ?? 0,
        clampInt(data.tasks_remaining) ?? 0,
        clampInt(data.progress, 0, 100) ?? 0,
        jsonOrNull(data.assigned_recruiters),
        jsonOrNull(data.assigned_employees),
        jsonOrNull(data.documents),
        createdBy ?? null,
      ]
    );
    return result.insertId;
  },

  async update(id, companyId, data) {
    const sets = [];
    const params = [];

    const textFields = ['name', 'description', 'department', 'client_name', 'project_lead', 'required_roles'];
    for (const field of textFields) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(data[field] === '' ? null : data[field]);
      }
    }

    for (const field of ['start_date', 'end_date']) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(data[field] || null);
      }
    }

    if (Object.prototype.hasOwnProperty.call(data, 'status') && STATUSES.includes(data.status)) {
      sets.push('status = ?');
      params.push(data.status);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'priority') && PRIORITIES.includes(data.priority)) {
      sets.push('priority = ?');
      params.push(data.priority);
    }

    for (const field of ['open_positions', 'filled_positions', 'tasks_completed', 'tasks_remaining']) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(clampInt(data[field]) ?? 0);
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'progress')) {
      sets.push('progress = ?');
      params.push(clampInt(data.progress, 0, 100) ?? 0);
    }

    for (const field of ['assigned_recruiters', 'assigned_employees', 'documents']) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(jsonOrNull(data[field]));
      }
    }

    if (!sets.length) return;
    params.push(id, companyId);
    await query(
      `UPDATE internal_projects SET ${sets.join(', ')} WHERE id = ? AND company_id = ? AND deleted_at IS NULL`,
      params
    );
  },

  async softDelete(id, companyId) {
    await query(
      `UPDATE internal_projects SET deleted_at = NOW() WHERE id = ? AND company_id = ? AND deleted_at IS NULL`,
      [id, companyId]
    );
  },

  publicShape(p) {
    const open = Number(p.open_positions ?? 0);
    const filled = Number(p.filled_positions ?? 0);
    return {
      id: Number(p.id),
      company_id: Number(p.company_id),
      name: p.name,
      description: p.description,
      department: p.department,
      client_name: p.client_name,
      start_date: p.start_date,
      end_date: p.end_date,
      priority: p.priority,
      status: p.status,
      project_lead: p.project_lead,
      required_roles: p.required_roles,
      open_positions: open,
      filled_positions: filled,
      remaining_positions: Math.max(0, open - filled),
      tasks_completed: Number(p.tasks_completed ?? 0),
      tasks_remaining: Number(p.tasks_remaining ?? 0),
      progress: Number(p.progress ?? 0),
      assigned_recruiters: safeJsonArray(p.assigned_recruiters),
      assigned_employees: safeJsonArray(p.assigned_employees),
      documents: safeJsonArray(p.documents),
      created_by: p.created_by !== null && p.created_by !== undefined ? Number(p.created_by) : null,
      created_at: p.created_at,
      updated_at: p.updated_at,
    };
  },
};
