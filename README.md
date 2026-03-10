
# SQL Editor 
![CipherSQLStudio Cover](./frontend/src/assets/Screenshot%202026-03-04%20150716.png)
This is the setup guide I wish I had before running this project the first time.

If you just want to run the app locally, follow the **Quick Start** section. If something fails, check **Troubleshooting** at the end.

---

## What this project is

CipherSQLStudio is a SQL practice platform:
- frontend shows assignments and a SQL editor,
- backend executes safe queries,
- PostgreSQL stores sandbox tables for query execution,
- MongoDB stores assignment metadata and progress,
- OpenAI is used only for hint generation.

---
## Project Structure

```
cipher/
├── backend/
│   ├── controllers/       # Route handlers
│   ├── db/                # DB connections + seed files   
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
## Technology choices (and why)

### Frontend: React + Vite + Monaco Editor
- **React** keeps the UI modular (assignment list, editor page, hint/result panels).
- **Vite** gives fast startup + hot reload during development.
- **Monaco Editor** is the same editor engine used in VS Code, so SQL editing feels familiar.

### Backend: Node.js + Express
- **Express** keeps routing and middleware simple (`/execute`, `/assignments`, `/hint`).
- Easy to add middleware for SQL validation, rate limiting, and security headers.

### Databases: PostgreSQL + MongoDB
- **PostgreSQL** is ideal for SQL-learning execution, joins, grouping, and realistic query behavior.
- **MongoDB** is a good fit for flexible assignment documents (difficulty, question text, sample metadata).

### AI: OpenAI API
- Used for hints, not full answers.
- Keeps tutoring behavior separate from query execution logic.

---

## Quick Start

### 1) Prerequisites

Install these first:
- Node.js 18+
- npm 9+
- PostgreSQL (running locally)
- MongoDB (local or Atlas)

Check quickly:

```bash
node -v
npm -v
```

### 2) Install dependencies

From project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3) Configure environment

Create/update `backend/.env` with the values below.

```env
# Server
PORT=5000

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_postgres_password
PG_DATABASE=ciphersql_sandbox

# MongoDB
MONGO_URI=mongodb://localhost:27017/ciphersqlstudio
# (or Atlas URI)

# OpenAI (optional but required for live hints)
OPENAI_API_KEY=sk-your-key
```

Important:
- No extra spaces around values (especially `OPENAI_API_KEY`).
- Database name must match the one you seed (`ciphersql_sandbox` by default).

### 4) Seed data

#### PostgreSQL seed

Run from project root (PowerShell example):

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ciphersql_sandbox -f .\backend\db\seed-postgres.sql
```

#### MongoDB seed

```bash
cd backend
npm run seed:mongo
```

### 5) Run backend + frontend

Use two terminals.

Terminal A:

```bash
cd backend
npm run dev
```

Terminal B:

```bash
cd frontend
npm run dev
```

Open:
- Frontend: `http://localhost:5173`
- Backend : `http://localhost:5000/`

---

## Environment variables reference

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `PORT` | Yes | `5000` | Express server port |
| `PG_HOST` | Yes | `localhost` | PostgreSQL host |
| `PG_PORT` | Yes | `5432` | PostgreSQL port |
| `PG_USER` | Yes | `postgres` | PostgreSQL user |
| `PG_PASSWORD` | Yes | `secret` | PostgreSQL password |
| `PG_DATABASE` | Yes | `ciphersql_sandbox` | DB used for query execution |
| `MONGO_URI` | Yes | `mongodb://localhost:27017/ciphersqlstudio` | Mongo connection string |
| `OPENAI_API_KEY` | Optional* | `sk-...` | Hint generation |

\*Optional for app boot, but required if you want AI hints from OpenAI.

---

## API overview

- `GET /api/assignments` → assignment list
- `GET /api/assignments/:id` → assignment details
- `POST /api/execute` → executes validated SQL query
- `POST /api/hint` → returns SQL hint
- `GET /api/health` → health check

---

## Troubleshooting

 
 
 
### Execute returns "Only SELECT queries are allowed"
- Remove non-SELECT commands.
- Keep query as a single statement.
- If your editor starts with a comment line, ensure backend validation supports comment stripping.

### Hint endpoint fails
- Check `OPENAI_API_KEY` is valid and has no leading/trailing spaces.
- If quota is exceeded, handle fallback hint on backend.

### No rows shown in editor after Ctrl+Enter
- Ensure Monaco keyboard command is wired to the latest execute handler (avoid stale closures).

---

## Suggested workflow for contributors

1. Pull latest `main`.
2. Run both servers.
3. Test one assignment end-to-end:
   - open assignment,
   - execute query,
   - verify results,
   - request hint.
4. Make focused changes (backend or frontend), not both unless needed.
5. Re-test `/api/execute` and `/api/hint` before pushing.

---
## 📸 Screenshots

| Query Problem | Query Execution |
| :---: | :---: |
| ![Dashboard](./frontend/src/assets/Screenshot%202026-03-04%20150826.png) | ![Query Execution](./frontend/src/assets/Screenshot%202026-03-04%20150852.png) |

