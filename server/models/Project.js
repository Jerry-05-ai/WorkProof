// server/models/Project.js
// Rewritten to call Firebase Data Connect (generated admin SDK) instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listProjectsByEmployee,
  createProject as gqlCreateProject,
  updateProject as gqlUpdateProject,
} from '@dataconnect/admin-generated';
import { normalize, toBool, toFloatOrNull } from '../utils/helpers.js';

export const Project = {
  async listForEmployee(employeeId, companyId) {
    const { data } = await listProjectsByEmployee(getDC(), { employeeId, companyId });
    return (data.projects || []).map(Project.publicShape);
  },

  async create(employeeId, companyId, data) {
    const { data: result } = await gqlCreateProject(getDC(), {
      employeeId,
      companyId,
      name: normalize(data.name),
      description: data.description ?? null,
      role: data.role ?? null,
      technologies: data.technologies ?? null,
      startDate: data.start_date ?? null,
      endDate: data.end_date ?? null,
      status: data.status ?? 'in_progress',
      contributionSummary: data.contribution_summary ?? null,
      performanceRating: data.performance_rating !== null && data.performance_rating !== undefined
        ? toFloatOrNull(data.performance_rating)
        : null,
    });
    return result.project_insert.id;
  },

  async update(projectId, employeeId, companyId, data) {
    const updateData = {};

    const allowed = [
      'name', 'description', 'role', 'technologies', 'start_date', 'end_date',
      'status', 'contribution_summary', 'performance_rating',
    ];
    const keyMap = {
      start_date: 'startDate',
      end_date: 'endDate',
      contribution_summary: 'contributionSummary',
      performance_rating: 'performanceRating',
    };
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const key = keyMap[field] || field;
        updateData[key] = data[field] === '' ? null : data[field];
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'is_verified')) {
      updateData.isVerified = data.is_verified ? true : false;
      updateData.verificationDate = data.is_verified ? new Date() : null;
    }

    if (Object.keys(updateData).length > 0) {
      await gqlUpdateProject(getDC(), { id: projectId, ...updateData });
    }
  },

  publicShape(p) {
    return {
      id: p.id,
      employee_id: p.employeeId,
      name: p.name,
      description: p.description,
      role: p.role,
      technologies: p.technologies,
      start_date: p.startDate,
      end_date: p.endDate,
      status: p.status,
      contribution_summary: p.contributionSummary,
      performance_rating: toFloatOrNull(p.performanceRating),
      is_verified: toBool(p.isVerified),
      verification_date: p.verificationDate,
    };
  },
};