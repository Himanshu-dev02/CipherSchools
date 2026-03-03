const express = require('express');
const router = express.Router();
const { getHint } = require('../controllers/hintController');

/**
 * POST /api/hint
 * Generates an AI-powered hint for the student's query.
 */
router.post('/', getHint);

module.exports = router;
