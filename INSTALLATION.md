# WorkProof — Installation & Run Guide

Node.js **18+** and a **MySQL 8 / MariaDB 10.4+** server are required.

---

## 1. Database (one-time)

Create the schema (unchanged from the original app):

```bash
mysql -u root -p < database/schema.sql
```

This creates the `workproof` database and all tables.

---

## 2. Backend (Express API)

```bash
cd server
cp .env.example .env        # then edit .env with your DB credentials + a JWT secret
npm install
npm run seed                # optional: loads demo data + writes CREDENTIALS.md
npm run dev                 # starts on http://localhost:8000 (nodemon)
```

Generate a strong JWT secret for `.env`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Key `.env` values:

| Var | Dev value | Notes |
|-----|-----------|-------|
| `PORT` | `8000` | API port |
| `DB_HOST/PORT/NAME/USER/PASS` | your MySQL | database connection |
| `JWT_SECRET` | (random) | **required**; signs the auth cookie |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | CORS origin(s), comma-separated |
| `CROSS_SITE_COOKIES` | `false` | set `true` only if frontend + API are on different domains in prod |

`npm start` runs without nodemon (production).

---

## 3. Frontend (React)

From the project root (a **separate terminal**):

```bash
cp .env.example .env         # VITE_API_URL=http://localhost:8000
npm install
npm run dev                  # Vite dev server, http://localhost:5173
```

Build for production:

```bash
npm run build                # outputs dist/
```

The frontend talks to the API via `VITE_API_URL`. Cookies flow automatically
(`withCredentials`), and dev CORS allows any localhost origin — **no CORS setup needed**.

---

## 4. Demo login

After `npm run seed`, see `CREDENTIALS.md`. Summary:

| Role | Email | Password |
|------|-------|----------|
| Platform Admin | `admin@workproof.demo` | `DemoAdmin123!` |
| Company Admin | `company@workproof.demo` | `DemoCompany123!` |
| Employee | `employee@workproof.demo` | `DemoEmployee123!` |
| Recruiter | `recruiter@workproof.demo` | `DemoRecruiter123!` |

---

## 5. Monthly report cron (optional)

Generates monthly progress reports for all active employees:

```bash
cd server && npm run cron:monthly
```

Schedule monthly, e.g. crontab: `0 0 1 * * cd /path/to/server && /usr/bin/node scripts/monthly_reports.js`

---

## 6. Deployment

### Backend → Railway / Render
- Root directory: `server/`
- Build: `npm install` · Start: `npm start`
- Set env vars in the dashboard: `DB_*` (managed MySQL), `JWT_SECRET`,
  `NODE_ENV=production`, `FRONTEND_ORIGIN=https://your-frontend.vercel.app`,
  and `CROSS_SITE_COOKIES=true` (frontend and API are on different domains).
- Load `database/schema.sql` into the managed database once.

### Frontend → Vercel
- Framework preset: Vite · Build: `npm run build` · Output: `dist`
- Env var: `VITE_API_URL=https://your-api.up.railway.app` (your deployed backend).

### Cross-domain cookie note
In production the frontend (Vercel) and API (Railway/Render) are on different domains,
so the auth cookie is cross-site. The backend sets `SameSite=None; Secure` when
`CROSS_SITE_COOKIES=true` and `NODE_ENV=production` — both sides must be HTTPS
(they are by default on these platforms). Set `FRONTEND_ORIGIN` to the exact Vercel URL.

No `localhost` URLs remain in production config — everything is environment-driven.
