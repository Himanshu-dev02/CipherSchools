const express = require('express');
const router = express.Router();
const { executeQuery } = require('../controllers/executeController');
const validateSQL = require('../middleware/validateSQL');

/**
 * POST /api/execute
 * Validates the SQL query (middleware) then executes it against PostgreSQL.
 */
router.post('/', validateSQL, executeQuery);

module.exports = router;
