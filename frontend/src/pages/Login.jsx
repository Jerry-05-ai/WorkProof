// frontend/src/pages/Login.jsx
// Replace your existing Login page with this, or adapt the handleSubmit logic
// into your current UI. Uses the AuthContext + real /api/auth/login endpoint.
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth, roleHome } from "../context/AuthContext";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      navigate(from || roleHome(user.role), { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.error || "Unable to sign in. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <span style={styles.brandMark}>Work<span style={{ color: AMBER }}>Proof</span></span>
          <p style={styles.subtitle}>Verified work history you own.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              style={styles.input}
              placeholder="you@company.com"
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={submitting} style={styles.button}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={styles.footer}>
          New company?{" "}
          <Link to="/register" style={{ color: NAVY, fontWeight: 600 }}>
            Register here
          </Link>
        </p>
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
    maxWidth: 420,
    background: "#FFFFFF",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(26,43,76,0.08)",
    padding: "2.5rem",
  },
  brand: { textAlign: "center", marginBottom: "2rem" },
  brandMark: { fontSize: "1.75rem", fontWeight: 800, color: NAVY, letterSpacing: "-0.02em" },
  subtitle: { color: "#64748B", marginTop: "0.5rem", fontSize: "0.95rem" },
  form: { display: "flex", flexDirection: "column", gap: "1.1rem" },
  label: { display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: NAVY },
  input: {
    padding: "0.75rem 0.9rem",
    border: "1px solid #D8E0EC",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: 400,
    outlineColor: AMBER,
  },
  error: {
    background: "#FEF2F2",
    color: "#B91C1C",
    border: "1px solid #FECACA",
    borderRadius: 8,
    padding: "0.65rem 0.8rem",
    fontSize: "0.88rem",
  },
  button: {
    marginTop: "0.4rem",
    padding: "0.8rem",
    background: NAVY,
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: { textAlign: "center", marginTop: "1.5rem", color: "#64748B", fontSize: "0.9rem" },
};
