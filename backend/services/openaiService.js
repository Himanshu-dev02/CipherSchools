const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Strict system prompt that prevents the AI from giving full answers.
 * It must only provide guiding hints to help the student think.
 */
const SYSTEM_PROMPT = `You are a helpful SQL tutor for a learning platform called CipherSQLStudio.

STRICT RULES:
1. You MUST NEVER provide the complete SQL query or the final answer.
2. You MUST NEVER write a working SELECT statement that solves the problem.
3. You MUST provide only 2–3 short, guiding sentences that help the student think in the right direction.
4. You may mention relevant SQL concepts, keywords, or clauses (e.g., "Consider using a JOIN", "Think about GROUP BY").
5. If the student's query is partially correct, acknowledge what's right and hint at what's missing.
6. If the student's query is empty, give a starting direction without revealing the solution.
7. Keep your response concise and encouraging.

REMEMBER: You are a tutor, not a solution provider. Guide, don't solve.`;

/**
 * Call OpenAI to generate a hint based on the student's current query
 * and the assignment question.
 *
 * @param {string} studentQuery - The SQL query the student has written so far
 * @param {string} question - The assignment question
 * @returns {string} A hint string (2-3 sentences)
 */
const getHintFromAI = async (studentQuery, question) => {
    const userMessage = `Assignment Question: "${question}"

Student's current SQL query: "${studentQuery || '(empty — student has not written anything yet)'}"

Provide a helpful hint (2-3 guiding sentences only, NO full solution):`;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage },
        ],
        max_tokens: 150,
        temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
};

module.exports = { getHintFromAI };
