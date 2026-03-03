const { Pool } = require('pg');
/*Create a PostgreSQL connection pool using environment variables for configuration. */ 
const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  statement_timeout: 5000,
  max: 10,
});

module.exports = pool;
