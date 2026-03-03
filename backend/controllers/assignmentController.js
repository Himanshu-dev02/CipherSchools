const Assignment = require('../models/Assignment');

/**
 * Get all assignments — returns summary info for the listing page.
 */
const getAll = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .select('title description difficulty')
            .sort({ difficulty: 1 });

        res.json({ success: true, data: assignments });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Get a single assignment by ID — returns full details for the editor page.
 */
const getById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                error: 'Assignment not found.',
            });
        }

        res.json({ success: true, data: assignment });
    } catch (err) {
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                error: 'Invalid assignment ID format.',
            });
        }
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { getAll, getById };
