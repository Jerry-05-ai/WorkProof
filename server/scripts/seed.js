// server/scripts/seed.js
// Run: npm run seed   (from the server/ directory)
// Ports backend/scripts/seed.php faithfully to Node.

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDC } from '../config/dataconnect.js';
import {
  createUser,
  createCompany,
  createCompanyMembership,
  setUserCompanyAndEmployee,
  createEmployee,
  createPrivacySettings,
  createSkill,
  addEmployeeSkill,
} from '@dataconnect/admin-generated';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demoAccounts = [
  { email: 'admin@workproof.demo', password: 'DemoAdmin123!', full_name: 'Platform Administrator', role: 'platform_admin' },
  { email: 'company@workproof.demo', password: 'DemoCompany123!', full_name: 'Sarah Ahmed', role: 'company_admin' },
  { email: 'employee@workproof.demo', password: 'DemoEmployee123!', full_name: 'Ayan Malik', role: 'employee' },
  { email: 'recruiter@workproof.demo', password: 'DemoRecruiter123!', full_name: 'Hamza Khan', role: 'recruiter' },
];

async function seed() {
  try {
    const userIds = {};
    for (const account of demoAccounts) {
      const passwordHash = await bcrypt.hash(account.password, 10);
      const { data } = await createUser(getDC(), {
        email: account.email,
        passwordHash,
        fullName: account.full_name,
        phone: null,
        role: account.role,
        companyId: null,
        employeeRefId: null,
      });
      userIds[account.role] = data.user_insert.id;
    }

    // NovaTech Solutions (approved).
    const { data: novaData } = await createCompany(getDC(), {
      name: 'NovaTech Solutions',
      email: 'company@workproof.demo',
      phone: '+92-300-1234567',
      website: null,
      industry: 'Technology',
      size: '50-100',
      country: 'Pakistan',
      city: 'Lahore',
      description: null,
      adminId: userIds.company_admin,
    });
    const companyId = novaData.company_insert.id;

    await setUserCompanyAndEmployee(getDC(), { id: userIds.company_admin, companyId, employeeRefId: null });
    await createCompanyMembership(getDC(), {
      userId: userIds.company_admin,
      companyId,
      role: 'admin',
      invitedBy: null,
    });

    // Employee Ayan Malik.
    const { data: ayanData } = await createEmployee(getDC(), {
      userId: userIds.employee,
      companyId,
      firstName: 'Ayan',
      lastName: 'Malik',
      email: 'employee@workproof.demo',
      phone: null,
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      employmentType: 'full_time',
      employmentStatus: 'active',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: null,
      managerId: null,
      profilePhoto: null,
      location: 'Lahore, Pakistan',
    });
    const employeeId = ayanData.employee_insert.id;

    await setUserCompanyAndEmployee(getDC(), { id: userIds.employee, companyId, employeeRefId: employeeId });
    await createCompanyMembership(getDC(), {
      userId: userIds.employee,
      companyId,
      role: 'employee',
      invitedBy: userIds.company_admin,
    });
    await createPrivacySettings(getDC(), {
      employeeId,
      companyId,
      profileVisibility: 'private',
    });

    // Starter skills.
    const { data: phpData } = await createSkill(getDC(), { name: 'PHP', category: 'Backend' });
    const phpSkillId = phpData.skill_insert.id;
    await addEmployeeSkill(getDC(), {
      employeeId,
      skillId: phpSkillId,
      proficiencyLevel: 'advanced',
      initialLevel: 'intermediate',
      yearsExperience: 5.0,
    });

    // Orbit Labs (second tenant).
    const orbitAdminHash = await bcrypt.hash('DemoOrbit123!', 10);
    const { data: orbitUserData } = await createUser(getDC(), {
      email: 'orbit@workproof.demo',
      passwordHash: orbitAdminHash,
      fullName: 'Bilal Raza',
      phone: null,
      role: 'company_admin',
      companyId: null,
      employeeRefId: null,
    });
    const orbitAdminId = orbitUserData.user_insert.id;

    const { data: orbitData } = await createCompany(getDC(), {
      name: 'Orbit Labs',
      email: 'orbit@workproof.demo',
      phone: '+92-321-7654321',
      website: null,
      industry: 'Technology',
      size: '10-50',
      country: 'Pakistan',
      city: 'Karachi',
      description: null,
      adminId: orbitAdminId,
    });
    const orbitCompanyId = orbitData.company_insert.id;

    await setUserCompanyAndEmployee(getDC(), { id: orbitAdminId, companyId: orbitCompanyId, employeeRefId: null });
    await createCompanyMembership(getDC(), {
      userId: orbitAdminId,
      companyId: orbitCompanyId,
      role: 'admin',
      invitedBy: null,
    });

    const { data: fatimaData } = await createEmployee(getDC(), {
      userId: null,
      companyId: orbitCompanyId,
      firstName: 'Fatima',
      lastName: 'Sheikh',
      email: 'fatima@orbit.demo',
      phone: null,
      jobTitle: 'Product Designer',
      department: 'Design',
      employmentType: 'full_time',
      employmentStatus: 'active',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: null,
      managerId: null,
      profilePhoto: null,
      location: 'Karachi, Pakistan',
    });
    const orbitEmployeeId = fatimaData.employee_insert.id;
    await createPrivacySettings(getDC(), {
      employeeId: orbitEmployeeId,
      companyId: orbitCompanyId,
      profileVisibility: 'private',
    });

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
    console.error('Error:', err.message);
    process.exitCode = 1;
  }
}

seed();
