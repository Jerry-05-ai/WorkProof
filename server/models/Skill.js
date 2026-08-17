// server/models/Skill.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getSkillByName,
  createSkill,
  listSkillsByEmployee,
  getEmployeeSkillByPair,
  addEmployeeSkill,
  updateEmployeeSkill as gqlUpdateEmployeeSkill,
} from '@dataconnect/admin-generated';
import { normalize, toBool, toFloatOrNull } from '../utils/helpers.js';

export const Skill = {
  async findOrCreate(name, category = null) {
    const clean = normalize(name);
    const { data } = await getSkillByName(getDC(), { name: clean });
    if (data.skills?.[0]) return data.skills[0].id;
    const { data: created } = await createSkill(getDC(), {
      name: clean,
      category: category ? normalize(category) : null,
    });
    return created.skill_insert.id;
  },

  async listForEmployee(employeeId) {
    const { data } = await listSkillsByEmployee(getDC(), { employeeId });
    const rows = data.employeeSkills || [];
    return rows.map((es) => Skill.publicShape({
      ...es,
      skill_name: es.skill?.name ?? null,
      category: es.skill?.category ?? null,
      skill_id: es.skillId,
    }));
  },

  // $data: name, category?, proficiency_level, years_experience?, initial_level?
  async addToEmployee(employeeId, data) {
    const skillId = await Skill.findOrCreate(data.name, data.category ?? null);

    const { data: existingData } = await getEmployeeSkillByPair(getDC(), { employeeId, skillId });
    if (existingData.employeeSkills?.[0]) return existingData.employeeSkills[0].id;

    const level = data.proficiency_level;
    const { data: created } = await addEmployeeSkill(getDC(), {
      employeeId,
      skillId,
      proficiencyLevel: level,
      initialLevel: data.initial_level ?? level,
      yearsExperience: data.years_experience !== null && data.years_experience !== undefined
        ? toFloatOrNull(data.years_experience)
        : null,
    });
    return created.employeeSkill_insert.id;
  },

  async updateEmployeeSkill(employeeSkillId, employeeId, data) {
    const allowed = ['proficiency_level', 'years_experience'];
    const updateData = {};
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const key = field === 'proficiency_level' ? 'proficiencyLevel' : 'yearsExperience';
        updateData[key] = data[field] === '' ? null : data[field];
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'is_verified')) {
      updateData.isVerified = data.is_verified ? true : false;
      updateData.verificationDate = data.is_verified ? new Date() : null;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'verified_by') && data.verified_by) {
      updateData.verifiedBy = String(data.verified_by);
    }
    await gqlUpdateEmployeeSkill(getDC(), { id: employeeSkillId, ...updateData });
  },

  publicShape(r) {
    return {
      id: r.id,
      skill_id: r.skill_id ?? r.skillId,
      name: r.skill_name ?? r.name,
      category: r.category,
      proficiency_level: r.proficiency_level ?? r.proficiencyLevel,
      initial_level: r.initial_level ?? r.initialLevel,
      years_experience: toFloatOrNull(r.years_experience ?? r.yearsExperience),
      is_verified: toBool(r.is_verified ?? r.isVerified),
      verification_date: r.verification_date ?? r.verificationDate,
      last_assessed: r.last_assessed ?? r.lastAssessed,
    };
  },
};