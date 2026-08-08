// server/models/VerificationCorrection.js
import { query, queryOne } from '../config/database.js';

export const CORRECTABLE_FIELDS = [
  'first_name', 'last_name', 'job_title', 'department',
  'employment_type', 'start_date', 'end_date', 'location',
];

export const VerificationCorrection = {
  CORRECTABLE_FIELDS,

  async create(employeeId, companyId, requestedBy, data) {
    const result = await query(
      `INSERT INTO verification_corrections
        (employee_id, company_id, field_name, old_value, new_value, reason, status, requested_by)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [
        employeeId,
        companyId,
        data.field_name,
        data.old_value ?? null,
        data.new_value ?? null,
        data.reason ?? null,
        requestedBy,
      ]
    );
    return result.insertId;
  },

  async findById(id) {
    return queryOne('SELECT * FROM verification_corrections WHERE id = ? LIMIT 1', [id]);
  },

  async listForEmployee(employeeId, status = null) {
    let sql = 'SELECT * FROM verification_corrections WHERE employee_id = ?';
    const params = [employeeId];
    if (status !== null) {
      sql += ' AND status = ?';
      params.push(status);
    }
    sql += ' ORDER BY created_at DESC';
    const rows = await query(sql, params);
    return rows.map(VerificationCorrection.publicShape);
  },

  async listForCompany(companyId, status = null) {
    let sql = 'SELECT * FROM verification_corrections WHERE company_id = ?';
    const params = [companyId];
    if (status !== null) {
      sql += ' AND status = ?';
      params.push(status);
    }
    sql += ' ORDER BY created_at DESC';
    const rows = await query(sql, params);
    return rows.map(VerificationCorrection.publicShape);
  },

  async setStatus(id, status, reviewedBy) {
    await query(
      'UPDATE verification_corrections SET status = ?, reviewed_by = ? WHERE id = ?',
      [status, reviewedBy, id]
    );
  },

  async applyToEmployee(correction) {
    const field = correction.field_name;
    if (!CORRECTABLE_FIELDS.includes(field)) {
      throw new Error('Field is not correctable: ' + field);
    }
    // Whitelisted column name is safe to interpolate.
    await query(
      `UPDATE employees SET ${field} = ? WHERE id = ? AND company_id = ?`,
      [correction.new_value, Number(correction.employee_id), Number(correction.company_id)]
    );
  },

  publicShape(c) {
    return {
      id: Number(c.id),
      employee_id: Number(c.employee_id),
      company_id: Number(c.company_id),
      field_name: c.field_name,
      old_value: c.old_value,
      new_value: c.new_value,
      reason: c.reason,
      status: c.status,
      requested_by: c.requested_by !== null && c.requested_by !== undefined ? Number(c.requested_by) : null,
      reviewed_by: c.reviewed_by !== null && c.reviewed_by !== undefined ? Number(c.reviewed_by) : null,
      created_at: c.created_at,
    };
  },
};
