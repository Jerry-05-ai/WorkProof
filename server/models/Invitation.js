// server/models/Invitation.js
import { query, queryOne } from '../config/database.js';
import { normalizeEmail, generateToken, hashToken } from '../utils/helpers.js';

export const Invitation = {
  // Returns { id, rawToken }. Raw token only returned here; DB stores its hash.
  // $data: company_id, email, invited_by, first_name?, last_name?, job_title?, department?, ttl_days?
  async create(data) {
    const rawToken = generateToken(32);
    const tokenHash = hashToken(rawToken);
    const ttlDays = data.ttl_days ?? 7;
    const expires = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
    const expiresAt = expires.toISOString().slice(0, 19).replace('T', ' ');

    const result = await query(
      `INSERT INTO employee_invitations
        (company_id, email, token_hash, first_name, last_name, job_title, department, invited_by, expires_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        data.company_id,
        normalizeEmail(data.email),
        tokenHash,
        data.first_name ?? null,
        data.last_name ?? null,
        data.job_title ?? null,
        data.department ?? null,
        data.invited_by,
        expiresAt,
      ]
    );
    return { id: result.insertId, rawToken };
  },

  async findValidByToken(rawToken) {
    return queryOne(
      `SELECT * FROM employee_invitations
       WHERE token_hash = ? AND status = 'pending' AND expires_at > NOW()
       LIMIT 1`,
      [hashToken(rawToken)]
    );
  },

  async pendingExistsForEmail(companyId, email) {
    const row = await queryOne(
      `SELECT 1 AS x FROM employee_invitations
       WHERE company_id = ? AND email = ? AND status = 'pending' AND expires_at > NOW()
       LIMIT 1`,
      [companyId, normalizeEmail(email)]
    );
    return !!row;
  },

  async markAccepted(invitationId) {
    await query(
      `UPDATE employee_invitations SET status = 'accepted', accepted_at = NOW() WHERE id = ?`,
      [invitationId]
    );
  },

  publicShape(inv) {
    return {
      email: inv.email,
      first_name: inv.first_name,
      last_name: inv.last_name,
      job_title: inv.job_title,
      department: inv.department,
      company_id: Number(inv.company_id),
      status: inv.status,
      expires_at: inv.expires_at,
    };
  },
};
