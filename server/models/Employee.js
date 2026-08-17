// server/models/Employee.js
// Rewritten to call Firebase Data Connect (generated admin SDK) instead of raw MySQL.
// Public method names/signatures match the original so controllers don't change.

import { getDC } from '../config/dataconnect.js';
import {
  getEmployeeById,
  getEmployeeByEmail,
  listEmployeesByCompany,
  searchEmployees,
  createEmployee as gqlCreateEmployee,
  updateEmployee as gqlUpdateEmployee,
  softDeleteEmployee,
  verifyEmployeeRecord,
  endEmployeeEmployment,
} from '@dataconnect/admin-generated';
import { toBool } from '../utils/helpers.js';

function shapeEmployeeRow(e) {
  if (!e) return null;
  return {
    id: e.id,
    userId: e.userId ?? null,
    companyId: e.companyId,
    firstName: e.firstName,
    lastName: e.lastName,
    email: e.email,
    phone: e.phone ?? null,
    jobTitle: e.jobTitle,
    department: e.department,
    employmentType: e.employmentType,
    employmentStatus: e.employmentStatus,
    startDate: e.startDate,
    endDate: e.endDate ?? null,
    managerId: e.managerId ?? null,
    profilePhoto: e.profilePhoto ?? null,
    location: e.location ?? null,
    isVerified: e.isVerified,
    verifiedAt: e.verifiedAt ?? null,
    verifiedBy: e.verifiedBy ?? null,
    createdAt: e.createdAt,
  };
}

export const Employee = {
  // Find employee by email (across all companies — email is globally unique).
  async findByEmail(email) {
    const { data } = await getEmployeeByEmail(getDC(), { email });
    return shapeEmployeeRow(data.employees?.[0] ?? null);
  },

  // Find employee by ID (optionally scoped to a company).
  async findById(id, companyId = null) {
    const { data } = await getEmployeeById(getDC(), { id });
    const row = shapeEmployeeRow(data.employee ?? null);
    if (!row) return null;
    if (companyId && row.companyId !== companyId) return null;
    return row;
  },

  // Alias used by controllers: findForCompany(id, companyId)
  async findForCompany(id, companyId) {
    return Employee.findById(id, companyId);
  },

  // List employees for a company with optional filters and pagination.
  // filters: { search?, department?, employment_status?, is_verified? }
  async listForCompany(companyId, filters = {}, limit = 50, offset = 0) {
    const safeLimit = Number.isInteger(limit) ? limit : parseInt(limit, 10) || 50;
    const safeOffset = Number.isInteger(offset) ? offset : parseInt(offset, 10) || 0;

    const search = filters.search ?? '';
    const department = filters.department ?? null;
    const employmentStatus = filters.employment_status ?? null;
    const isVerified = filters.is_verified !== '' && filters.is_verified !== undefined && filters.is_verified !== null
      ? String(filters.is_verified) === 'true' || String(filters.is_verified) === '1'
      : null;

    const { data } = await listEmployeesByCompany(getDC(), {
      companyId,
      search: search !== '' ? search : null,
      department: department !== '' ? department : null,
      employmentStatus: employmentStatus !== '' ? employmentStatus : null,
      isVerified,
      limit: safeLimit,
      offset: safeOffset,
    });
    return (data.employees || []).map(shapeEmployeeRow);
  },

  // Create a new employee record.
  // input: { first_name, last_name, email, phone?, job_title, department,
  //          employment_type?, employment_status?, start_date?, manager_id?, location? }
  async create(companyId, input) {
    const { data: result } = await gqlCreateEmployee(getDC(), {
      userId: input.user_id ?? input.userId ?? null,
      companyId,
      firstName: input.first_name,
      lastName: input.last_name,
      email: input.email,
      phone: input.phone ?? null,
      jobTitle: input.job_title,
      department: input.department,
      employmentType: input.employment_type ?? 'full_time',
      employmentStatus: input.employment_status ?? 'active',
      startDate: input.start_date ?? new Date().toISOString().slice(0, 10),
      endDate: input.end_date ?? null,
      managerId: input.manager_id ?? null,
      profilePhoto: input.profile_photo ?? null,
      location: input.location ?? null,
    });
    return result.employee_insert.id;
  },

  // Update an existing employee record. Accepts snake_case keys from callers.
  async update(id, companyId, input) {
    const updateData = { id };

    const keyMap = {
      first_name: 'firstName',
      last_name: 'lastName',
      job_title: 'jobTitle',
      employment_type: 'employmentType',
      employment_status: 'employmentStatus',
      start_date: 'startDate',
      end_date: 'endDate',
      manager_id: 'managerId',
      profile_photo: 'profilePhoto',
    };
    const fields = [
      'first_name', 'last_name', 'phone', 'job_title', 'department',
      'employment_type', 'employment_status', 'start_date', 'end_date',
      'manager_id', 'location', 'profile_photo',
    ];
    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(input, field)) {
        const key = keyMap[field] || field;
        updateData[key] = input[field] === '' ? null : input[field];
      }
    }

    if (Object.keys(updateData).length > 1) {
      await gqlUpdateEmployee(getDC(), updateData);
    }
  },

  // Soft-delete (terminate) an employee.
  async softDelete(id, companyId) {
    await softDeleteEmployee(getDC(), { id });
  },

  // Mark employee as verified.
  async setVerified(id, companyId, verifiedBy) {
    await verifyEmployeeRecord(getDC(), { id, verifiedBy });
  },

  // End employment (set status to inactive and record end date).
  async endEmployment(id, endDate) {
    await endEmployeeEmployment(getDC(), { id, endDate });
  },

  // Check if an email already exists within a company.
  async emailExistsInCompany(email, companyId) {
    const { data } = await searchEmployees(getDC(), { companyId, search: email });
    const rows = data.employees || [];
    return rows.some((e) => e.email === email);
  },

  // Shape the raw employee object for public consumption.
  publicShape(e) {
    return {
      id: e.id,
      user_id: e.userId ? e.userId : null,
      company_id: e.companyId,
      first_name: e.firstName,
      last_name: e.lastName,
      full_name: `${e.firstName} ${e.lastName}`.trim(),
      email: e.email,
      phone: e.phone,
      job_title: e.jobTitle,
      department: e.department,
      employment_type: e.employmentType,
      employment_status: e.employmentStatus,
      start_date: e.startDate,
      end_date: e.endDate,
      manager_id: e.managerId ? e.managerId : null,
      location: e.location,
      profile_photo: e.profilePhoto,
      is_verified: toBool(e.isVerified),
      verified_at: e.verifiedAt,
    };
  },
};