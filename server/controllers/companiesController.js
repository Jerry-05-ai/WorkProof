// server/controllers/companiesController.js
import pool, { query } from '../config/database.js';
import { User } from '../models/User.js';
import { Company } from '../models/Company.js';
import {
  requireFields, validateEmail, validatePassword, normalize, normalizeEmail, ApiError,
} from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';

// POST /api/companies/register
export async function register(req, res) {
  const data = req.body || {};
  requireFields(data, ['company_name', 'company_email', 'admin_name', 'admin_email', 'password']);

  if (!validateEmail(data.company_email)) throw new ApiError(422, 'Invalid company email');
  if (!validateEmail(data.admin_email)) throw new ApiError(422, 'Invalid admin email');
  const pwError = validatePassword(data.password);
  if (pwError !== null) throw new ApiError(422, pwError);

  if (await Company.nameExists(data.company_name)) {
    throw new ApiError(409, 'A company with this name already exists');
  }
  if (await Company.emailExists(data.company_email)) {
    throw new ApiError(409, 'A company with this email already exists');
  }
  if (await User.emailExists(data.admin_email)) {
    throw new ApiError(409, 'A user with this admin email already exists');
  }

  // Transactional: create admin user + company + membership.
  const conn = await pool.getConnection();
  let companyId;
  let adminUserId;
  try {
    await conn.beginTransaction();

    // Create admin user.
    const bcrypt = (await import('bcryptjs')).default;
    const passwordHash = await bcrypt.hash(data.password, 10);
    const [adminRes] = await conn.execute(
      `INSERT INTO users (email, password_hash, full_name, phone, role, company_id, employee_id, is_active)
       VALUES (?, ?, ?, ?, 'company_admin', NULL, NULL, 1)`,
      [normalizeEmail(data.admin_email), passwordHash, normalize(data.admin_name), data.admin_phone ?? null]
    );
    adminUserId = adminRes.insertId;

    // Create company (pending).
    const [companyRes] = await conn.execute(
      `INSERT INTO companies
        (name, email, phone, website, industry, size, country, city, description, admin_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        normalize(data.company_name),
        normalizeEmail(data.company_email),
        data.company_phone ?? null,
        data.website ?? null,
        data.industry ?? null,
        data.size ?? null,
        data.country ?? null,
        data.city ?? null,
        data.description ?? null,
        adminUserId,
      ]
    );
    companyId = companyRes.insertId;

    // Link admin user to company.
    await conn.execute('UPDATE users SET company_id = ?, employee_id = ? WHERE id = ?', [companyId, null, adminUserId]);

    // Admin membership.
    await conn.execute(
      `INSERT INTO company_memberships (user_id, company_id, role, is_active)
       VALUES (?, ?, 'admin', 1)`,
      [adminUserId, companyId]
    );

    await conn.commit();
  } catch (e) {
    await conn.rollback();
    conn.release();
    throw new ApiError(500, 'Registration failed');
  }
  conn.release();

  // Post-commit side effects (audit + notify platform admins).
  await audit(adminUserId, 'company_admin', 'company_register', 'company', companyId, {
    company_name: normalize(data.company_name),
  }, req);

  const admins = await query("SELECT id FROM users WHERE role = 'platform_admin' AND is_active = 1");
  for (const admin of admins) {
    await notify(
      Number(admin.id),
      'company_registration',
      'New company registration',
      `${normalize(data.company_name)} has registered and is pending approval.`,
      '/admin/companies'
    );
  }

  res.status(201).json({
    success: true,
    message: 'Company registered successfully. Awaiting platform approval.',
    company: { id: companyId, status: 'pending' },
  });
}

// GET /api/companies/status
export async function status(req, res) {
  const companyId = req.auth?.companyId ?? null;
  if (companyId === null) {
    throw new ApiError(404, 'No company associated with this account');
  }
  const company = await Company.findById(companyId);
  if (!company) throw new ApiError(404, 'Company not found');
  res.json({ success: true, company: Company.publicShape(company) });
}
