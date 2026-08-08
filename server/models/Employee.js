// server/models/Employee.js
import { query, queryOne } from '../config/database.js';
import { normalize, normalizeEmail, toBool, toIntOrNull } from '../utils/helpers.js';

export const Employee = {
  async findForCompany(id, companyId) {
    return queryOne(
      'SELECT * FROM employees WHERE id = ? AND company_id = ? AND deleted_at IS NULL',
      [id, companyId]
    );
  },

  // filters: search, department, employment_status, is_verified
  async listForCompany(companyId, filters = {}) {
    let sql = 'SELECT * FROM employees WHERE company_id = ? AND deleted_at IS NULL';
    const params = [companyId];

    if (filters.search) {
      sql += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR job_title LIKE ?)';
      const like = `%${filters.search}%`;
      params.push(like, like, like, like);
    }
    if (filters.department) {
      sql += ' AND department = ?';
      params.push(filters.department);
    }
    if (filters.employment_status) {
      sql += ' AND employment_status = ?';
      params.push(filters.employment_status);
    }
    if (filters.is_verified !== undefined && filters.is_verified !== '') {
      sql += ' AND is_verified = ?';
      params.push(toBool(filters.is_verified) ? 1 : 0);
    }

    sql += ' ORDER BY created_at DESC';
    return query(sql, params);
  },

  async create(companyId, data) {
    // Treat empty strings the same as missing values. Optional DATE/INT columns
    // (start_date, manager_id) reject '' in MySQL (ER_TRUNCATED_WRONG_VALUE),
    // so coerce blanks to null / sensible defaults before insert.
    const blankToNull = (v) => (v === undefined || v === null || v === '' ? null : v);
    const startDate = blankToNull(data.start_date) ?? new Date().toISOString().slice(0, 10);

    const result = await query(
      `INSERT INTO employees
        (company_id, first_name, last_name, email, phone, job_title, department,
         employment_type, employment_status, start_date, manager_id, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        normalize(data.first_name),
        normalize(data.last_name),
        normalizeEmail(data.email),
        blankToNull(data.phone),
        normalize(data.job_title),
        normalize(data.department),
        blankToNull(data.employment_type) ?? 'full_time',
        blankToNull(data.employment_status) ?? 'active',
        startDate,
        blankToNull(data.manager_id),
        blankToNull(data.location),
      ]
    );
    return result.insertId;
  },

  async update(id, companyId, data) {
    const allowed = [
      'first_name', 'last_name', 'phone', 'job_title', 'department',
      'employment_type', 'employment_status', 'start_date', 'end_date',
      'manager_id', 'location', 'profile_photo',
    ];
    const sets = [];
    const params = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(data[field] === '' ? null : data[field]);
      }
    }
    if (!sets.length) return;
    params.push(id, companyId);
    await query(`UPDATE employees SET ${sets.join(', ')} WHERE id = ? AND company_id = ?`, params);
  },

  async softDelete(id, companyId) {
    await query(
      `UPDATE employees SET deleted_at = NOW(), employment_status = 'terminated'
       WHERE id = ? AND company_id = ?`,
      [id, companyId]
    );
  },

  async setVerified(id, companyId, verifiedByUserId) {
    await query(
      `UPDATE employees SET is_verified = 1, verified_at = NOW(), verified_by = ?
       WHERE id = ? AND company_id = ?`,
      [verifiedByUserId, id, companyId]
    );
  },

  async emailExistsInCompany(email, companyId) {
    const row = await queryOne(
      'SELECT 1 AS x FROM employees WHERE email = ? AND company_id = ? AND deleted_at IS NULL LIMIT 1',
      [normalizeEmail(email), companyId]
    );
    return !!row;
  },

  publicShape(e) {
    return {
      id: Number(e.id),
      user_id: e.user_id !== null && e.user_id !== undefined ? Number(e.user_id) : null,
      company_id: Number(e.company_id),
      first_name: e.first_name,
      last_name: e.last_name,
      full_name: `${e.first_name} ${e.last_name}`.trim(),
      email: e.email,
      phone: e.phone,
      job_title: e.job_title,
      department: e.department,
      employment_type: e.employment_type,
      employment_status: e.employment_status,
      start_date: e.start_date,
      end_date: e.end_date,
      manager_id: e.manager_id !== null && e.manager_id !== undefined ? Number(e.manager_id) : null,
      location: e.location,
      profile_photo: e.profile_photo,
      is_verified: toBool(e.is_verified),
      verified_at: e.verified_at,
    };
  },
};
