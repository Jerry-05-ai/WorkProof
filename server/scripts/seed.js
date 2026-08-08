// server/scripts/seed.js
// Run: npm run seed   (from the server/ directory)
// Ports backend/scripts/seed.php faithfully to Node.

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demoAccounts = [
  { email: 'admin@workproof.demo', password: 'DemoAdmin123!', full_name: 'Platform Administrator', role: 'platform_admin' },
  { email: 'company@workproof.demo', password: 'DemoCompany123!', full_name: 'Sarah Ahmed', role: 'company_admin' },
  { email: 'employee@workproof.demo', password: 'DemoEmployee123!', full_name: 'Ayan Malik', role: 'employee' },
  { email: 'recruiter@workproof.demo', password: 'DemoRecruiter123!', full_name: 'Hamza Khan', role: 'recruiter' },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    // TRUNCATE is DDL (implicit commit) so run outside the transaction.
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    const tables = [
      'notifications', 'audit_logs', 'company_subscriptions', 'privacy_settings', 'company_memberships',
      'employee_invitations', 'employee_behavior_ratings', 'achievements',
      'projects', 'employee_skills', 'skills', 'employees', 'companies', 'users',
    ];
    for (const t of tables) {
      await conn.query(`TRUNCATE TABLE ${t}`);
    }
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    await conn.beginTransaction();

    const userIds = {};
    for (const account of demoAccounts) {
      const passwordHash = await bcrypt.hash(account.password, 10);
      const [res] = await conn.execute(
        `INSERT INTO users (email, password_hash, full_name, role, is_active) VALUES (?, ?, ?, ?, 1)`,
        [account.email, passwordHash, account.full_name, account.role]
      );
      userIds[account.role] = res.insertId;
    }

    // NovaTech Solutions (approved).
    const [novaRes] = await conn.execute(
      `INSERT INTO companies (name, email, phone, industry, size, country, city, status, is_verified, verification_date, admin_id)
       VALUES ('NovaTech Solutions', 'company@workproof.demo', '+92-300-1234567', 'Technology', '50-100', 'Pakistan', 'Lahore', 'approved', 1, NOW(), ?)`,
      [userIds.company_admin]
    );
    const companyId = novaRes.insertId;

    await conn.execute('UPDATE users SET company_id = ? WHERE id = ?', [companyId, userIds.company_admin]);
    await conn.execute(
      `INSERT INTO company_memberships (user_id, company_id, role, is_active) VALUES (?, ?, 'admin', 1)`,
      [userIds.company_admin, companyId]
    );

    // Employee Ayan Malik.
    const [ayanRes] = await conn.execute(
      `INSERT INTO employees
        (user_id, company_id, first_name, last_name, email, job_title, department, employment_status, start_date, location, is_verified, verified_at)
       VALUES (?, ?, 'Ayan', 'Malik', 'employee@workproof.demo', 'Senior Software Engineer', 'Engineering', 'active', CURDATE(), 'Lahore, Pakistan', 1, NOW())`,
      [userIds.employee, companyId]
    );
    const employeeId = ayanRes.insertId;

    await conn.execute('UPDATE users SET company_id = ?, employee_id = ? WHERE id = ?', [companyId, employeeId, userIds.employee]);
    await conn.execute(
      `INSERT INTO company_memberships (user_id, company_id, role, is_active) VALUES (?, ?, 'employee', 1)`,
      [userIds.employee, companyId]
    );
    await conn.execute(
      `INSERT INTO privacy_settings (employee_id, company_id, profile_visibility) VALUES (?, ?, 'private')`,
      [employeeId, companyId]
    );

    // Starter skills.
    await conn.query(`INSERT INTO skills (name, category) VALUES ('PHP', 'Backend'), ('React', 'Frontend'), ('MySQL', 'Database')`);
    const [phpRows] = await conn.query("SELECT id FROM skills WHERE name = 'PHP'");
    const phpSkillId = phpRows[0].id;
    await conn.execute(
      `INSERT INTO employee_skills (employee_id, skill_id, proficiency_level, initial_level, years_experience, last_assessed)
       VALUES (?, ?, 'advanced', 'intermediate', 5.0, CURDATE())`,
      [employeeId, phpSkillId]
    );

    // Orbit Labs (second tenant).
    const orbitAdminHash = await bcrypt.hash('DemoOrbit123!', 10);
    const [orbitAdminRes] = await conn.execute(
      `INSERT INTO users (email, password_hash, full_name, role, is_active)
       VALUES ('orbit@workproof.demo', ?, 'Bilal Raza', 'company_admin', 1)`,
      [orbitAdminHash]
    );
    const orbitAdminId = orbitAdminRes.insertId;

    const [orbitRes] = await conn.execute(
      `INSERT INTO companies (name, email, phone, industry, size, country, city, status, is_verified, verification_date, admin_id)
       VALUES ('Orbit Labs', 'orbit@workproof.demo', '+92-321-7654321', 'Technology', '10-50', 'Pakistan', 'Karachi', 'approved', 1, NOW(), ?)`,
      [orbitAdminId]
    );
    const orbitCompanyId = orbitRes.insertId;

    await conn.execute('UPDATE users SET company_id = ? WHERE id = ?', [orbitCompanyId, orbitAdminId]);
    await conn.execute(
      `INSERT INTO company_memberships (user_id, company_id, role, is_active) VALUES (?, ?, 'admin', 1)`,
      [orbitAdminId, orbitCompanyId]
    );

    const [fatimaRes] = await conn.execute(
      `INSERT INTO employees (company_id, first_name, last_name, email, job_title, department, employment_status, start_date, location)
       VALUES (?, 'Fatima', 'Sheikh', 'fatima@orbit.demo', 'Product Designer', 'Design', 'active', CURDATE(), 'Karachi, Pakistan')`,
      [orbitCompanyId]
    );
    const orbitEmployeeId = fatimaRes.insertId;
    await conn.execute(
      `INSERT INTO privacy_settings (employee_id, company_id, profile_visibility) VALUES (?, ?, 'private')`,
      [orbitEmployeeId, orbitCompanyId]
    );

    // Subscription plans.
    await conn.query(`
      INSERT INTO subscription_plans (code, name, price_monthly, employee_limit, features, is_active) VALUES
      ('free', 'Free', 0.00, 10, '["Up to 10 employees","Basic reports"]', 1),
      ('professional', 'Professional', 49.00, 100, '["Up to 100 employees","Monthly reports","Analytics"]', 1),
      ('enterprise', 'Enterprise', 199.00, 1000, '["Unlimited employees","Priority support","Custom integrations"]', 1)
      ON DUPLICATE KEY UPDATE name = VALUES(name)
    `);

    await conn.commit();

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const credentials = `# WorkProof Demo Credentials

> These credentials work with the seeded database.

## Platform Admin
- Email: \`admin@workproof.demo\`
- Password: \`DemoAdmin123!\`
- Role: Platform Admin

## Company Admin
- Email: \`company@workproof.demo\`
- Password: \`DemoCompany123!\`
- Role: Company Admin
- Company: NovaTech Solutions

## Employee
- Email: \`employee@workproof.demo\`
- Password: \`DemoEmployee123!\`
- Role: Employee
- Company: NovaTech Solutions

## Recruiter
- Email: \`recruiter@workproof.demo\`
- Password: \`DemoRecruiter123!\`
- Role: Recruiter

## Company Admin (second tenant — for isolation testing)
- Email: \`orbit@workproof.demo\`
- Password: \`DemoOrbit123!\`
- Role: Company Admin
- Company: Orbit Labs

---
Generated: ${now}
`;
    fs.writeFileSync(path.join(__dirname, '../../CREDENTIALS.md'), credentials);

    console.log('Database seeded successfully.');
    console.log('Credentials saved to CREDENTIALS.md');
  } catch (err) {
    try { await conn.rollback(); } catch { /* ignore */ }
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    conn.release();
    await pool.end();
  }
}

seed();
