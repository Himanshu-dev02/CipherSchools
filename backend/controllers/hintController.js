const { getHintFromAI } = require('../services/openaiService');

/**
 * Generate an AI-powered hint for the student's query.
 * The AI is strictly instructed to provide guidance only — never the full answer.
 */
const getHint = async (req, res) => {
    const { query, question } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Assignment question is required.',
        });
    }

    try {
        const hint = await getHintFromAI(query || '', question);

        res.json({ success: true, hint });
    } catch (err) {
        console.error('Hint generation error:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to generate hint. Please try again later.',
        });
    }
};

module.exports = { getHint };
