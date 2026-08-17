// server/models/Invitation.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getInvitationByToken,
  checkPendingInvitation,
  createInvitation as gqlCreateInvitation,
  markInvitationAccepted,
} from '@dataconnect/admin-generated';
import { normalizeEmail, generateToken, hashToken } from '../utils/helpers.js';

function shapeInvitationRow(inv) {
  if (!inv) return null;
  return {
    id: inv.id,
    company_id: inv.companyId,
    email: inv.email,
    token_hash: inv.tokenHash,
    first_name: inv.firstName,
    last_name: inv.lastName,
    job_title: inv.jobTitle,
    department: inv.department,
    status: inv.status,
    invited_by: inv.invitedBy,
    expires_at: inv.expiresAt,
    accepted_at: inv.acceptedAt,
    created_at: inv.createdAt,
  };
}

export const Invitation = {
  // Returns { id, rawToken }. Raw token only returned here; DB stores its hash.
  // $data: company_id, email, invited_by, first_name?, last_name?, job_title?, department?, ttl_days?
  async create(data) {
    const rawToken = generateToken(32);
    const tokenHash = hashToken(rawToken);
    const ttlDays = data.ttl_days ?? 7;
    const expires = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    const { data: result } = await gqlCreateInvitation(getDC(), {
      companyId: data.company_id,
      email: normalizeEmail(data.email),
      tokenHash,
      firstName: data.first_name ?? null,
      lastName: data.last_name ?? null,
      jobTitle: data.job_title ?? null,
      department: data.department ?? null,
      invitedBy: data.invited_by,
      expiresAt: expires,
    });
    return { id: result.employeeInvitation_insert.id, rawToken };
  },

  async findValidByToken(rawToken) {
    const { data } = await getInvitationByToken(getDC(), {
      tokenHash: hashToken(rawToken),
      now: new Date(),
    });
    return shapeInvitationRow(data.employeeInvitations?.[0] ?? null);
  },

  async pendingExistsForEmail(companyId, email) {
    const { data } = await checkPendingInvitation(getDC(), {
      companyId,
      email: normalizeEmail(email),
      now: new Date(),
    });
    return !!(data.employeeInvitations?.length > 0);
  },

  async markAccepted(invitationId) {
    await markInvitationAccepted(getDC(), { id: invitationId });
  },

  publicShape(inv) {
    return {
      email: inv.email,
      first_name: inv.first_name,
      last_name: inv.last_name,
      job_title: inv.job_title,
      department: inv.department,
      company_id: inv.company_id,
      status: inv.status,
      expires_at: inv.expires_at,
    };
  },
};