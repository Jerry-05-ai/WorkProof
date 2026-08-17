// server/models/InternalProject.js
// Company-scoped internal projects (distinct from the per-employee `projects`
// portfolio table). Backs the Company Dashboard → Projects page and the
// monthly project report.
//
// Rewritten to call Firebase Data Connect instead of raw MySQL. The old
// ensureTable() / CREATE TABLE IF NOT EXISTS no longer applies — the table is
// defined declaratively in dataconnect/schema/schema.gql.

import { getDC } from '../config/dataconnect.js';
import {
  listInternalProjectsByCompany,
  getInternalProjectById,
  createInternalProject as gqlCreateInternalProject,
  updateInternalProject as gqlUpdateInternalProject,
  softDeleteInternalProject,
} from '@dataconnect/admin-generated';
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

function shapeProjectRow(p) {
  if (!p) return null;
  return {
    id: p.id,
    company_id: p.companyId,
    name: p.name,
    description: p.description,
    department: p.department,
    client_name: p.clientName,
    start_date: p.startDate,
    end_date: p.endDate,
    priority: p.priority,
    status: p.status,
    project_lead: p.projectLead,
    required_roles: p.requiredRoles,
    open_positions: p.openPositions ?? 0,
    filled_positions: p.filledPositions ?? 0,
    tasks_completed: p.tasksCompleted ?? 0,
    tasks_remaining: p.tasksRemaining ?? 0,
    progress: p.progress ?? 0,
    assigned_recruiters: p.assignedRecruiters,
    assigned_employees: p.assignedEmployees,
    documents: p.documents,
    created_by: p.createdBy ?? null,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  };
}

export const InternalProject = {
  STATUSES,
  PRIORITIES,

  // The Data Connect table is defined in schema.gql; no ensureTable() needed.

  async listForCompany(companyId) {
    const { data } = await listInternalProjectsByCompany(getDC(), { companyId });
    return (data.internalProjects || []).map(shapeProjectRow);
  },

  async findForCompany(id, companyId) {
    const { data } = await getInternalProjectById(getDC(), { id, companyId });
    const row = data.internalProject ?? null;
    if (!row || row.deletedAt) return null;
    return shapeProjectRow(row);
  },

  async create(companyId, createdBy, data) {
    const status = STATUSES.includes(data.status) ? data.status : 'not_started';
    const priority = PRIORITIES.includes(data.priority) ? data.priority : 'medium';

    const { data: result } = await gqlCreateInternalProject(getDC(), {
      companyId,
      name: normalize(data.name),
      description: data.description ?? null,
      department: data.department ? normalize(data.department) : null,
      clientName: data.client_name ? normalize(data.client_name) : null,
      startDate: data.start_date || null,
      endDate: data.end_date || null,
      priority,
      status,
      projectLead: data.project_lead ? normalize(data.project_lead) : null,
      requiredRoles: data.required_roles ?? null,
      openPositions: clampInt(data.open_positions) ?? 0,
      filledPositions: clampInt(data.filled_positions) ?? 0,
      tasksCompleted: clampInt(data.tasks_completed) ?? 0,
      tasksRemaining: clampInt(data.tasks_remaining) ?? 0,
      progress: clampInt(data.progress, 0, 100) ?? 0,
      assignedRecruiters: jsonOrNull(data.assigned_recruiters),
      assignedEmployees: jsonOrNull(data.assigned_employees),
      documents: jsonOrNull(data.documents),
      createdBy: createdBy ?? null,
    });
    return result.internalProject_insert.id;
  },

  async update(id, companyId, data) {
    const updateData = {};

    const textFields = ['name', 'description', 'department', 'client_name', 'project_lead', 'required_roles'];
    const textKeyMap = {
      client_name: 'clientName',
      project_lead: 'projectLead',
      required_roles: 'requiredRoles',
    };
    for (const field of textFields) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const key = textKeyMap[field] || field;
        updateData[key] = data[field] === '' ? null : data[field];
      }
    }

    for (const field of ['start_date', 'end_date']) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const key = field === 'start_date' ? 'startDate' : 'endDate';
        updateData[key] = data[field] || null;
      }
    }

    if (Object.prototype.hasOwnProperty.call(data, 'status') && STATUSES.includes(data.status)) {
      updateData.status = data.status;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'priority') && PRIORITIES.includes(data.priority)) {
      updateData.priority = data.priority;
    }

    const intKeyMap = {
      open_positions: 'openPositions',
      filled_positions: 'filledPositions',
      tasks_completed: 'tasksCompleted',
      tasks_remaining: 'tasksRemaining',
    };
    for (const field of Object.keys(intKeyMap)) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        updateData[intKeyMap[field]] = clampInt(data[field]) ?? 0;
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'progress')) {
      updateData.progress = clampInt(data.progress, 0, 100) ?? 0;
    }

    const jsonKeyMap = {
      assigned_recruiters: 'assignedRecruiters',
      assigned_employees: 'assignedEmployees',
      documents: 'documents',
    };
    for (const field of Object.keys(jsonKeyMap)) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        updateData[jsonKeyMap[field]] = jsonOrNull(data[field]);
      }
    }

    if (Object.keys(updateData).length > 0) {
      await gqlUpdateInternalProject(getDC(), { id, ...updateData });
    }
  },

  async softDelete(id, companyId) {
    await softDeleteInternalProject(getDC(), { id });
  },

  publicShape(p) {
    const open = Number(p.open_positions ?? 0);
    const filled = Number(p.filled_positions ?? 0);
    return {
      id: p.id,
      company_id: p.company_id,
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
      created_by: p.created_by !== null && p.created_by !== undefined ? p.created_by : null,
      created_at: p.created_at,
      updated_at: p.updated_at,
    };
  },
};