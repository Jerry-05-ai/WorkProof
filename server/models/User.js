// server/models/User.js
import bcrypt from 'bcryptjs';
import { query, queryOne } from '../config/database.js';
import { normalize, normalizeEmail, toBool } from '../utils/helpers.js';

// PHP's password_hash() emits `$2y$` bcrypt hashes; bcryptjs emits `$2a$`/`$2b$`.
// bcryptjs.compare accepts `$2a`/`$2b`; normalize a stored `$2y$` prefix to `$2a$`
// so existing PHP-created hashes verify correctly.
function normalizeBcrypt(hash) {
  if (typeof hash === 'string' && hash.startsWith('$2y$')) {
    return '$2a$' + hash.slice(4);
  }
  return hash;
}

export const User = {
  async findById(id) {
    return queryOne('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [id]);
  },

  async findByEmail(email) {
    return queryOne('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [normalizeEmail(email)]);
  },

  async emailExists(email) {
    const row = await queryOne('SELECT 1 AS x FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1', [normalizeEmail(email)]);
    return !!row;
  },

  // $data: email, password, full_name, role, phone?, company_id?, employee_id?
  async create(data) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, phone, role, company_id, employee_id, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        normalizeEmail(data.email),
        passwordHash,
        normalize(data.full_name),
        data.phone ?? null,
        data.role,
        data.company_id ?? null,
        data.employee_id ?? null,
      ]
    );
    return result.insertId;
  },

  async verifyPassword(user, password) {
    return bcrypt.compare(password, normalizeBcrypt(user.password_hash));
  },

  async updateLastLogin(id) {
    await query('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);
  },

  async setCompanyAndEmployee(userId, companyId, employeeId) {
    await query('UPDATE users SET company_id = ?, employee_id = ? WHERE id = ?', [companyId, employeeId, userId]);
  },

  publicShape(user) {
    return {
      id: Number(user.id),
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role,
      company_id: user.company_id !== null && user.company_id !== undefined ? Number(user.company_id) : null,
      employee_id: user.employee_id !== null && user.employee_id !== undefined ? Number(user.employee_id) : null,
      is_active: toBool(user.is_active),
    };
  },
};
