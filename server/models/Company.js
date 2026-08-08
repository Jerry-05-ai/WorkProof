// server/models/Company.js
import { query, queryOne } from '../config/database.js';
import { normalize, normalizeEmail, toBool } from '../utils/helpers.js';

export const Company = {
  async findById(id) {
    return queryOne('SELECT * FROM companies WHERE id = ? AND deleted_at IS NULL', [id]);
  },

  async findByEmail(email) {
    return queryOne('SELECT * FROM companies WHERE email = ? AND deleted_at IS NULL', [normalizeEmail(email)]);
  },

  async nameExists(name) {
    const row = await queryOne('SELECT 1 AS x FROM companies WHERE name = ? AND deleted_at IS NULL LIMIT 1', [normalize(name)]);
    return !!row;
  },

  async emailExists(email) {
    const row = await queryOne('SELECT 1 AS x FROM companies WHERE email = ? AND deleted_at IS NULL LIMIT 1', [normalizeEmail(email)]);
    return !!row;
  },

  // $data: name, email, phone?, website?, industry?, size?, country?, city?, description?, admin_id?
  async create(data) {
    const result = await query(
      `INSERT INTO companies
        (name, email, phone, website, industry, size, country, city, description, admin_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        normalize(data.name),
        normalizeEmail(data.email),
        data.phone ?? null,
        data.website ?? null,
        data.industry ?? null,
        data.size ?? null,
        data.country ?? null,
        data.city ?? null,
        data.description ?? null,
        data.admin_id ?? null,
      ]
    );
    return result.insertId;
  },

  async setAdmin(companyId, adminUserId) {
    await query('UPDATE companies SET admin_id = ? WHERE id = ?', [adminUserId, companyId]);
  },

  async updateStatus(companyId, status) {
    const isVerified = status === 'approved' ? 1 : 0;
    await query(
      `UPDATE companies
       SET status = ?, is_verified = ?,
           verification_date = CASE WHEN ? = 'approved' THEN NOW() ELSE verification_date END
       WHERE id = ?`,
      [status, isVerified, status, companyId]
    );
  },

  publicShape(company) {
    return {
      id: Number(company.id),
      name: company.name,
      email: company.email,
      phone: company.phone,
      website: company.website,
      industry: company.industry,
      size: company.size,
      country: company.country,
      city: company.city,
      description: company.description,
      status: company.status,
      is_verified: toBool(company.is_verified),
    };
  },
};
