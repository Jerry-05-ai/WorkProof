// server/scripts/monthly_reports.js
// Run monthly (e.g. cron: 0 0 1 * *):  npm run cron:monthly
// Generates monthly reports for ALL active employees and notifies them.

import 'dotenv/config';
import pool, { query } from '../config/database.js';
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
    const employees = await query(
      `SELECT e.id AS employee_id, e.company_id, e.first_name, e.last_name, e.email
       FROM employees e
       WHERE e.employment_status = 'active' AND e.deleted_at IS NULL`
    );

    let generated = 0;
    let errors = 0;

    for (const emp of employees) {
      try {
        await MonthlyReport.generate(Number(emp.employee_id), Number(emp.company_id), month, year, true);

        const userRows = await query('SELECT id FROM users WHERE employee_id = ? AND is_active = 1 LIMIT 1', [Number(emp.employee_id)]);
        if (userRows.length) {
          await query(
            `INSERT INTO notifications (user_id, type, title, message)
             VALUES (?, 'monthly_report', 'Monthly Progress Report Ready', ?)`,
            [Number(userRows[0].id), `Your progress report for ${month}/${year} has been generated.`]
          );
        }
        generated += 1;
      } catch (e) {
        console.error(`Error for employee ${emp.employee_id}: ${e.message}`);
        errors += 1;
      }
    }

    console.log(`[${stamp()}] Done. Generated: ${generated}, Errors: ${errors}`);
  } catch (err) {
    console.error(`[${stamp()}] Fatal error: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
