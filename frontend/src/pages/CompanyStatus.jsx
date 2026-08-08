// frontend/src/pages/CompanyStatus.jsx
// Route: /company/status
// Shows the company's approval state. Company admins land here until approved.
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";

const STATUS_META = {
  pending: {
    title: "Approval pending",
    body: "Your registration is under review by the WorkProof team. You'll get access to your dashboard as soon as it's approved.",
    color: AMBER,
    badge: "Pending review",
  },
  approved: {
    title: "You're approved",
    body: "Your company has been verified. Head to your dashboard to start inviting employees.",
    color: "#16A34A",
    badge: "Approved",
  },
  rejected: {
    title: "Registration not approved",
    body: "Your registration wasn't approved. Contact support if you believe this is a mistake.",
    color: "#DC2626",
    badge: "Rejected",
  },
  suspended: {
    title: "Account suspended",
    body: "Your company account is currently suspended. Contact support for details.",
    color: "#DC2626",
    badge: "Suspended",
  },
};

export default function CompanyStatus() {
  const { company: ctxCompany, logout, refresh } = useAuth();
  const [company, setCompany] = useState(ctxCompany);
  const [loading, setLoading] = useState(!ctxCompany);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get("/api/companies/status");
        if (active) setCompany(data.company);
      } catch {
        // fall back to context value
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div style={styles.page}><p>Loading…</p></div>;
  }

  const meta = STATUS_META[company?.status] || STATUS_META.pending;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <span style={{ ...styles.badge, background: meta.color }}>{meta.badge}</span>
        <h1 style={styles.title}>{meta.title}</h1>
        <p style={styles.company}>{company?.name}</p>
        <p style={styles.body}>{meta.body}</p>

        <div style={styles.actions}>
          {company?.status === "approved" ? (
            <button style={styles.primary} onClick={() => refresh()}>
              Continue to dashboard
            </button>
          ) : (
            <button style={styles.secondary} onClick={() => window.location.reload()}>
              Refresh status
            </button>
          )}
          <button style={styles.linkBtn} onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F7F9FC",
    fontFamily: "Inter, 'Open Sans', system-ui, sans-serif",
    padding: "1.5rem",
  },
  card: {
    width: "100%",
    maxWidth: 480,
    background: "#FFFFFF",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(26,43,76,0.08)",
    padding: "2.5rem",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    color: "#FFFFFF",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "0.35rem 0.75rem",
    borderRadius: 999,
    marginBottom: "1.25rem",
  },
  title: { color: NAVY, fontSize: "1.6rem", fontWeight: 800, margin: "0 0 0.35rem" },
  company: { color: AMBER, fontWeight: 700, margin: "0 0 1rem" },
  body: { color: "#475569", lineHeight: 1.6, margin: "0 0 1.75rem" },
  actions: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  primary: {
    padding: "0.8rem", background: NAVY, color: "#FFFFFF", border: "none",
    borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: "pointer",
  },
  secondary: {
    padding: "0.8rem", background: "#FFFFFF", color: NAVY, border: `1px solid ${NAVY}`,
    borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: "pointer",
  },
  linkBtn: {
    background: "none", border: "none", color: "#64748B",
    fontSize: "0.9rem", cursor: "pointer", textDecoration: "underline",
  },
};
