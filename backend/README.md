# SkillBridge API

FastAPI + MySQL backend for SkillBridge.

## Local development

1. Create a MySQL database named `academia_portal` or use the included `schema.sql`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set `MYSQL_PASSWORD` and a development `JWT_SECRET`.
4. Install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
```

5. Start the API from the repository root:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: `http://localhost:8000/docs`
Health check: `http://localhost:8000/health`

## Production

The backend is designed to run as a persistent FastAPI service with MySQL. Railway is a suitable deployment target because it supports FastAPI services and a MySQL service in the same project.

Set these production variables in the backend service:

- `ENVIRONMENT=production`
- `JWT_SECRET=<strong-random-secret>`
- `JWT_EXPIRE_MINUTES=1440`
- `CORS_ORIGINS=https://<your-vercel-domain>`
- `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE` (provided by Railway's MySQL service), or `MYSQL_URL`

Do not commit secrets.
