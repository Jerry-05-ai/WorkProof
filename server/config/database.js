// server/config/database.js
// MySQL connection pool (mysql2/promise). Mirrors the PHP PDO connection.
// Configure via environment variables (see .env.example).

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME || 'workproof',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS !== undefined ? process.env.DB_PASS : '',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
  queueLimit: 0,
  // Return DECIMAL/NEWDECIMAL as JS numbers where the PHP layer cast to float,
  // but keep BIGINT-safe. DECIMAL columns are cast explicitly in models.
  decimalNumbers: true,
  namedPlaceholders: false,
  dateStrings: true, // return DATE/DATETIME/TIMESTAMP as strings, matching PHP PDO output
});

/**
 * Run a query and return rows (SELECT) or the result header (INSERT/UPDATE/DELETE).
 * Mirrors PDO prepared statements: pass SQL with ? placeholders and a params array.
 */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * Convenience: run a query and return the first row or null.
 */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

/**
 * Verify the database is reachable at boot; throws on failure.
 */
export async function assertConnection() {
  const conn = await pool.getConnection();
  try {
    await conn.query('SELECT 1');
  } finally {
    conn.release();
  }
}

export default pool;
