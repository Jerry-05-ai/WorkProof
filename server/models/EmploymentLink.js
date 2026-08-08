// server/models/EmploymentLink.js
//
// Cross-company career history. WorkProof's original `employees` table stores
// ONE row per (person x company) and enforces a globally-unique email, so a
// person who works at Company A and is later hired by Company B needs a second
// employees row — but nothing in the base schema tied those two rows together
// as a single career, and email uniqueness blocked the second row entirely.
//
// This model adds an ADDITIVE join table that stitches every employment record
// a person has ever held into one permanent, read-only career timeline, keyed
// by the person's canonical (login) email. It never modifies existing tables,
// columns, endpoints, or data — it only records links as they are created.
//
// Each row = "this user held this employee record at this company for this
// span". Rows are append-only; leaving a company simply stamps left_at. The
// verified skills/projects/achievements themselves continue to live on their
// original employees row and remain untouched, which is exactly what makes the
// prior-employer history permanent and read-only.

import { query, queryOne } from '../config/database.js';
import { normalizeEmail, toBool } from '../utils/helpers.js';

export const EmploymentLink = {
  // Idempotently ensure the backing table exists. Follows the same
  // startup-migration convention as InternalProject.ensureTable() so the hiring
  // + career-history features work on databases created before this addition,
  // with no manual migration step required. Safe to call on every boot.
  async ensureTable() {
    await query(`
      CREATE TABLE IF NOT EXISTS employment_links (
        id INT PRIMARY KEY AUTO_INCREMENT,
        person_email VARCHAR(255) NOT NULL,
        user_id INT,
        employee_id INT NOT NULL,
        company_id INT NOT NULL,
        job_title VARCHAR(255),
        department VARCHAR(100),
        started_at DATE,
        left_at DATE,
        is_current BOOLEAN DEFAULT TRUE,
        source ENUM('invitation', 'direct_add', 'rehire', 'backfill') DEFAULT 'backfill',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_link (employee_id),
        INDEX idx_person (person_email),
        INDEX idx_user (user_id),
        INDEX idx_company (company_id),
        INDEX idx_current (is_current)
      )
    `);
  },

  // Backfill a link for an existing employees row if one is not present yet.
  // Lets the career timeline include employment that predates this feature.
  async ensureLinkForEmployee(employee, { source = 'backfill' } = {}) {
    if (!employee) return null;
    const employeeId = Number(employee.id);
    const existing = await queryOne(
      'SELECT * FROM employment_links WHERE employee_id = ? LIMIT 1',
      [employeeId]
    );
    if (existing) return existing;

    const isCurrent = employee.employment_status === 'active';
    await query(
      `INSERT INTO employment_links
        (person_email, user_id, employee_id, company_id, job_title, department, started_at, left_at, is_current, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        normalizeEmail(employee.email),
        employee.user_id !== null && employee.user_id !== undefined ? Number(employee.user_id) : null,
        employeeId,
        Number(employee.company_id),
        employee.job_title ?? null,
        employee.department ?? null,
        employee.start_date ?? null,
        employee.end_date ?? null,
        isCurrent ? 1 : 0,
        source,
      ]
    );
    return queryOne('SELECT * FROM employment_links WHERE employee_id = ? LIMIT 1', [employeeId]);
  },

  // Record a brand-new employment span (e.g. Company B hires the person).
  async create({ personEmail, userId, employeeId, companyId, jobTitle, department, startedAt, source = 'rehire' }) {
    await query(
      `INSERT INTO employment_links
        (person_email, user_id, employee_id, company_id, job_title, department, started_at, is_current, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE
         person_email = VALUES(person_email),
         user_id = VALUES(user_id),
         company_id = VALUES(company_id),
         job_title = VALUES(job_title),
         department = VALUES(department),
         started_at = VALUES(started_at),
         is_current = 1,
         source = VALUES(source)`,
      [
        normalizeEmail(personEmail),
        userId !== null && userId !== undefined ? Number(userId) : null,
        Number(employeeId),
        Number(companyId),
        jobTitle ?? null,
        department ?? null,
        startedAt ?? null,
        source,
      ]
    );
    return queryOne('SELECT * FROM employment_links WHERE employee_id = ? LIMIT 1', [Number(employeeId)]);
  },

  // Close out the current span for an employee record (they left the company).
  async markLeft(employeeId, leftAt) {
    await query(
      `UPDATE employment_links SET left_at = ?, is_current = 0 WHERE employee_id = ?`,
      [leftAt ?? null, Number(employeeId)]
    );
  },

  // Re-point every link for a person to their canonical login user id. Used when
  // a hire creates a fresh employees row but the login account is reused.
  async attachUserToPerson(personEmail, userId) {
    await query(
      `UPDATE employment_links SET user_id = ? WHERE person_email = ?`,
      [Number(userId), normalizeEmail(personEmail)]
    );
  },

  // All employment rows for a person, newest first — the permanent timeline.
  async listForPerson(personEmail) {
    return query(
      `SELECT el.*, c.name AS company_name
       FROM employment_links el
       LEFT JOIN companies c ON c.id = el.company_id
       WHERE el.person_email = ?
       ORDER BY el.is_current DESC, el.started_at DESC, el.id DESC`,
      [normalizeEmail(personEmail)]
    );
  },

  async currentForPerson(personEmail) {
    return queryOne(
      `SELECT * FROM employment_links WHERE person_email = ? AND is_current = 1 ORDER BY id DESC LIMIT 1`,
      [normalizeEmail(personEmail)]
    );
  },

  publicShape(row) {
    return {
      id: Number(row.id),
      employee_id: Number(row.employee_id),
      company_id: Number(row.company_id),
      company_name: row.company_name ?? null,
      job_title: row.job_title ?? null,
      department: row.department ?? null,
      started_at: row.started_at ?? null,
      left_at: row.left_at ?? null,
      is_current: toBool(row.is_current),
      source: row.source ?? null,
    };
  },
};
