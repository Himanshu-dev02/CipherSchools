const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/assignmentController');

/**
 * GET /api/assignments      — List all assignments
 * GET /api/assignments/:id  — Get single assignment details
 */
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;
