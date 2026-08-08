// server/models/Skill.js
import { query, queryOne } from '../config/database.js';
import { normalize, toBool, toFloatOrNull } from '../utils/helpers.js';

export const Skill = {
  async findOrCreate(name, category = null) {
    const clean = normalize(name);
    const existing = await queryOne('SELECT id FROM skills WHERE name = ? LIMIT 1', [clean]);
    if (existing) return Number(existing.id);
    const result = await query('INSERT INTO skills (name, category) VALUES (?, ?)', [
      clean,
      category ? normalize(category) : null,
    ]);
    return result.insertId;
  },

  async listForEmployee(employeeId) {
    const rows = await query(
      `SELECT es.*, s.name AS skill_name, s.category
       FROM employee_skills es
       JOIN skills s ON s.id = es.skill_id
       WHERE es.employee_id = ?
       ORDER BY s.name`,
      [employeeId]
    );
    return rows.map(Skill.publicShape);
  },

  // $data: name, category?, proficiency_level, years_experience?, initial_level?
  async addToEmployee(employeeId, data) {
    const skillId = await Skill.findOrCreate(data.name, data.category ?? null);

    const existing = await queryOne(
      'SELECT id FROM employee_skills WHERE employee_id = ? AND skill_id = ? LIMIT 1',
      [employeeId, skillId]
    );
    if (existing) return Number(existing.id);

    const level = data.proficiency_level;
    const result = await query(
      `INSERT INTO employee_skills
        (employee_id, skill_id, proficiency_level, initial_level, years_experience, last_assessed)
       VALUES (?, ?, ?, ?, ?, CURDATE())`,
      [employeeId, skillId, level, data.initial_level ?? level, data.years_experience ?? null]
    );
    return result.insertId;
  },

  async updateEmployeeSkill(employeeSkillId, employeeId, data) {
    const allowed = ['proficiency_level', 'years_experience'];
    const sets = [];
    const params = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(data[field] === '' ? null : data[field]);
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'is_verified')) {
      sets.push('is_verified = ?');
      params.push(data.is_verified ? 1 : 0);
      sets.push(`verification_date = ${data.is_verified ? 'NOW()' : 'NULL'}`);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'verified_by') && data.verified_by) {
      sets.push('verified_by = ?');
      params.push(Number(data.verified_by));
    }
    sets.push('last_assessed = CURDATE()');
    // sets is never empty (last_assessed always appended), matching PHP behavior.
    params.push(employeeSkillId, employeeId);
    await query(
      `UPDATE employee_skills SET ${sets.join(', ')} WHERE id = ? AND employee_id = ?`,
      params
    );
  },

  publicShape(r) {
    return {
      id: Number(r.id),
      skill_id: Number(r.skill_id),
      name: r.skill_name,
      category: r.category,
      proficiency_level: r.proficiency_level,
      initial_level: r.initial_level,
      years_experience: toFloatOrNull(r.years_experience),
      is_verified: toBool(r.is_verified),
      verification_date: r.verification_date,
      last_assessed: r.last_assessed,
    };
  },
};
