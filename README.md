# CipherSQLStudio

A browser-based SQL learning platform where students can view pre-configured SQL assignments, write queries in a Monaco editor, execute them against a PostgreSQL sandbox, and get AI-powered hints.

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React (Vite), SCSS, Monaco Editor, Axios   |
| Backend  | Node.js, Express.js                        |
| Database | PostgreSQL (sandbox), MongoDB (assignments)|
| AI       | OpenAI API (hints only)                    |

## Project Structure

```
cipher/
├── backend/
│   ├── controllers/       # Route handlers
│   ├── db/                # DB connections + seed files
│   ├── middleware/         # SQL validation
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── services/          # OpenAI service
│   ├── server.js          # Entry point
│   └── .env.example       # Environment template
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios API layer
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # SCSS design system
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   └── index.html
└── README.md
```

## Prerequisites

- **Node.js** v18+
- **PostgreSQL** running locally
- **MongoDB** running locally
- **OpenAI API Key** (optional — only for the hint feature)

## Setup Instructions

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:

```env
PORT=5000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=ciphersql_sandbox
MONGO_URI=mongodb://localhost:27017/ciphersqlstudio
OPENAI_API_KEY=sk-your-key-here
```

### 3. Seed Databases

```bash
# PostgreSQL — create tables and sample data
psql -U postgres -d ciphersql_sandbox -f backend/db/seed-postgres.sql

# MongoDB — seed assignments
cd backend
npm run seed:mongo
```

### 4. Run the App

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

## API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/assignments`   | List all assignments     |
| GET    | `/api/assignments/:id` | Get assignment details |
| POST   | `/api/execute`       | Execute a SELECT query   |
| POST   | `/api/hint`          | Get an AI-powered hint   |
| GET    | `/api/health`        | Health check             |

## Security

- Only `SELECT` queries are allowed
- `DROP`, `DELETE`, `INSERT`, `UPDATE`, `ALTER`, etc. are blocked
- Multi-statement queries are rejected
- 5-second query timeout enforced
- Rate limiting (100 requests per 15 minutes)
- Request body size limited to 10kb

## License

ISC
