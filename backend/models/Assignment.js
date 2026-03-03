const mongoose = require('mongoose');

/**
 * Assignment schema — stores pre-configured SQL assignments.
 * These are seeded into MongoDB and are read-only for students.
 */
const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        expectedTables: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
