// server/models/PrivacySettings.js
import { query, queryOne } from '../config/database.js';
import { toBool } from '../utils/helpers.js';

export const PRIVACY_FIELD_FLAGS = [
  'name_public', 'photo_public', 'role_public',
  'skills_public', 'skill_levels_public', 'skill_growth_public',
  'projects_public', 'project_descriptions_public',
  'achievements_public', 'experience_public',
  'performance_summary_public', 'monthly_progress_public',
  'behavior_summary_public',
];

export const PrivacySettings = {
  FIELD_FLAGS: PRIVACY_FIELD_FLAGS,

  async findByEmployee(employeeId) {
    return queryOne(
      `SELECT p.id AS privacy_id, p.*, e.employment_status, e.id AS employee_id
       FROM employees e
       LEFT JOIN privacy_settings p ON p.employee_id = e.id
       WHERE e.id = ? LIMIT 1`,
      [employeeId]
    );
  },

  async ensure(employeeId, companyId) {
    const existing = await PrivacySettings.findByEmployee(employeeId);
    if (existing && existing.privacy_id) return existing;
    await query(
      `INSERT INTO privacy_settings (employee_id, company_id, profile_visibility)
       VALUES (?, ?, 'private')`,
      [employeeId, companyId]
    );
    return PrivacySettings.findByEmployee(employeeId);
  },

  async update(employeeId, data) {
    const sets = [];
    const params = [];

    if (Object.prototype.hasOwnProperty.call(data, 'profile_visibility')) {
      const valid = ['private', 'public', 'limited'];
      if (valid.includes(data.profile_visibility)) {
        sets.push('profile_visibility = ?');
        params.push(data.profile_visibility);
      }
    }
    for (const flag of PRIVACY_FIELD_FLAGS) {
      if (Object.prototype.hasOwnProperty.call(data, flag)) {
        sets.push(`${flag} = ?`);
        params.push(data[flag] ? 1 : 0);
      }
    }
    if (!sets.length) return;
    params.push(employeeId);
    await query(`UPDATE privacy_settings SET ${sets.join(', ')} WHERE employee_id = ?`, params);
  },

  async transferOwnership(employeeId, companyId) {
    await PrivacySettings.ensure(employeeId, companyId);
    await query(
      `UPDATE privacy_settings
       SET is_employee_controlled = 1, ownership_transferred_at = NOW()
       WHERE employee_id = ?`,
      [employeeId]
    );
  },

  async isEmployeeControlled(employeeId) {
    const row = await queryOne(
      `SELECT p.is_employee_controlled, e.employment_status
       FROM employees e
       LEFT JOIN privacy_settings p ON p.employee_id = e.id
       WHERE e.id = ? LIMIT 1`,
      [employeeId]
    );
    if (!row) return false;
    return row.employment_status !== 'active' || toBool(row.is_employee_controlled);
  },

  async markPublished(employeeId) {
    await query('UPDATE privacy_settings SET published_at = NOW() WHERE employee_id = ?', [employeeId]);
  },

  publicShape(p) {
    const isControlled = p.employment_status !== 'active' || toBool(p.is_employee_controlled);
    const out = {
      employee_id: Number(p.employee_id),
      profile_visibility: p.profile_visibility || 'private',
      is_employee_controlled: isControlled,
      ownership_transferred_at: p.ownership_transferred_at,
      published_at: p.published_at,
    };
    for (const flag of PRIVACY_FIELD_FLAGS) {
      out[flag] = toBool(p[flag]);
    }
    return out;
  },
};
