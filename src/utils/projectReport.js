// src/utils/projectReport.js
// Builds a self-contained, printable HTML document for the Monthly Project
// Report from live report data returned by GET /api/company/projects/report.
// The markup mirrors the WorkProof dashboard visual language (indigo primary,
// slate text, rounded cards, progress bars) but is fully inline-styled so it
// renders identically in a new tab / print / print-to-PDF context.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const COLORS = {
  primary: '#4338CA',
  primaryHover: '#3730A3',
  primarySoft: '#EEF2FF',
  accent: '#7C3AED',
  success: '#059669',
  warning: '#D97706',
  danger: '#DC2626',
  text: '#0F172A',
  textSecondary: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
  surface2: '#F1F5F9',
  bg: '#F8FAFC',
};

const STATUS_LABELS = {
  not_started: 'Not Started',
  recruiting: 'Recruiting',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
};

const STATUS_COLORS = {
  not_started: COLORS.muted,
  recruiting: COLORS.warning,
  in_progress: COLORS.primary,
  on_hold: COLORS.danger,
  completed: COLORS.success,
};

const PRIORITY_COLORS = {
  low: COLORS.muted,
  medium: COLORS.warning,
  high: COLORS.danger,
};

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const fmtDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return esc(d);
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const statusBadge = (status) => {
  const color = STATUS_COLORS[status] || COLORS.muted;
  return `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:${color};background:${color}14;border:1px solid ${color}33;">${esc(STATUS_LABELS[status] || status)}</span>`;
};

const priorityBadge = (priority) => {
  const color = PRIORITY_COLORS[priority] || COLORS.muted;
  const label = priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : '—';
  return `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:${color};background:${color}14;border:1px solid ${color}33;">${esc(label)}</span>`;
};

const progressBar = (pct, color = COLORS.primary) => {
  const value = Math.max(0, Math.min(100, Number(pct) || 0));
  return `
    <div style="width:100%;height:10px;background:${COLORS.surface2};border-radius:9999px;overflow:hidden;">
      <div style="width:${value}%;height:100%;background:${color};border-radius:9999px;"></div>
    </div>`;
};

const statCard = (label, value, color = COLORS.text) => `
  <div style="flex:1;min-width:120px;background:#fff;border:1px solid ${COLORS.border};border-radius:14px;padding:16px;text-align:center;">
    <div style="font-size:26px;font-weight:800;color:${color};line-height:1;">${esc(value)}</div>
    <div style="font-size:12px;color:${COLORS.muted};margin-top:6px;">${esc(label)}</div>
  </div>`;

const progressBlock = (label, pct, color = COLORS.primary) => `
  <div style="margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
      <span style="color:${COLORS.textSecondary};font-weight:600;">${esc(label)}</span>
      <span style="color:${COLORS.text};font-weight:700;">${Math.round(Number(pct) || 0)}%</span>
    </div>
    ${progressBar(pct, color)}
  </div>`;

const sectionTitle = (title) => `
  <h2 style="font-size:16px;font-weight:800;color:${COLORS.text};margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid ${COLORS.primary};letter-spacing:-0.01em;">${esc(title)}</h2>`;

function projectDetailBlock(p) {
  const rows = [
    ['Department', p.department || '—'],
    ['Lead', p.project_lead || '—'],
    ['Start Date', fmtDate(p.start_date)],
    ['End Date', fmtDate(p.end_date)],
    ['Required Positions', p.open_positions + p.filled_positions],
    ['Filled Positions', p.filled_positions],
    ['Remaining Open', p.remaining_positions],
    ['Recruiters Assigned', (p.assigned_recruiters || []).length],
    ['Employees Assigned', (p.assigned_employees || []).length],
    ['Tasks Completed', p.tasks_completed],
    ['Tasks Remaining', p.tasks_remaining],
    ['Last Updated', fmtDate(p.updated_at)],
  ];
  const cells = rows
    .map(
      ([k, v]) => `
      <div style="padding:6px 0;border-bottom:1px solid ${COLORS.border};display:flex;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:${COLORS.muted};">${esc(k)}</span>
        <span style="font-size:12px;color:${COLORS.text};font-weight:600;text-align:right;">${esc(v)}</span>
      </div>`
    )
    .join('');

  return `
    <div style="background:#fff;border:1px solid ${COLORS.border};border-radius:14px;padding:18px;margin-bottom:14px;break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
        <div>
          <div style="font-size:15px;font-weight:800;color:${COLORS.text};">${esc(p.name)}</div>
          ${p.client_name ? `<div style="font-size:12px;color:${COLORS.muted};margin-top:2px;">Client: ${esc(p.client_name)}</div>` : ''}
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">${statusBadge(p.status)}${priorityBadge(p.priority)}</div>
      </div>
      ${progressBlock('Progress', p.progress, STATUS_COLORS[p.status] || COLORS.primary)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 24px;margin-top:6px;">
        ${cells}
      </div>
    </div>`;
}

export function buildReportHtml(report) {
  const monthName = MONTHS[(report.period?.month || 1) - 1] || '';
  const year = report.period?.year || '';
  const generatedDate = report.generated_at
    ? new Date(report.generated_at).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : new Date().toLocaleString();

  const s = report.summary || {};
  const op = report.overall_progress || {};
  const sb = report.status_breakdown || {};
  const ps = report.performance_summary || {};
  const fs = report.final_summary || {};
  const projects = report.projects || [];

  const summaryCards = `
    <div style="display:flex;flex-wrap:wrap;gap:12px;">
      ${statCard('Total Projects', s.total_projects ?? 0, COLORS.primary)}
      ${statCard('Active', s.active_projects ?? 0, COLORS.accent)}
      ${statCard('Recruiting', s.recruiting_projects ?? 0, COLORS.warning)}
      ${statCard('Completed', s.completed_projects ?? 0, COLORS.success)}
      ${statCard('On Hold', s.on_hold_projects ?? 0, COLORS.danger)}
      ${statCard('Not Started', s.not_started_projects ?? 0, COLORS.muted)}
    </div>`;

  const overallBlock = `
    <div style="background:#fff;border:1px solid ${COLORS.border};border-radius:14px;padding:20px;">
      ${progressBlock('Overall Completion', op.completion_percentage, COLORS.primary)}
      ${progressBlock('Overall Recruitment Progress', op.recruitment_progress, COLORS.warning)}
      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;">
        ${statCard('Employee Allocation (avg/project)', op.employee_allocation ?? 0, COLORS.accent)}
        ${statCard('Total Open Roles', op.total_open_roles ?? 0, COLORS.warning)}
        ${statCard('Total Filled Roles', op.total_filled_roles ?? 0, COLORS.success)}
      </div>
    </div>`;

  const statusBreakdownBlock = `
    <div style="display:flex;flex-wrap:wrap;gap:12px;">
      ${statCard('Recruiting', sb.recruiting ?? 0, COLORS.warning)}
      ${statCard('In Progress', sb.in_progress ?? 0, COLORS.primary)}
      ${statCard('Completed', sb.completed ?? 0, COLORS.success)}
      ${statCard('On Hold', sb.on_hold ?? 0, COLORS.danger)}
      ${statCard('Not Started', sb.not_started ?? 0, COLORS.muted)}
    </div>`;

  const performanceBlock = `
    <div style="background:#fff;border:1px solid ${COLORS.border};border-radius:14px;padding:20px;">
      ${progressBlock('Average Project Completion', ps.average_project_completion, COLORS.primary)}
      ${progressBlock('Recruitment Efficiency', ps.recruitment_efficiency, COLORS.warning)}
      ${progressBlock('Employee Utilization', ps.employee_utilization, COLORS.accent)}
      ${progressBlock('Overall Company Progress', ps.overall_company_progress, COLORS.success)}
    </div>`;

  const listOrDash = (arr) =>
    arr && arr.length
      ? `<ul style="margin:6px 0 0;padding-left:18px;">${arr.map((n) => `<li style="font-size:13px;color:${COLORS.textSecondary};margin-bottom:3px;">${esc(n)}</li>`).join('')}</ul>`
      : `<div style="font-size:13px;color:${COLORS.muted};margin-top:4px;">None</div>`;

  const recommendedActions = [];
  if ((fs.projects_behind_schedule || []).length) recommendedActions.push('Prioritise projects behind schedule and re-baseline their timelines.');
  if ((fs.projects_needing_attention || []).length) recommendedActions.push('Accelerate recruitment for projects with remaining open positions.');
  if ((s.on_hold_projects ?? 0) > 0) recommendedActions.push('Review on-hold projects and confirm whether they should resume or close.');
  if (!recommendedActions.length) recommendedActions.push('Maintain current momentum — projects are tracking well this period.');

  const finalSummaryBlock = `
    <div style="background:${COLORS.primarySoft};border:1px solid ${COLORS.primary}33;border-radius:14px;padding:20px;">
      <p style="font-size:13px;color:${COLORS.textSecondary};margin:0 0 14px;line-height:1.6;">
        During <strong>${esc(monthName)} ${esc(year)}</strong>, ${esc(report.company?.name || 'the company')} managed
        <strong>${s.total_projects ?? 0}</strong> project(s), with an average completion of
        <strong>${op.completion_percentage ?? 0}%</strong> and an overall company progress score of
        <strong>${ps.overall_company_progress ?? 0}%</strong>. ${s.completed_projects ?? 0} project(s) were completed and
        ${s.active_projects ?? 0} remained active.
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <div style="font-size:13px;font-weight:700;color:${COLORS.success};">Completed Successfully</div>
          ${listOrDash(fs.projects_completed)}
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:${COLORS.warning};">Needing Attention</div>
          ${listOrDash(fs.projects_needing_attention)}
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:${COLORS.danger};">Behind Schedule</div>
          ${listOrDash(fs.projects_behind_schedule)}
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:${COLORS.primary};">Recommended Next Actions</div>
          ${listOrDash(recommendedActions)}
        </div>
      </div>
    </div>`;

  const detailBlocks = projects.length
    ? projects.map(projectDetailBlock).join('')
    : `<div style="background:#fff;border:1px dashed ${COLORS.border};border-radius:14px;padding:32px;text-align:center;color:${COLORS.muted};font-size:14px;">No projects to report for this period.</div>`;

  const logo = `
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:40px;height:40px;border-radius:11px;background:${COLORS.primary};display:flex;align-items:center;justify-content:center;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <span style="font-size:22px;font-weight:800;color:${COLORS.primary};letter-spacing:-0.02em;">WorkProof</span>
    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Monthly Project Report — ${esc(monthName)} ${esc(year)}</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; background:${COLORS.bg}; color:${COLORS.text};
    font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  .page { max-width: 900px; margin: 0 auto; padding: 32px; }
  .toolbar { position: sticky; top:0; background:${COLORS.bg}; padding:12px 0 16px; display:flex; gap:10px; justify-content:flex-end; z-index:10; }
  .btn { border:none; cursor:pointer; font-weight:700; font-size:13px; padding:9px 16px; border-radius:8px; }
  .btn-primary { background:${COLORS.primary}; color:#fff; }
  .btn-primary:hover { background:${COLORS.primaryHover}; }
  .btn-outline { background:#fff; color:${COLORS.textSecondary}; border:1px solid ${COLORS.border}; }
  @media print {
    .toolbar { display:none !important; }
    body { background:#fff; }
    .page { max-width:none; padding:0; }
    @page { margin: 16mm; }
  }
</style>
</head>
<body>
  <div class="page">
    <div class="toolbar">
      <button class="btn btn-outline" onclick="window.print()">Print</button>
      <button class="btn btn-primary" onclick="window.print()">Download PDF</button>
    </div>

    <!-- Report Header -->
    <div style="background:#fff;border:1px solid ${COLORS.border};border-radius:16px;padding:24px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap;">
      <div>
        ${logo}
        <div style="font-size:20px;font-weight:800;color:${COLORS.text};margin-top:16px;">Monthly Project Report</div>
        <div style="font-size:14px;color:${COLORS.muted};margin-top:4px;">${esc(monthName)} ${esc(year)}</div>
      </div>
      <div style="text-align:right;font-size:12px;color:${COLORS.muted};line-height:1.9;">
        <div><strong style="color:${COLORS.textSecondary};">Company:</strong> ${esc(report.company?.name || '—')}</div>
        <div><strong style="color:${COLORS.textSecondary};">Generated:</strong> ${esc(generatedDate)}</div>
        <div><strong style="color:${COLORS.textSecondary};">Generated By:</strong> ${esc(report.generated_by || '—')}</div>
      </div>
    </div>

    ${sectionTitle('Project Summary')}
    ${summaryCards}

    ${sectionTitle('Overall Progress')}
    ${overallBlock}

    ${sectionTitle('Project Details')}
    ${detailBlocks}

    ${sectionTitle('Status Breakdown')}
    ${statusBreakdownBlock}

    ${sectionTitle('Performance Summary')}
    ${performanceBlock}

    ${sectionTitle('Final Summary')}
    ${finalSummaryBlock}

    <div style="margin-top:28px;text-align:center;font-size:11px;color:${COLORS.muted};">
      Generated by WorkProof · ${esc(report.company?.name || '')} · ${esc(monthName)} ${esc(year)}
    </div>
  </div>
</body>
</html>`;
}

export function openReportWindow(report) {
  const html = buildReportHtml(report);
  const win = window.open('', '_blank');
  if (!win) return false;
  win.document.open();
  win.document.write(html);
  win.document.close();
  return true;
}
