/**
 * SQL Validation Middleware
 *
 * Only SELECT queries are allowed. All mutation statements are blocked.
 * Multi-statement queries (containing multiple semicolons) are rejected.
 */

// Dangerous SQL keywords that must be blocked
const BLOCKED_KEYWORDS = [
    'INSERT',
    'UPDATE',
    'DELETE',
    'DROP',
    'ALTER',
    'CREATE',
    'TRUNCATE',
    'GRANT',
    'REVOKE',
    'EXEC',
    'EXECUTE',
    'MERGE',
    'CALL',
];

/**
 * Build a regex that matches any blocked keyword at a word boundary.
 * Case-insensitive to catch all variations.
 */
const blockedPattern = new RegExp(
    `\\b(${BLOCKED_KEYWORDS.join('|')})\\b`,
    'i'
);

const validateSQL = (req, res, next) => {
    const { query } = req.body;

    // 1. Check query exists and is a non-empty string
    if (!query || typeof query !== 'string' || !query.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Query is required and must be a non-empty string.',
        });
    }

    const trimmed = query.trim();

    // 2. Block multi-statement queries (multiple semicolons or statements)
    //    Remove trailing semicolon first, then check for remaining ones
    const withoutTrailing = trimmed.replace(/;\s*$/, '');
    if (withoutTrailing.includes(';')) {
        return res.status(400).json({
            success: false,
            error: 'Multi-statement queries are not allowed. Please submit one query at a time.',
        });
    }

    // 3. Ensure the query starts with SELECT (case-insensitive)
    if (!/^\s*SELECT\b/i.test(trimmed)) {
        return res.status(400).json({
            success: false,
            error: 'Only SELECT queries are allowed.',
        });
    }

    // 4. Check for blocked keywords anywhere in the query
    //    (e.g., subqueries with INSERT, DELETE in comments, etc.)
    if (blockedPattern.test(trimmed)) {
        const match = trimmed.match(blockedPattern);
        return res.status(400).json({
            success: false,
            error: `Forbidden SQL keyword detected: "${match[0].toUpperCase()}". Only SELECT queries are allowed.`,
        });
    }

    // Query passed all checks — proceed
    next();
};

module.exports = validateSQL;
