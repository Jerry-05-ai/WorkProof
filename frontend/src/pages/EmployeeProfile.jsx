// frontend/src/pages/EmployeeProfile.jsx
// Route: /company/employees/:id  (company_admin)
// Full profile: details + skills + projects + achievements + behavior.
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";

const NAVY = "#1A2B4C";
const AMBER = "#D4A849";
const BEHAVIOR_CATEGORIES = [
  "collaboration", "communication", "reliability", "leadership",
  "problem_solving", "adaptability", "professional_growth",
];

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await api.get(`/api/company/employees/${id}`);
      setEmp(res.data.employee);
      setProfile(res.data.profile);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not load employee.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const remove = async () => {
    if (!window.confirm("Remove this employee? Their verified history is preserved.")) return;
    await api.delete(`/api/company/employees/${id}`);
    navigate("/company/employees");
  };

  if (loading) return <div style={s.page}><p>Loading…</p></div>;
  if (error) return <div style={s.page}><p style={s.error}>{error}</p></div>;

  return (
    <div style={s.page}>
      <button style={s.back} onClick={() => navigate("/company/employees")}>← Employees</button>

      <div style={s.headerCard}>
        <div>
          <h1 style={s.h1}>{emp.full_name} {emp.is_verified && <span style={s.verified}>Verified</span>}</h1>
          <div style={s.subtitle}>{emp.job_title} · {emp.department}</div>
          <div style={s.meta}>
            {emp.email} · {emp.employment_type.replace("_", " ")} · {emp.employment_status}
            {emp.location ? ` · ${emp.location}` : ""}
          </div>
        </div>
        <button style={s.danger} onClick={remove}>Remove</button>
      </div>

      <BehaviorSection id={id} profile={profile} reload={load} />
      <SkillsSection id={id} skills={profile.skills} reload={load} />
      <ProjectsSection id={id} projects={profile.projects} reload={load} />
      <AchievementsSection id={id} achievements={profile.achievements} reload={load} />
    </div>
  );
}

/* ---------------- Behavior ---------------- */
function BehaviorSection({ id, profile, reload }) {
  const [category, setCategory] = useState(BEHAVIOR_CATEGORIES[0]);
  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState("");
  const [saving, setSaving] = useState(false);
  const summary = profile.behavior_summary;

  const add = async () => {
    setSaving(true);
    try {
      await api.post(`/api/company/employees/${id}/behavior`, { category, rating: Number(rating), comments });
      setComments("");
      reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title="Behavior ratings" badge={summary.behavior_score != null ? `Score ${summary.behavior_score}` : null}>
      <div style={s.behaviorGrid}>
        {BEHAVIOR_CATEGORIES.map((cat) => (
          <div key={cat} style={s.behaviorCell}>
            <span style={s.behaviorLabel}>{cat.replace(/_/g, " ")}</span>
            <span style={s.behaviorValue}>{summary.by_category?.[cat] ?? "—"}</span>
          </div>
        ))}
      </div>
      <div style={s.inlineForm}>
        <select style={s.input} value={category} onChange={(e) => setCategory(e.target.value)}>
          {BEHAVIOR_CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
        </select>
        <select style={s.input} value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <input style={s.input} placeholder="Comment (optional)" value={comments} onChange={(e) => setComments(e.target.value)} />
        <button style={s.add} onClick={add} disabled={saving}>Add</button>
      </div>
    </Section>
  );
}

/* ---------------- Skills ---------------- */
function SkillsSection({ id, skills, reload }) {
  const [form, setForm] = useState({ name: "", category: "", proficiency_level: "intermediate", years_experience: "" });
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const add = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post(`/api/company/employees/${id}/skills`, {
        ...form,
        years_experience: form.years_experience === "" ? undefined : Number(form.years_experience),
      });
      setForm({ name: "", category: "", proficiency_level: "intermediate", years_experience: "" });
      reload();
    } finally {
      setSaving(false);
    }
  };

  const verify = async (skillRowId) => {
    await api.put(`/api/company/employees/${id}/skills/${skillRowId}`, { is_verified: true });
    reload();
  };

  return (
    <Section title="Skills">
      {skills.length === 0 ? <p style={s.muted}>No skills yet.</p> : (
        <div style={s.chips}>
          {skills.map((sk) => (
            <div key={sk.id} style={s.chip}>
              <span style={s.chipName}>{sk.name}</span>
              <span style={s.chipLevel}>{sk.proficiency_level}</span>
              {sk.is_verified
                ? <span style={s.chipVerified}>✓</span>
                : <button style={s.chipVerify} onClick={() => verify(sk.id)}>Verify</button>}
            </div>
          ))}
        </div>
      )}
      <div style={s.inlineForm}>
        <input style={s.input} placeholder="Skill name" value={form.name} onChange={update("name")} />
        <input style={s.input} placeholder="Category" value={form.category} onChange={update("category")} />
        <select style={s.input} value={form.proficiency_level} onChange={update("proficiency_level")}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <input style={s.input} type="number" step="0.5" placeholder="Yrs" value={form.years_experience} onChange={update("years_experience")} />
        <button style={s.add} onClick={add} disabled={saving}>Add</button>
      </div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */
function ProjectsSection({ id, projects, reload }) {
  const [form, setForm] = useState({ name: "", role: "", technologies: "", status: "in_progress" });
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const add = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post(`/api/company/employees/${id}/projects`, form);
      setForm({ name: "", role: "", technologies: "", status: "in_progress" });
      reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title="Projects">
      {projects.length === 0 ? <p style={s.muted}>No projects yet.</p> : (
        <ul style={s.list}>
          {projects.map((p) => (
            <li key={p.id} style={s.projItem}>
              <div style={s.projTop}>
                <span style={s.projName}>{p.name}</span>
                <span style={s.projStatus}>{p.status.replace("_", " ")}</span>
              </div>
              {p.role && <div style={s.muted}>{p.role}</div>}
              {p.technologies && <div style={s.tech}>{p.technologies}</div>}
            </li>
          ))}
        </ul>
      )}
      <div style={s.inlineForm}>
        <input style={s.input} placeholder="Project name" value={form.name} onChange={update("name")} />
        <input style={s.input} placeholder="Role" value={form.role} onChange={update("role")} />
        <input style={s.input} placeholder="Technologies" value={form.technologies} onChange={update("technologies")} />
        <select style={s.input} value={form.status} onChange={update("status")}>
          <option value="planned">Planned</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <button style={s.add} onClick={add} disabled={saving}>Add</button>
      </div>
    </Section>
  );
}

/* ---------------- Achievements ---------------- */
function AchievementsSection({ id, achievements, reload }) {
  const [form, setForm] = useState({ title: "", category: "certification", date: "" });
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const add = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await api.post(`/api/company/employees/${id}/achievements`, form);
      setForm({ title: "", category: "certification", date: "" });
      reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title="Achievements">
      {achievements.length === 0 ? <p style={s.muted}>No achievements yet.</p> : (
        <ul style={s.list}>
          {achievements.map((a) => (
            <li key={a.id} style={s.achItem}>
              <span style={s.achTitle}>{a.title}</span>
              <span style={s.achCat}>{a.category}{a.date ? ` · ${a.date}` : ""}</span>
            </li>
          ))}
        </ul>
      )}
      <div style={s.inlineForm}>
        <input style={s.input} placeholder="Achievement title" value={form.title} onChange={update("title")} />
        <select style={s.input} value={form.category} onChange={update("category")}>
          <option value="certification">Certification</option>
          <option value="award">Award</option>
          <option value="publication">Publication</option>
          <option value="other">Other</option>
        </select>
        <input style={s.input} type="date" value={form.date} onChange={update("date")} />
        <button style={s.add} onClick={add} disabled={saving}>Add</button>
      </div>
    </Section>
  );
}

/* ---------------- Shared ---------------- */
function Section({ title, badge, children }) {
  return (
    <section style={s.card}>
      <div style={s.sectionHead}>
        <h2 style={s.h2}>{title}</h2>
        {badge && <span style={s.scoreBadge}>{badge}</span>}
      </div>
      {children}
    </section>
  );
}

const s = {
  page: { maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Inter, 'Open Sans', system-ui, sans-serif", color: NAVY },
  back: { background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: "0.9rem", marginBottom: "1rem", padding: 0 },
  headerCard: { background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  h1: { fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.3rem" },
  verified: { background: "#DCFCE7", color: "#166534", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: 999, verticalAlign: "middle" },
  subtitle: { color: AMBER, fontWeight: 600 },
  meta: { color: "#64748B", fontSize: "0.85rem", marginTop: "0.3rem", textTransform: "capitalize" },
  card: { background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 4px 16px rgba(26,43,76,0.06)", marginBottom: "1.25rem" },
  sectionHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  h2: { fontSize: "1.1rem", fontWeight: 700, margin: 0 },
  scoreBadge: { background: NAVY, color: "#fff", fontSize: "0.8rem", fontWeight: 700, padding: "0.25rem 0.7rem", borderRadius: 999 },
  behaviorGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.6rem", marginBottom: "1rem" },
  behaviorCell: { background: "#F7F9FC", borderRadius: 8, padding: "0.6rem", textAlign: "center" },
  behaviorLabel: { display: "block", fontSize: "0.72rem", color: "#64748B", textTransform: "capitalize", marginBottom: "0.25rem" },
  behaviorValue: { fontSize: "1.3rem", fontWeight: 800, color: NAVY },
  inlineForm: { display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginTop: "0.75rem" },
  input: { flex: 1, minWidth: 90, padding: "0.55rem 0.7rem", border: "1px solid #D8E0EC", borderRadius: 8, fontSize: "0.9rem", outlineColor: AMBER },
  add: { background: AMBER, color: NAVY, border: "none", borderRadius: 8, padding: "0.55rem 1rem", fontWeight: 700, cursor: "pointer" },
  chips: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  chip: { display: "flex", alignItems: "center", gap: "0.4rem", background: "#F7F9FC", borderRadius: 999, padding: "0.35rem 0.75rem" },
  chipName: { fontWeight: 600, fontSize: "0.88rem" },
  chipLevel: { fontSize: "0.72rem", color: "#64748B", textTransform: "capitalize" },
  chipVerified: { color: "#16A34A", fontWeight: 800 },
  chipVerify: { background: "none", border: `1px solid ${AMBER}`, color: NAVY, borderRadius: 999, fontSize: "0.7rem", padding: "0.1rem 0.5rem", cursor: "pointer" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  projItem: { padding: "0.6rem 0", borderBottom: "1px solid #EEF2F7" },
  projTop: { display: "flex", justifyContent: "space-between" },
  projName: { fontWeight: 600 },
  projStatus: { fontSize: "0.78rem", color: "#64748B", textTransform: "capitalize" },
  tech: { fontSize: "0.8rem", color: AMBER, marginTop: "0.2rem" },
  achItem: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #EEF2F7" },
  achTitle: { fontWeight: 600 },
  achCat: { fontSize: "0.8rem", color: "#64748B", textTransform: "capitalize" },
  danger: { background: "#fff", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 8, padding: "0.5rem 0.9rem", fontWeight: 600, cursor: "pointer" },
  muted: { color: "#94A3B8", fontSize: "0.9rem" },
  error: { color: "#B91C1C" },
};
