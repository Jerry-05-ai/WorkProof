// server/models/JobOpportunity.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getJobOpportunityById,
  listJobOpportunitiesByRecruiter,
  listJobOpportunitiesByEmployee,
  countJobOpportunitiesByStatus,
  createJobOpportunity as gqlCreateJobOpportunity,
  updateJobOpportunityStatus as gqlUpdateJobOpportunityStatus,
} from '@dataconnect/admin-generated';
import { normalize } from '../utils/helpers.js';

export const JOB_STATUSES = ['sent', 'viewed', 'interested', 'declined', 'interview', 'hired'];
export const EMPLOYEE_TRANSITIONS = ['viewed', 'interested', 'declined'];

function shapeOpportunityRow(o) {
  if (!o) return null;
  return {
    id: o.id,
    recruiter_id: o.recruiterId,
    employee_id: o.employeeId,
    title: o.title,
    company_name: o.companyName,
    description: o.description,
    message: o.message,
    salary_range: o.salaryRange,
    location: o.location,
    status: o.status,
    sent_at: o.sentAt,
    viewed_at: o.viewedAt,
    responded_at: o.respondedAt,
    created_at: o.createdAt,
    first_name: o.employee?.firstName,
    last_name: o.employee?.lastName,
    job_title: o.employee?.jobTitle,
    recruiter_name: o.recruiter?.fullName ?? null,
  };
}

export const JobOpportunity = {
  STATUSES: JOB_STATUSES,
  EMPLOYEE_TRANSITIONS,

  async create(recruiterId, employeeId, data) {
    const { data: result } = await gqlCreateJobOpportunity(getDC(), {
      recruiterId,
      employeeId,
      title: normalize(data.title),
      companyName: normalize(data.company_name),
      description: data.description ?? null,
      message: data.message ?? null,
      salaryRange: data.salary_range ?? null,
      location: data.location ?? null,
    });
    return result.jobOpportunity_insert.id;
  },

  async findById(id) {
    const { data } = await getJobOpportunityById(getDC(), { id });
    return shapeOpportunityRow(data.jobOpportunity ?? null);
  },

  async listForRecruiter(recruiterId) {
    const { data } = await listJobOpportunitiesByRecruiter(getDC(), { recruiterId });
    return (data.jobOpportunities || []).map(shapeOpportunityRow);
  },

  async listForEmployee(employeeId) {
    const { data } = await listJobOpportunitiesByEmployee(getDC(), { employeeId });
    return (data.jobOpportunities || []).map(shapeOpportunityRow);
  },

  async updateStatus(id, status) {
    const now = new Date();
    let viewedAt = null;
    let respondedAt = null;
    if (status === 'viewed') {
      viewedAt = now;
    } else if (['interested', 'declined', 'interview', 'hired'].includes(status)) {
      respondedAt = now;
    }
    await gqlUpdateJobOpportunityStatus(getDC(), { id, status, viewedAt, respondedAt });
  },

  async analyticsForRecruiter(recruiterId) {
    const { data } = await countJobOpportunitiesByStatus(getDC(), { recruiterId });
    const rows = data.jobOpportunities || [];
    const counts = {};
    for (const s of JOB_STATUSES) counts[s] = 0;
    let total = 0;
    for (const row of rows) {
      counts[row.status] = (counts[row.status] ?? 0) + 1;
      total += 1;
    }
    return { total, by_status: counts };
  },

  publicShape(o) {
    return {
      id: o.id,
      recruiter_id: o.recruiter_id,
      employee_id: o.employee_id,
      title: o.title,
      company_name: o.company_name,
      description: o.description,
      message: o.message,
      salary_range: o.salary_range,
      location: o.location,
      status: o.status,
      sent_at: o.sent_at,
      viewed_at: o.viewed_at,
      responded_at: o.responded_at,
      candidate_name: o.first_name !== undefined && o.first_name !== null
        ? `${o.first_name} ${o.last_name ?? ''}`.trim()
        : null,
      candidate_title: o.job_title ?? null,
      recruiter_name: o.recruiter_name ?? null,
    };
  },
};