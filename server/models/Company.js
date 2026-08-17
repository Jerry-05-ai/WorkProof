// server/models/Company.js
// Rewritten to call Firebase Data Connect instead of raw MySQL. Public
// method names/signatures are unchanged. Ids are UUID strings (see User.js
// header comment for why).

import { getDC } from '../config/dataconnect.js';
import {
  getCompanyById,
  getCompanyByName,
  getCompanyByEmail,
  createCompany as gqlCreateCompany,
  setCompanyAdmin as gqlSetCompanyAdmin,
  updateCompanyStatus as gqlUpdateCompanyStatus,
} from '@dataconnect/admin-generated';
import { normalize, normalizeEmail, toBool } from '../utils/helpers.js';

function shapeCompanyRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    website: row.website,
    industry: row.industry,
    size: row.size,
    country: row.country,
    city: row.city,
    description: row.description,
    status: row.status,
    is_verified: row.isVerified,
    admin_id: row.admin?.id ?? null,
    deleted_at: row.deletedAt,
  };
}

export const Company = {
  async findById(id) {
    const { data } = await getCompanyById(getDC(), { id });
    const company = shapeCompanyRow(data.company);
    // Mirror the old MySQL query's `AND deleted_at IS NULL` filter.
    if (company?.deleted_at) return null;
    return company;
  },

  // Not yet backed by a dedicated Data Connect query (would need a
  // GetCompanyByEmail operation added to queries.gql, same pattern as
  // GetUserByEmail) — add if/when a caller needs it.
  async findByEmail(_email) {
    throw new Error('Company.findByEmail: add a GetCompanyByEmail Data Connect query first');
  },

  async nameExists(name) {
    const { data } = await getCompanyByName(getDC(), { name });
    return !!(data.companies?.length > 0);
  },

  async emailExists(email) {
    const { data } = await getCompanyByEmail(getDC(), { email: normalizeEmail(email) });
    return !!(data.companies?.length > 0);
  },

  // $data: name, email, phone?, website?, industry?, size?, country?, city?, description?, admin_id?
  async create(data) {
    const { data: result } = await gqlCreateCompany(getDC(), {
      name: normalize(data.name),
      email: normalizeEmail(data.email),
      phone: data.phone ?? null,
      website: data.website ?? null,
      industry: data.industry ?? null,
      size: data.size ?? null,
      country: data.country ?? null,
      city: data.city ?? null,
      description: data.description ?? null,
      adminId: data.admin_id ?? null,
    });
    return result.company_insert.id; // UUID string
  },

  async setAdmin(companyId, adminUserId) {
    await gqlSetCompanyAdmin(getDC(), { id: companyId, adminId: adminUserId });
  },

  async updateStatus(companyId, status) {
    await gqlUpdateCompanyStatus(getDC(), {
      id: companyId,
      status,
      isVerified: status === 'approved',
    });
  },

  publicShape(company) {
    return {
      id: company.id,
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
