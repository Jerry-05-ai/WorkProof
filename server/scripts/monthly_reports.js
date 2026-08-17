// server/scripts/monthly_reports.js
// Run monthly (e.g. cron: 0 0 1 * *):  npm run cron:monthly
// Generates monthly reports for ALL active employees and notifies them.

import 'dotenv/config';
import { getDC } from '../config/dataconnect.js';
import { listEmployeesByCompany, createNotification, adminListCompanies } from '@dataconnect/admin-generated';
import { MonthlyReport } from '../models/MonthlyReport.js';

function lastMonthPeriod() {
  const now = new Date();
  const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(firstOfThisMonth.getTime() - 24 * 60 * 60 * 1000);
  const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
  const year = lastMonth.getFullYear();
  return { month, year };
}

async function run() {
  const { month, year } = lastMonthPeriod();
  const stamp = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(`[${stamp()}] Generating monthly reports for ${year}-${month}...`);

  try {
    // Fetch all active employees across all companies.
    // Data Connect doesn't have a "list all employees" query, so we fetch
    // per-company. For a cron job this is acceptable.
    const { data: allCompaniesData } = await adminListCompanies(getDC(), { status: null });
    const companies = allCompaniesData.companies || [];

    let generated = 0;
    let errors = 0;

    for (const company of companies) {
      const { data: empData } = await listEmployeesByCompany(getDC(), {
        companyId: company.id,
        search: null,
        department: null,
        employmentStatus: 'active',
        isVerified: null,
        limit: 1000,
        offset: 0,
      });
      const employees = empData.employees || [];

      for (const emp of employees) {
        try {
          await MonthlyReport.generate(emp.id, company.id, month, year, true);

          if (emp.userId) {
            await createNotification(getDC(), {
              userId: emp.userId,
              type: 'monthly_report',
              title: 'Monthly Progress Report Ready',
              message: `Your progress report for ${month}/${year} has been generated.`,
              link: null,
              metadata: null,
            });
          }
          generated += 1;
        } catch (e) {
          console.error(`Error for employee ${emp.id}: ${e.message}`);
          errors += 1;
        }
      }
    }

    console.log(`[${stamp()}] Done. Generated: ${generated}, Errors: ${errors}`);
  } catch (err) {
    console.error(`[${stamp()}] Fatal error: ${err.message}`);
    process.exitCode = 1;
  }
}

run();