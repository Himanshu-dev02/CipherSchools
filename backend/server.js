require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const connectMongo = require('./db/mongo');

// Import routes
const executeRoutes = require('./routes/executeRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const hintRoutes = require('./routes/hintRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ──────────────────────────────
app.use(helmet());

// ─── Rate Limiting ────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: { success: false, error: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// ─── Body Parsing & CORS ─────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size for safety

// ─── API Routes ───────────────────────────────────────
app.use('/api/execute', executeRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/hint', hintRoutes);

// ─── Health Check ─────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'CipherSQLStudio API is running 🚀' });
});

// ─── Global Error Handler ─────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error.',
    });
});

// ─── Start Server ─────────────────────────────────────
const startServer = async () => {
    // Connect to MongoDB first
    await connectMongo();

    app.listen(PORT, () => {
        console.log(`🚀 CipherSQLStudio API running on http://localhost:${PORT}`);
    });
};

startServer();
