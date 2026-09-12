# SkillBridge

SkillBridge is an academia–industry collaboration platform for skill mapping, skill assessment, skill-gap analysis, internships, placements and candidate matching.

**SIH Problem Statement:** SIH26044 — Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placements.

## Stack

- Frontend: React 18 + Vite + Tailwind CSS + Framer Motion
- Backend: FastAPI + SQLAlchemy + JWT + bcrypt
- Database: MySQL 8+
- Deployment: Vercel (frontend) + Railway (FastAPI + MySQL)

## Repository structure

```text
.
├── src/                 # React application
├── backend/             # FastAPI application
├── backend/schema.sql   # MySQL schema
├── vercel.json          # SPA routing for Vercel
└── railway.json         # Backend start/health configuration
```

## Local setup

### 1. Frontend

```bash
npm install
copy .env.example .env.local
npm run dev
```

On Windows, `.env.local` should contain:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 2. Backend

Create a MySQL database named `academia_portal`, then create `backend/.env` from `backend/.env.example` and set your local MySQL password and JWT secret.

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API automatically creates the SQLAlchemy tables and seeds three demo opportunities when the database is empty.

## Production deployment

### Architecture

```text
Browser
  │
  ▼
Vercel → React/Vite frontend
  │
  │ HTTPS API requests
  ▼
Railway → FastAPI backend
  │
  ▼
Railway → MySQL
```

### Railway

Create a Railway project with a MySQL database and a backend service using this repository. Set the backend service root directory to `backend/` and use:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Set:

```env
ENVIRONMENT=production
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE_MINUTES=1440
CORS_ORIGINS=https://<your-vercel-domain>
```

Railway's MySQL service provides `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, and `MYSQLDATABASE`, which the backend reads automatically.

### Vercel

Import the GitHub repository into Vercel. Use the repository root as the project root. Vercel should detect Vite and use:

```bash
npm run build
```

Set the Production environment variable:

```env
VITE_API_BASE_URL=https://<your-railway-backend-domain>
```

Redeploy after changing environment variables.

## Security rules

Never commit:

- `backend/.env`
- `.env.local`
- database passwords
- JWT secrets
- `node_modules/`
- `.venv/`
- `dist/`

The repository's `.gitignore` already excludes these files.

## Pre-deployment verification

```bash
npm install
npm run build
python -m compileall -q backend
```

Then verify the backend locally:

```text
http://localhost:8000/health
http://localhost:8000/docs
```
