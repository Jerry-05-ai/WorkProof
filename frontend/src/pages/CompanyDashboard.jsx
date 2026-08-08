// frontend/src/pages/CompanyDashboard.jsx
// Route: /company  (company_admin)
// Connects to GET /api/company/dashboard.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";

export default function CompanyDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/company/dashboard");
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.error || "Could not load dashboard.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={s.page}><p>Loading dashboard…</p></div>;
  if (error) return <div style={s.page}><p style={s.error}>{error}</p></div>;

  const stat = data.stats;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>Company overview</h1>
        <Link to="/company/employees" style={s.cta}>Manage employees</Link>
      </div>

      <div style={s.statGrid}>
        <StatCard label="Total employees" value={stat.total_employees} />
        <StatCard label="Active" value={stat.active_employees} accent />
        <StatCard label="Verified" value={stat.verified_employees} />
        <StatCard label="Left the company" value={stat.terminated_employees} />
        <StatCard
          label="Avg. performance"
          value={stat.average_performance != null ? stat.average_performance.toFixed(1) : "—"}
        />
      </div>

      <div style={s.twoCol}>
        <section style={s.card}>
          <h2 style={s.h2}>Departments</h2>
          {data.departments.length === 0 ? (
            <p style={s.muted}>No employees yet.</p>
          ) : (
            <ul style={s.list}>
              {data.departments.map((d) => (
                <li key={d.department} style={s.row}>
                  <span>{d.department}</span>
                  <span style={s.count}>{d.count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section style={s.card}>
          <h2 style={s.h2}>Top skills</h2>
          {data.skill_distribution.length === 0 ? (
            <p style={s.muted}>No skills recorded yet.</p>
          ) : (
            <ul style={s.list}>
              {data.skill_distribution.map((sk) => (
                <li key={sk.name} style={s.row}>
                  <span>{sk.name}</span>
                  <span style={s.count}>{sk.count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section style={s.card}>
        <h2 style={s.h2}>Recent activity</h2>
        {data.recent_activity.length === 0 ? (
          <p style={s.muted}>Nothing yet.</p>
        ) : (
          <ul style={s.list}>
            {data.recent_activity.map((a, i) => (
              <li key={i} style={s.activity}>
                <span style={s.activityAction}>{a.action.replace(/_/g, " ")}</span>
                <span style={s.muted}>{a.user} · {new Date(a.at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{ ...s.stat, ...(accent ? { borderTopColor: AMBER } : {}) }}>
      <div style={s.statValue}>{value}</div>
      <div style={s.statLabel}>{label}</div>
    </div>
  );
}

const s = {
  page: { maxWidth: 1080, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Inter, 'Open Sans', system-ui, sans-serif", color: NAVY },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  h1: { fontSize: "1.6rem", fontWeight: 800, margin: 0 },
  h2: { fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.9rem" },
  cta: { background: NAVY, color: "#fff", padding: "0.6rem 1rem", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.5rem" },
  stat: { background: "#fff", borderRadius: 12, padding: "1.25rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", borderTop: `3px solid ${NAVY}` },
  statValue: { fontSize: "2rem", fontWeight: 800, lineHeight: 1 },
  statLabel: { color: "#64748B", fontSize: "0.85rem", marginTop: "0.4rem" },
  twoCol: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", marginBottom: "1.5rem" },
  card: { background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", marginBottom: "1.5rem" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  row: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #EEF2F7" },
  count: { fontWeight: 700, color: AMBER },
  activity: { display: "flex", flexDirection: "column", padding: "0.5rem 0", borderBottom: "1px solid #EEF2F7" },
  activityAction: { fontWeight: 600, textTransform: "capitalize" },
  muted: { color: "#94A3B8", fontSize: "0.9rem" },
  error: { color: "#B91C1C" },
};
