# WorkProof — Phase 1 (Foundation)

Authentication, company registration, employee invitations, and role-based routing.

This bundle is **additive**: the backend is self-contained, and the frontend files
drop into your existing React + Vite app without replacing your UI.

---

## 1. Requirements

- PHP 8.0+ with `pdo_mysql` (and `curl` if you want to run the flow tests)
- MySQL 5.7+ / MariaDB 10.3+
- Node 18+ (for the existing React + Vite frontend)

---

## 2. Backend setup

### a. Create the database and load the schema

```bash
mysql -u root -p < database/schema.sql
```

This creates the `workproof` database and all tables.

### b. Configure the connection

`backend/config/database.php` reads env vars with sensible fallbacks. Either export
them or copy `backend/.env.example` into your hosting panel:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=workproof
DB_USER=root
DB_PASS=yourpassword
FRONTEND_ORIGIN=http://localhost:5173
```

`FRONTEND_ORIGIN` controls CORS (so the session cookie is accepted) **and** the base
URL used in invitation links.

### c. Seed the demo accounts

```bash
php backend/scripts/seed.php
```

This wipes and repopulates the core tables, then writes `CREDENTIALS.md` with the four
demo accounts in plaintext. Each user gets a unique bcrypt hash.

### d. Run the backend

Point your PHP host's document root at `backend/` (the included `.htaccess` routes
everything through `index.php`). For local dev:

```bash
php -S localhost:8000 -t backend backend/index.php
```

### e. Cron (monthly reports — stub in Phase 1)

```
0 0 1 * * /usr/bin/php /path/to/backend/cron/monthly_reports.php
```

---

## 3. Frontend integration

Copy `frontend/src/lib`, `frontend/src/context`, and `frontend/src/pages` into your
app (merge with existing folders). Then:

### a. Install axios

```bash
npm install axios
```

### b. Point the API base at your backend

Add to your frontend `.env`:

```
VITE_API_URL=http://localhost:8000
```

### c. Wrap your app in the AuthProvider

```jsx
// main.jsx (or App.jsx)
import { AuthProvider } from "./context/AuthContext";

<AuthProvider>
  <App />
</AuthProvider>
```

### d. Add the routes and guards

```jsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicOnlyRoute } from "./context/RouteGuards";
import Login from "./pages/Login";
import CompanyStatus from "./pages/CompanyStatus";
import AcceptInvitation from "./pages/AcceptInvitation";

<Routes>
  <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
  <Route path="/accept-invitation" element={<AcceptInvitation />} />
  <Route path="/company/status" element={
    <ProtectedRoute roles={["company_admin"]}><CompanyStatus /></ProtectedRoute>
  } />

  {/* Phase 2 company pages */}
  <Route path="/company" element={
    <ProtectedRoute roles={["company_admin"]}><CompanyDashboard /></ProtectedRoute>
  } />
  <Route path="/company/employees" element={
    <ProtectedRoute roles={["company_admin"]}><EmployeeManagement /></ProtectedRoute>
  } />
  <Route path="/company/employees/:id" element={
    <ProtectedRoute roles={["company_admin"]}><EmployeeProfile /></ProtectedRoute>
  } />

  {/* Your existing dashboards, now guarded: */}
  <Route path="/admin/*" element={
    <ProtectedRoute roles={["platform_admin"]}><AdminDashboard /></ProtectedRoute>
  } />
  <Route path="/employee/*" element={
    <ProtectedRoute roles={["employee"]}><EmployeeDashboard /></ProtectedRoute>
  } />
  <Route path="/recruiter/*" element={
    <ProtectedRoute roles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>
  } />
</Routes>
```

After login, `roleHome(user.role)` sends each role to its own dashboard
(`/admin`, `/company`, `/employee`, `/recruiter`). Adjust those paths if yours differ.

---

## 4. API reference (Phase 1)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/login` | public | Session login (HTTP-only cookie) |
| POST | `/api/auth/logout` | public | Destroy session |
| GET | `/api/auth/me` | session | Current user (+ company if any) |
| POST | `/api/companies/register` | public | Register a company (status: pending) |
| GET | `/api/companies/status` | company_admin | Company approval status |
| POST | `/api/company/invitations` | company_admin | Send employee invitation |
| GET | `/api/company/invitations/verify` | public | Verify an invite token |
| POST | `/api/company/invitations/accept` | public | Accept invite, set password |
| GET | `/api/company/dashboard` | company_admin | Stats, departments, skills, activity |
| GET | `/api/company/employees` | company_admin | List employees (search/filter) |
| POST | `/api/company/employees` | company_admin | Create an employee |
| GET | `/api/company/employees/{id}` | company_admin | Employee + full profile |
| PUT | `/api/company/employees/{id}` | company_admin | Update employee |
| DELETE | `/api/company/employees/{id}` | company_admin | Soft delete employee |
| POST | `/api/company/employees/{id}/skills` | company_admin | Add a skill |
| PUT | `/api/company/employees/{id}/skills/{skillId}` | company_admin | Update/verify a skill |
| POST | `/api/company/employees/{id}/projects` | company_admin | Add a project |
| PUT | `/api/company/employees/{id}/projects/{projectId}` | company_admin | Update a project |
| POST | `/api/company/employees/{id}/achievements` | company_admin | Add an achievement |
| POST | `/api/company/employees/{id}/behavior` | company_admin | Add a behavior rating (1–5) |

Filters for `GET /api/company/employees`: `search`, `department`, `employment_status`,
`is_verified` (query params). Every employee endpoint enforces tenant isolation —
requests for another company's employee id return 404.

### Register payload

```json
{
  "company_name": "Acme Inc",
  "company_email": "hello@acme.com",
  "admin_name": "Jane Doe",
  "admin_email": "jane@acme.com",
  "password": "StrongPass1",
  "industry": "Technology",
  "size": "10-50",
  "country": "Pakistan",
  "city": "Lahore"
}
```

Required: `company_name`, `company_email`, `admin_name`, `admin_email`, `password`.
The rest are optional.

---

## 5. Testing checklist

1. `php backend/scripts/seed.php` → check `CREDENTIALS.md` exists.
2. Log in as each of the four demo accounts.
3. Register a new company → its admin logs in → sees `/company/status` (pending).
4. As `company@workproof.demo` (NovaTech, pre-approved), send an invitation.
5. Open the returned `accept_url` → set a password → log in as the new employee.
6. Confirm each role lands on its own dashboard and cannot reach another's.

> Company approval is a Phase 2 feature (platform admin action). NovaTech is seeded as
> `approved` so the invitation flow works immediately in the demo.

---

## 6. Security notes

- Passwords hashed with `password_hash()` (bcrypt); never stored or logged in plaintext
  except the demo `CREDENTIALS.md`.
- Invitation tokens are random 32-byte values; only their SHA-256 hash is stored.
- Sessions use HTTP-only, SameSite=Strict cookies; `Secure` is set under HTTPS.
- Every endpoint validates input server-side and enforces role + tenant checks.
- All writes to sensitive entities are recorded in `audit_logs`.

---

## 7. File map

```
database/schema.sql              Full DB schema (all phases)
backend/
  index.php                      Front controller / router
  .htaccess                      Apache rewrite to index.php
  .env.example                   Env template
  config/database.php            PDO connection
  config/auth.php                Sessions, CORS, middleware
  models/{User,Company,Invitation}.php          (Phase 1)
  models/{Employee,Skill,Project,Achievement,BehaviorRating}.php   (Phase 2)
  utils/{helpers,events}.php
  api/auth/{login,logout,me}.php
  api/companies/{register,status}.php
  api/company/{invitations,invitations_verify,invitations_accept}.php
  api/company/dashboard.php                      (Phase 2)
  api/company/employees.php                      (Phase 2: list + create)
  api/company/employee_detail.php                (Phase 2: get/update/delete)
  api/company/employee_{skills,projects,achievements,behavior}.php  (Phase 2)
  scripts/seed.php               Seeds demo data (2 companies) + writes CREDENTIALS.md
  cron/monthly_reports.php       Cron stub (Phase 1)
frontend/src/
  lib/api.js                     Axios instance (withCredentials)
  context/AuthContext.jsx        Auth state
  context/RouteGuards.jsx        ProtectedRoute / PublicOnlyRoute
  pages/{Login,CompanyStatus,AcceptInvitation}.jsx                 (Phase 1)
  pages/{CompanyDashboard,EmployeeManagement,EmployeeProfile}.jsx  (Phase 2)
```
