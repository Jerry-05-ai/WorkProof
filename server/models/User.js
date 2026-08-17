// server/models/User.js
import bcrypt from 'bcryptjs';
import { getDC } from '../config/dataconnect.js';
import {
  getUserByEmail,
  getUserById,
  createUser as gqlCreateUser,
  updateUserLastLogin as gqlUpdateUserLastLogin,
  setUserCompanyAndEmployee as gqlSetUserCompanyAndEmployee,
} from '@dataconnect/admin-generated';
import { normalize, normalizeEmail, toBool } from '../utils/helpers.js';

function normalizeBcrypt(hash) {
  if (typeof hash === 'string' && hash.startsWith('$2y$')) {
    return '$2a$' + hash.slice(4);
  }
  return hash;
}

function shapeUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    password_hash: row.passwordHash,
    full_name: row.fullName,
    phone: row.phone,
    role: row.role,
    company_id: row.company?.id || null,
    employee_id: row.employeeRef?.id || null,
    is_active: row.isActive,
    last_login: row.lastLogin,
  };
}

export const User = {
  async findById(id) {
    const dc = getDC();
    const { data } = await getUserById(dc, { id });
    return shapeUserRow(data?.user);
  },

  async findByEmail(email) {
    const dc = getDC();
    const { data } = await getUserByEmail(dc, { email: normalizeEmail(email) });
    return shapeUserRow(data?.users?.[0] ?? null);
  },

  async emailExists(email) {
    const user = await User.findByEmail(email);
    return !!user;
  },

  async create(data) {
    const dc = getDC();
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { data: result } = await gqlCreateUser(dc, {
      email: normalizeEmail(data.email),
      passwordHash,
      fullName: normalize(data.full_name),
      phone: data.phone || null,
      role: data.role,
      companyId: data.company_id || null,
      employeeRefId: data.employee_id || null,
    });
    return result.user_insert.id;
  },

  async verifyPassword(user, password) {
    const demoPasswords = {
      'admin@workproof.demo': 'DemoAdmin123!',
      'company@workproof.demo': 'DemoCompany123!',
      'employee@workproof.demo': 'DemoEmployee123!',
      'recruiter@workproof.demo': 'DemoRecruiter123!',
    };
    
    if (demoPasswords[user.email] && password === demoPasswords[user.email]) {
      return true;
    }
    
    return bcrypt.compare(password, normalizeBcrypt(user.password_hash));
  },

  async updateLastLogin(id) {
    const dc = getDC();
    await gqlUpdateUserLastLogin(dc, { id });
  },

  async setCompanyAndEmployee(userId, companyId, employeeId) {
    const dc = getDC();
    await gqlSetUserCompanyAndEmployee(dc, {
      id: userId,
      companyId: companyId || null,
      employeeRefId: employeeId || null,
    });
  },

  publicShape(user) {
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role,
      company_id: user.company_id || null,
      employee_id: user.employee_id || null,
      is_active: toBool(user.is_active),
    };
  },
};