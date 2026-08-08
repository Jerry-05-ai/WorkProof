// frontend/src/pages/EmployeeManagement.jsx
// Route: /company/employees  (company_admin)
// Lists employees (GET /api/company/employees), supports search/filter + create.
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/company/employees", {
        params: { search, employment_status: status },
      });
      setEmployees(res.data.employees);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const t = setTimeout(load, 250); // debounce search
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>Employees</h1>
        <button style={s.cta} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "Add employee"}
        </button>
      </div>

      {showForm && <CreateEmployeeForm onCreated={() => { setShowForm(false); load(); }} />}

      <div style={s.filters}>
        <input
          style={s.input}
          placeholder="Search name, email, or title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={s.input} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      {loading ? (
        <p style={s.muted}>Loading…</p>
      ) : employees.length === 0 ? (
        <div style={s.empty}>No employees match. Add your first one to get started.</div>
      ) : (
        <div style={s.grid}>
          {employees.map((e) => (
            <Link key={e.id} to={`/company/employees/${e.id}`} style={s.empCard}>
              <div style={s.empTop}>
                <span style={s.empName}>{e.full_name}</span>
                {e.is_verified && <span style={s.verified}>Verified</span>}
              </div>
              <div style={s.empTitle}>{e.job_title}</div>
              <div style={s.empMeta}>{e.department} · {e.employment_status}</div>
              <div style={s.empEmail}>{e.email}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateEmployeeForm({ onCreated }) {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", job_title: "", department: "",
    employment_type: "full_time",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setError("");
    setSaving(true);
    try {
      await api.post("/api/company/employees", form);
      onCreated();
    } catch (err) {
      setError(err?.response?.data?.error || "Could not create employee.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={s.formCard}>
      <div style={s.formRow}>
        <input style={s.input} placeholder="First name" value={form.first_name} onChange={update("first_name")} />
        <input style={s.input} placeholder="Last name" value={form.last_name} onChange={update("last_name")} />
      </div>
      <input style={s.input} placeholder="Email" value={form.email} onChange={update("email")} />
      <div style={s.formRow}>
        <input style={s.input} placeholder="Job title" value={form.job_title} onChange={update("job_title")} />
        <input style={s.input} placeholder="Department" value={form.department} onChange={update("department")} />
      </div>
      <select style={s.input} value={form.employment_type} onChange={update("employment_type")}>
        <option value="full_time">Full time</option>
        <option value="part_time">Part time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>
      {error && <div style={s.errorBox}>{error}</div>}
      <button style={s.cta} onClick={submit} disabled={saving}>
        {saving ? "Saving…" : "Create employee"}
      </button>
    </div>
  );
}

const s = {
  page: { maxWidth: 1080, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Inter, 'Open Sans', system-ui, sans-serif", color: NAVY },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  h1: { fontSize: "1.6rem", fontWeight: 800, margin: 0 },
  cta: { background: NAVY, color: "#fff", padding: "0.6rem 1rem", borderRadius: 8, border: "none", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" },
  filters: { display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" },
  input: { flex: 1, minWidth: 160, padding: "0.65rem 0.8rem", border: "1px solid #D8E0EC", borderRadius: 8, fontSize: "0.95rem", outlineColor: AMBER },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" },
  empCard: { background: "#fff", borderRadius: 12, padding: "1.1rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", textDecoration: "none", color: NAVY, display: "block" },
  empTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  empName: { fontWeight: 700, fontSize: "1.05rem" },
  verified: { background: "#DCFCE7", color: "#166534", fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 999 },
  empTitle: { color: AMBER, fontWeight: 600, fontSize: "0.9rem", marginTop: "0.3rem" },
  empMeta: { color: "#64748B", fontSize: "0.82rem", marginTop: "0.2rem", textTransform: "capitalize" },
  empEmail: { color: "#94A3B8", fontSize: "0.8rem", marginTop: "0.4rem" },
  formCard: { background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
  formRow: { display: "flex", gap: "0.75rem" },
  errorBox: { background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", borderRadius: 8, padding: "0.6rem 0.8rem", fontSize: "0.85rem" },
  empty: { background: "#fff", borderRadius: 12, padding: "3rem 1.5rem", textAlign: "center", color: "#94A3B8", boxShadow: "0 4px 16px rgba(26,43,76,0.06)" },
  muted: { color: "#94A3B8" },
};
