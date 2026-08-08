import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity, ArrowRight, BadgeCheck, Bell, Bookmark, Brain, Briefcase,
  Building2, CheckCircle2, ChevronRight, FileCheck2, Lock, Search,
  ShieldCheck, Sparkles, Star, UserCheck, Users,
} from 'lucide-react';
import { useApp } from '../../store/context';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';
import { LandingNav } from '../../components/layout/LandingNav';

const FEATURES = [
  { icon: FileCheck2, title: 'Verified skills & projects', description: 'Companies validate real contributions, projects, and skill levels — building a tamper-proof record of actual work.' },
  { icon: Brain, title: 'Workforce intelligence', description: 'Understand your team with verified skill data, performance insights, and growth potential in one dashboard.' },
  { icon: ShieldCheck, title: 'Verification requests', description: 'Review, approve, and manage verification requests so every record on a profile is backed by an employer.' },
  { icon: Briefcase, title: 'Internal projects', description: 'Track internal projects and tie employee contributions to the work that actually shipped.' },
  { icon: Lock, title: 'Employee privacy controls', description: 'Employees decide exactly what is shared and when. Profiles are private by default — always.' },
  { icon: Search, title: 'Talent discovery', description: 'Recruiters discover proven candidates with verified backgrounds and make confident, data-backed decisions.' },
  { icon: Bookmark, title: 'Saved candidates & opportunities', description: 'Shortlist verified talent and manage hiring opportunities without losing track of strong matches.' },
  { icon: Bell, title: 'Notifications & activity feed', description: 'Stay on top of verifications, employment changes, and platform activity as it happens.' },
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
};

const Eyebrow = ({ children, dark = false }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${
    dark
      ? 'border-white/15 bg-white/10 text-indigo-100'
      : 'border-border bg-surface text-primary dark:border-white/10 dark:bg-white/5 dark:text-indigo-200'
  }`}>
    <Sparkles className="h-3.5 w-3.5" />
    {children}
  </div>
);

const SectionHeading = ({ eyebrow, title, children, centered = true }) => (
  <motion.div {...reveal} className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-text sm:text-4xl lg:text-5xl dark:text-white">{title}</h2>
    {children && <p className="mt-5 text-base leading-8 text-muted sm:text-lg dark:text-slate-300">{children}</p>}
  </motion.div>
);

const DashboardPreview = ({ company, employees, skills, projects, performanceRecords, activities }) => {
  const chart = performanceRecords.slice(-4);
  const activityRows = activities.slice(0, 2);
  const actionLabel = (action) => action.replaceAll('_', ' ').toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[620px]"
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-indigo-500/20 blur-3xl dark:bg-violet-500/20" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-2xl shadow-indigo-950/15 dark:border-white/10 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">WorkProof</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Company overview</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live workspace
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-400">Workspace</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">{company?.name || 'Your company'}</h3>
            </div>
            <span className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">All time</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ['Employees', employees.length, Users],
              ['Verified skills', skills.filter((skill) => skill.verified).length, BadgeCheck],
              ['Projects', projects.length, Briefcase],
            ].map(([label, value, Icon]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.04]">
                <Icon className="mb-3 h-4 w-4 text-indigo-500" />
                <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Performance trend</p>
                <Activity className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="flex h-24 items-end gap-2">
                {(chart.length ? chart : [{ id: 'empty-1', overallScore: 0 }, { id: 'empty-2', overallScore: 0 }]).map((record, index) => (
                  <div key={record.id} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-16 w-full items-end rounded-md bg-indigo-50 p-1 dark:bg-indigo-400/10">
                      <div className="w-full rounded-sm bg-gradient-to-t from-indigo-600 to-violet-400 transition-all" style={{ height: `${record.overallScore ? Math.max(25, (record.overallScore / 5) * 100) : 25}%` }} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{record.month || `0${index + 1}`}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
              <p className="mb-3 text-xs font-bold text-slate-700 dark:text-slate-200">Recent activity</p>
              <div className="space-y-3">
                {activityRows.length ? activityRows.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <p className="text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{activity.actor}</span> {actionLabel(activity.action)}
                    </p>
                  </div>
                )) : <p className="text-[11px] text-slate-400">Your verified activity will appear here.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-xl sm:flex dark:border-white/10 dark:bg-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div>
        <div><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Trust status</p><p className="text-xs font-bold text-slate-800 dark:text-white">Verified by employers</p></div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div {...reveal} transition={{ ...reveal.transition, delay: index * 0.04 }} className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5 dark:border-white/10 dark:bg-slate-900 dark:hover:border-indigo-400/30">
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-indigo-400/10 dark:text-indigo-300 dark:group-hover:bg-indigo-500">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-base font-bold tracking-tight text-text dark:text-white">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">{description}</p>
  </motion.div>
);

const AboutPoint = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary dark:bg-indigo-400/10 dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
    <div><h3 className="font-bold tracking-tight text-text dark:text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-muted dark:text-slate-400">{description}</p></div>
  </div>
);

const VisualStep = ({ number, title, description, isLast = false }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">{number}</div>
      {!isLast && <div className="mt-2 min-h-10 w-px flex-1 bg-gradient-to-b from-indigo-300 to-transparent dark:from-indigo-500/50" />}
    </div>
    <div className="pb-7"><h3 className="font-bold tracking-tight text-text dark:text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-muted dark:text-slate-400">{description}</p></div>
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();
  const approvedCompanies = state.companies.filter((company) => company.verificationStatus === 'APPROVED');
  const activeEmployees = state.employees.filter((employee) => employee.employmentStatus === 'active');

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (target === 'home') window.scrollTo({ top: 0 });
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <LandingNav />

      <main>
        <section id="home" className="relative scroll-mt-16 bg-background">
          <div className="pointer-events-none absolute inset-0 bg-hero-glow dark:opacity-40" />
          <div className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
          <div className="pointer-events-none absolute -left-40 top-72 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
            <motion.div {...reveal} className="max-w-xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-white/5 dark:text-indigo-200">
                <BadgeCheck className="h-4 w-4 text-emerald-500" /> The trust layer for modern work
              </div>
              <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.065em] text-text sm:text-6xl lg:text-[4.75rem] dark:text-white">
                Let your work <span className="text-gradient-brand">speak for itself.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted dark:text-slate-300">WorkProof turns real contributions into verified professional records — so companies, employees, and recruiters can work from the same source of truth.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => navigate('/register')} className="rounded-xl px-6 shadow-primary-glow">Register your company <ArrowRight className="h-5 w-5" /></Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="rounded-xl bg-surface/70 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">Login</Button>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-muted dark:text-slate-400">
                <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-emerald-500" /> Private by default</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Employer verified</span>
              </div>
            </motion.div>
            <DashboardPreview company={approvedCompanies[0]} employees={activeEmployees} skills={state.skills} projects={state.projects} performanceRecords={state.performanceRecords} activities={state.activities} />
          </div>
        </section>

        {approvedCompanies.length > 0 && (
          <section className="border-y border-border bg-surface/80 dark:border-white/10 dark:bg-slate-900/60">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:px-8">
              <p className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-muted dark:text-slate-400">Trusted by verified companies</p>
              <div className="hidden h-px flex-1 bg-border lg:block dark:bg-white/10" />
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {approvedCompanies.map((company) => <span key={company.id} className="inline-flex items-center gap-2 text-sm font-bold text-text dark:text-slate-200"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-xs text-primary dark:bg-indigo-400/10 dark:text-indigo-300">{company.name.charAt(0)}</span>{company.name}</span>)}
              </div>
            </div>
          </section>
        )}

        <section id="about" className="scroll-mt-16 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <motion.div {...reveal}>
              <Eyebrow>About WorkProof</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-text sm:text-4xl lg:text-5xl dark:text-white">Professional reputation, backed by real work.</h2>
              <p className="mt-6 text-base leading-8 text-muted dark:text-slate-300">Hiring runs on claims that are hard to check. WorkProof replaces self-reported CVs with records verified by the companies people have actually worked for — turning contributions into a portable, trusted profile.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => navigate('/register')}>Register your company <ArrowRight className="h-4 w-4" /></Button><Button variant="outline" onClick={() => navigate('/contact')} className="dark:border-white/15 dark:bg-white/5 dark:text-white">Contact us</Button></div>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="grid gap-6 rounded-3xl border border-border bg-surface p-7 shadow-xl shadow-slate-900/5 sm:grid-cols-2 sm:p-9 dark:border-white/10 dark:bg-slate-900">
              <AboutPoint icon={ShieldCheck} title="Verified, not self-reported" description="Every skill and project is validated by an employer before it appears on a profile." />
              <AboutPoint icon={Lock} title="Private by default" description="Employees choose exactly what is shared and when." />
              <AboutPoint icon={Users} title="Built for every role" description="Purpose-built experiences for companies, employees, and recruiters." />
              <AboutPoint icon={Activity} title="Transparent by design" description="A clear activity trail keeps verifications accountable." />
            </motion.div>
          </div>
          <motion.div {...reveal} className="mt-16 grid grid-cols-2 gap-3 border-t border-border pt-8 sm:grid-cols-4 sm:gap-6 dark:border-white/10">
            {[
              ['Verified companies', approvedCompanies.length],
              ['Active employees', activeEmployees.length],
              ['Verified skills', state.skills.filter((skill) => skill.verified).length],
              ['Tracked projects', state.projects.length],
            ].map(([label, value]) => <div key={label}><p className="text-3xl font-bold tracking-tight text-text tabular-nums sm:text-4xl dark:text-white">{value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">{label}</p></div>)}
          </motion.div>
        </section>

        <section className="border-y border-border bg-surface/70 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div><Eyebrow>How it works</Eyebrow><h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-text sm:text-4xl">From real work to trusted reputation.</h2><p className="mt-5 leading-7 text-muted">A simple, privacy-first workflow that keeps ownership with the people whose work it represents.</p></div>
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-10">
              <VisualStep number={1} title="Private while employed" description="Your data stays strictly within your organization until you choose otherwise." />
              <VisualStep number={2} title="Company verifies real work" description="Employers validate your actual contributions, projects, and skills." />
              <VisualStep number={3} title="Employee builds verified history" description="Accumulate a tamper-proof record of professional achievements." />
              <VisualStep number={4} title="Employee chooses visibility" description="You decide when and what to share with potential employers." />
              <VisualStep number={5} title="Public verified profile" description="Share a trusted career profile that speaks for itself." isLast />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="For every side of work" title="One trusted record. Every perspective.">Give companies clarity, employees ownership, and recruiters confidence — all from the same verified source.</SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [Building2, 'For companies', 'Understand your workforce with verified skill data, performance insights, and growth potential.', 'from-indigo-500 to-blue-600'],
              [UserCheck, 'For employees', 'Own your verified career story. Build a trusted reputation based on real work.', 'from-violet-500 to-fuchsia-600'],
              [Users, 'For recruiters', 'Discover proven talent with verified backgrounds and make confident hiring decisions.', 'from-teal-500 to-emerald-600'],
            ].map(([Icon, title, description, gradient]) => <motion.div key={title} {...reveal} className="group rounded-3xl border border-border bg-surface p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"><div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}><Icon className="h-6 w-6" /></div><h3 className="text-xl font-bold tracking-tight text-text dark:text-white">{title}</h3><p className="mt-3 leading-7 text-muted dark:text-slate-400">{description}</p><span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary dark:text-indigo-300">Explore WorkProof <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></motion.div>)}
          </div>
        </section>

        <section id="features" className="scroll-mt-16 border-y border-border bg-surface/70 dark:border-white/10 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionHeading eyebrow="The platform" title="Everything you need to prove real work.">A complete toolkit for verifying, understanding, and sharing professional records across companies, employees, and recruiters.</SectionHeading>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{FEATURES.map((feature, index) => <FeatureCard key={feature.title} {...feature} index={index} />)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div {...reveal} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-7 py-12 text-center shadow-2xl shadow-indigo-900/20 sm:px-12 lg:px-20">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="relative"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white"><Lock className="h-7 w-7" /></div><h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">Your privacy is our foundation.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">Your profile is never automatically made public. You maintain complete control over what information is shared and when.</p><div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> 100% private by default</div></div>
          </motion.div>
        </section>

        {state.feedback.length > 0 && (
          <section className="border-y border-border bg-surface/70 dark:border-white/10 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
              <SectionHeading eyebrow="Proof in practice" title="Real feedback, connected to real work." />
              <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
                {state.feedback.slice(0, 2).map((feedback) => <motion.figure key={feedback.id} {...reveal} className="rounded-2xl border border-border bg-surface p-7 dark:border-white/10 dark:bg-slate-900"><div className="flex gap-1 text-amber-400">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-4 w-4 ${star <= Math.round(feedback.rating) ? 'fill-current' : ''}`} />)}</div><blockquote className="mt-5 text-lg font-medium leading-8 text-text dark:text-white">“{feedback.text}”</blockquote><figcaption className="mt-6 text-sm text-muted dark:text-slate-400"><span className="font-bold text-text dark:text-slate-200">{feedback.from}</span> · Verified {feedback.type} feedback</figcaption></motion.figure>)}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <motion.div {...reveal}><Eyebrow>Build trust into your work</Eyebrow><h2 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-text sm:text-5xl dark:text-white">Ready to make work speak louder?</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted dark:text-slate-300">Start building trusted professional records for your employees today.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" onClick={() => navigate('/register')}>Register your company <ArrowRight className="h-5 w-5" /></Button><Button size="lg" variant="outline" onClick={() => navigate('/contact')} className="dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">Contact us</Button></div></motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
