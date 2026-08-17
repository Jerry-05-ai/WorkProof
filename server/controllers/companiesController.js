// server/controllers/companiesController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  createUser,
  createCompany,
  createCompanyMembership,
  setUserCompanyAndEmployee,
  findPlatformAdmins,
} from '@dataconnect/admin-generated';
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

  // Create admin user.
  const bcrypt = (await import('bcryptjs')).default;
  const passwordHash = await bcrypt.hash(data.password, 10);
  const { data: userResult } = await createUser(getDC(), {
    email: normalizeEmail(data.admin_email),
    passwordHash,
    fullName: normalize(data.admin_name),
    phone: data.admin_phone ?? null,
    role: 'company_admin',
    companyId: null,
    employeeRefId: null,
  });
  const adminUserId = userResult.user_insert.id;

  // Create company (pending).
  const { data: companyResult } = await createCompany(getDC(), {
    name: normalize(data.company_name),
    email: normalizeEmail(data.company_email),
    phone: data.company_phone ?? null,
    website: data.website ?? null,
    industry: data.industry ?? null,
    size: data.size ?? null,
    country: data.country ?? null,
    city: data.city ?? null,
    description: data.description ?? null,
    adminId: adminUserId,
  });
  const companyId = companyResult.company_insert.id;

  // Link admin user to company.
  await setUserCompanyAndEmployee(getDC(), { id: adminUserId, companyId, employeeRefId: null });

  // Create admin membership.
  await createCompanyMembership(getDC(), {
    userId: adminUserId,
    companyId,
    role: 'admin',
    invitedBy: null,
  });

  // Post-commit side effects (audit + notify platform admins).
  await audit(adminUserId, 'company_admin', 'company_register', 'company', companyId, {
    company_name: normalize(data.company_name),
  }, req);

  const { data: adminsData } = await findPlatformAdmins(getDC());
  const admins = adminsData.users || [];
  for (const admin of admins) {
    await notify(
      admin.id,
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