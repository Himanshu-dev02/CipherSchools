const { Pool } = require('pg');

/**
 * PostgreSQL connection pool configured from environment variables.
 * A 5-second statement timeout is enforced to prevent long-running queries.
 */
const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  // Safety: kill any query that runs longer than 5 seconds
  statement_timeout: 5000,
  // Limit pool size for sandbox use
  max: 10,
});

module.exports = pool;
