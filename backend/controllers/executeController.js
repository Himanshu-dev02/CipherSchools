const pool = require('../db/postgres');

/**
 * Execute a validated SELECT query against the PostgreSQL sandbox.
 * The query has already been validated by the validateSQL middleware.
 */
const executeQuery = async (req, res) => {
    const { query } = req.body;

    try {
        const result = await pool.query(query);

        // Build column metadata from the result fields
        const columns = result.fields.map((field) => field.name);

        res.json({
            success: true,
            columns,
            rows: result.rows,
            rowCount: result.rowCount,
        });
    } catch (err) {
        // Return PostgreSQL error details to the student for learning
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

module.exports = { executeQuery };
