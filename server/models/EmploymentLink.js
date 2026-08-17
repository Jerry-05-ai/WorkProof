// server/models/EmploymentLink.js
//
// Cross-company career history. Each row = "this user held this employee record
// at this company for this span". Rows are append-only; leaving a company simply
// stamps left_at.
//
// Rewritten to call Firebase Data Connect instead of raw MySQL. The old
// ensureTable() / CREATE TABLE IF NOT EXISTS no longer applies — the table is
// defined declaratively in dataconnect/schema/schema.gql.

import { getDC } from '../config/dataconnect.js';
import {
  listEmploymentLinksByPerson,
  getEmploymentLinkByEmployee,
  getCurrentEmploymentLink,
  createEmploymentLink as gqlCreateEmploymentLink,
  markEmploymentLinkLeft,
  attachUserToEmploymentLinks,
} from '@dataconnect/admin-generated';
import { normalizeEmail, toBool } from '../utils/helpers.js';

function shapeLinkRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    person_email: row.personEmail,
    user_id: row.userId ?? null,
    employee_id: row.employeeId,
    company_id: row.companyId,
    company_name: row.company?.name ?? null,
    job_title: row.jobTitle ?? null,
    department: row.department ?? null,
    started_at: row.startedAt ?? null,
    left_at: row.leftAt ?? null,
    is_current: row.isCurrent,
    source: row.source ?? null,
  };
}

export const EmploymentLink = {
  // The Data Connect table is defined in schema.gql; no ensureTable() needed.

  // Backfill a link for an existing employees row if one is not present yet.
  async ensureLinkForEmployee(employee, { source = 'backfill' } = {}) {
    if (!employee) return null;
    const employeeId = employee.id ?? employee.employee_id;
    const existing = await EmploymentLink.findByEmployee(employeeId);
    if (existing) return existing;

    await gqlCreateEmploymentLink(getDC(), {
      personEmail: normalizeEmail(employee.email),
      userId: employee.user_id ?? employee.userId ?? null,
      employeeId,
      companyId: employee.company_id ?? employee.companyId,
      jobTitle: employee.job_title ?? employee.jobTitle ?? null,
      department: employee.department ?? null,
      startedAt: employee.start_date ?? employee.startDate ?? null,
      source,
    });
    return EmploymentLink.findByEmployee(employeeId);
  },

  // Note: Data Connect's employee table has a unique constraint on employeeId
  // (via the schema's `employee: Employee! @unique`), so this behaves like the
  // old MySQL UNIQUE KEY unique_link (employee_id).
  async findByEmployee(employeeId) {
    const { data } = await getEmploymentLinkByEmployee(getDC(), { employeeId });
    return shapeLinkRow(data.employmentLinks?.[0] ?? null);
  },

  // Record a brand-new employment span (e.g. Company B hires the person).
  async create({ personEmail, userId, employeeId, companyId, jobTitle, department, startedAt, source = 'rehire' }) {
    await gqlCreateEmploymentLink(getDC(), {
      personEmail: normalizeEmail(personEmail),
      userId: userId ?? null,
      employeeId,
      companyId,
      jobTitle: jobTitle ?? null,
      department: department ?? null,
      startedAt: startedAt ?? null,
      source,
    });
    return EmploymentLink.findByEmployee(employeeId);
  },

  // Close out the current span for an employee record (they left the company).
  async markLeft(employeeId, leftAt) {
    const link = await EmploymentLink.findByEmployee(employeeId);
    if (!link) return;
    await markEmploymentLinkLeft(getDC(), { linkId: link.id, leftAt: leftAt ?? null });
  },

  // Re-point every link for a person to their canonical login user id.
  async attachUserToPerson(personEmail, userId) {
    await attachUserToEmploymentLinks(getDC(), {
      personEmail: normalizeEmail(personEmail),
      userId,
    });
  },

  // All employment rows for a person, newest first — the permanent timeline.
  async listForPerson(personEmail) {
    const { data } = await listEmploymentLinksByPerson(getDC(), { personEmail: normalizeEmail(personEmail) });
    return (data.employmentLinks || []).map(shapeLinkRow);
  },

  async currentForPerson(personEmail) {
    const { data } = await getCurrentEmploymentLink(getDC(), { personEmail: normalizeEmail(personEmail) });
    return shapeLinkRow(data.employmentLinks?.[0] ?? null);
  },

  publicShape(row) {
    return {
      id: row.id,
      employee_id: row.employee_id,
      company_id: row.company_id,
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