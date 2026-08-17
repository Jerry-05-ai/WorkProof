// server/models/VerificationCorrection.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getVerificationCorrectionById,
  listVerificationCorrectionsByEmployee,
  listVerificationCorrectionsByCompany,
  createVerificationCorrection as gqlCreateVerificationCorrection,
  updateVerificationCorrectionStatus as gqlUpdateVerificationCorrectionStatus,
} from '@dataconnect/admin-generated';

export const CORRECTABLE_FIELDS = [
  'first_name', 'last_name', 'job_title', 'department',
  'employment_type', 'start_date', 'end_date', 'location',
];

export const VerificationCorrection = {
  CORRECTABLE_FIELDS,

  async create(employeeId, companyId, requestedBy, data) {
    const { data: result } = await gqlCreateVerificationCorrection(getDC(), {
      employeeId,
      companyId,
      fieldName: data.field_name,
      oldValue: data.old_value ?? null,
      newValue: data.new_value ?? null,
      reason: data.reason ?? null,
      requestedBy,
    });
    return result.verificationCorrection_insert.id;
  },

  async findById(id) {
    const { data } = await getVerificationCorrectionById(getDC(), { id });
    return shapeCorrectionRow(data.verificationCorrection ?? null);
  },

  async listForEmployee(employeeId, status = null) {
    const { data } = await listVerificationCorrectionsByEmployee(getDC(), {
      employeeId,
      status: status !== null ? status : null,
    });
    return (data.verificationCorrections || []).map(shapeCorrectionRow);
  },

  async listForCompany(companyId, status = null) {
    const { data } = await listVerificationCorrectionsByCompany(getDC(), {
      companyId,
      status: status !== null ? status : null,
    });
    return (data.verificationCorrections || []).map(shapeCorrectionRow);
  },

  async setStatus(id, status, reviewedBy) {
    await gqlUpdateVerificationCorrectionStatus(getDC(), { id, status, reviewedBy });
  },

  async applyToEmployee(correction) {
    const field = correction.field_name;
    if (!CORRECTABLE_FIELDS.includes(field)) {
      throw new Error('Field is not correctable: ' + field);
    }
    // The Employee model's update method handles the field mapping. We pass
    // the correction's new value keyed by the snake_case field name.
    const { Employee } = await import('./Employee.js');
    const updateData = { [field]: correction.new_value };
    await Employee.update(correction.employee_id, correction.company_id, updateData);
  },

  publicShape(c) {
    return {
      id: c.id,
      employee_id: c.employee_id,
      company_id: c.company_id,
      field_name: c.field_name,
      old_value: c.old_value,
      new_value: c.new_value,
      reason: c.reason,
      status: c.status,
      requested_by: c.requested_by,
      reviewed_by: c.reviewed_by,
      created_at: c.created_at,
    };
  },
};

function shapeCorrectionRow(c) {
  if (!c) return null;
  return {
    id: c.id,
    employee_id: c.employeeId,
    company_id: c.companyId,
    field_name: c.fieldName,
    old_value: c.oldValue,
    new_value: c.newValue,
    reason: c.reason,
    status: c.status,
    requested_by: c.requestedBy ?? null,
    reviewed_by: c.reviewedBy ?? null,
    created_at: c.createdAt,
  };
}