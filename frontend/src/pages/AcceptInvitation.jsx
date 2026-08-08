// frontend/src/pages/AcceptInvitation.jsx
// Route: /accept-invitation?token=xxx
// Verifies the invite token, then lets the invitee set a password.
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../lib/api";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";

export default function AcceptInvitation() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();

  const [phase, setPhase] = useState("verifying"); // verifying | form | done | invalid
  const [invite, setInvite] = useState(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setPhase("invalid");
      return;
    }
    (async () => {
      try {
        const { data } = await api.get("/api/company/invitations/verify", { params: { token } });
        setInvite(data.invitation);
        setForm((f) => ({
          ...f,
          first_name: data.invitation.first_name || "",
          last_name: data.invitation.last_name || "",
        }));
        setPhase("form");
      } catch {
        setPhase("invalid");
      }
    })();
  }, [token]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/api/company/invitations/accept", {
        token,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        password: form.password,
      });
      setPhase("done");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          Work<span style={{ color: AMBER }}>Proof</span>
        </div>

        {phase === "verifying" && <p style={styles.muted}>Verifying your invitation…</p>}

        {phase === "invalid" && (
          <>
            <h1 style={styles.title}>Invitation not valid</h1>
            <p style={styles.muted}>
              This invitation link is invalid or has expired. Ask your company admin to send a new one.
            </p>
            <Link to="/login" style={styles.link}>Back to sign in</Link>
          </>
        )}

        {phase === "form" && (
          <>
            <h1 style={styles.title}>Set up your account</h1>
            <p style={styles.muted}>
              You've been invited to join{" "}
              <strong style={{ color: NAVY }}>{invite?.company_name}</strong> as{" "}
              <strong style={{ color: NAVY }}>{invite?.email}</strong>.
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.row}>
                <label style={styles.label}>
                  First name
                  <input style={styles.input} value={form.first_name} onChange={update("first_name")} required />
                </label>
                <label style={styles.label}>
                  Last name
                  <input style={styles.input} value={form.last_name} onChange={update("last_name")} required />
                </label>
              </div>
              <label style={styles.label}>
                Password
                <input style={styles.input} type="password" value={form.password} onChange={update("password")} required />
              </label>
              <label style={styles.label}>
                Confirm password
                <input style={styles.input} type="password" value={form.confirm} onChange={update("confirm")} required />
              </label>
              <p style={styles.hint}>At least 8 characters, with upper &amp; lowercase letters and a number.</p>
              {error && <div style={styles.error}>{error}</div>}
              <button type="submit" style={styles.button} disabled={submitting}>
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>
          </>
        )}

        {phase === "done" && (
          <>
            <h1 style={styles.title}>You're all set</h1>
            <p style={styles.muted}>Your account has been created. Redirecting you to sign in…</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#F7F9FC", fontFamily: "Inter, 'Open Sans', system-ui, sans-serif", padding: "1.5rem",
  },
  card: {
    width: "100%", maxWidth: 460, background: "#FFFFFF", borderRadius: 12,
    boxShadow: "0 8px 30px rgba(26,43,76,0.08)", padding: "2.5rem",
  },
  brand: { fontSize: "1.5rem", fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: "1.5rem" },
  title: { color: NAVY, fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.5rem" },
  muted: { color: "#64748B", lineHeight: 1.6, margin: "0 0 1.25rem" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  row: { display: "flex", gap: "0.75rem" },
  label: { flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", fontWeight: 600, color: NAVY },
  input: { padding: "0.7rem 0.85rem", border: "1px solid #D8E0EC", borderRadius: 8, fontSize: "1rem", outlineColor: AMBER },
  hint: { fontSize: "0.8rem", color: "#94A3B8", margin: 0 },
  error: { background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", borderRadius: 8, padding: "0.6rem 0.8rem", fontSize: "0.85rem" },
  button: { padding: "0.8rem", background: NAVY, color: "#FFFFFF", border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: "pointer" },
  link: { color: NAVY, fontWeight: 600 },
};
