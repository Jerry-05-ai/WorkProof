import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Plus, Users, Calendar, CheckCircle2, Clock, ChevronRight,
  FileText, Trash2, UserCog, Target,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { useApp } from '../../../store/context';
import { companyApi } from '../../../services/company';
import { openReportWindow } from '../../../utils/projectReport';
import toast from 'react-hot-toast';

const INTERNAL_PROJECTS = [
  {
    id: 'iproj_001',
    name: 'AI Customer Support v2',
    department: 'Engineering',
    lead: 'Sarah Ahmed',
    status: 'active',
    startDate: '2026-07-01',
    endDate: '2026-10-01',
    openRoles: ['Backend Developer', 'ML Engineer'],
    team: ['Ayan Malik', 'Sara Ali', 'Usman Raza'],
    description: 'Upgrading the AI customer support system with multi-language support and advanced NLP capabilities.',
  },
  {
    id: 'iproj_002',
    name: 'Data Pipeline Modernization',
    department: 'Analytics',
    lead: 'Omar Hassan',
    status: 'recruiting',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    openRoles: ['Data Engineer', 'DevOps Specialist'],
    team: ['Fatima Khan'],
    description: 'Migrating legacy ETL pipelines to a modern cloud-based architecture with real-time streaming.',
  },
  {
    id: 'iproj_003',
    name: 'Employee Dashboard Redesign',
    department: 'Design',
    lead: 'Usman Raza',
    status: 'completed',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    openRoles: [],
    team: ['Zara Iqbal', 'Usman Raza', 'Sara Ali'],
    description: 'Complete redesign of the internal employee management dashboard with modern UI/UX.',
  },
];

const PROJECT_STATUSES = [
  { value: 'not_started', label: 'Not Started', variant: 'neutral' },
  { value: 'recruiting', label: 'Recruiting', variant: 'warning' },
  { value: 'in_progress', label: 'In Progress', variant: 'primary' },
  { value: 'on_hold', label: 'On Hold', variant: 'danger' },
  { value: 'completed', label: 'Completed', variant: 'success' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const statusMeta = (value) =>
  PROJECT_STATUSES.find((s) => s.value === value) || PROJECT_STATUSES[0];

const emptyProjectForm = () => ({
  name: '',
  description: '',
  department: '',
  client_name: '',
  start_date: '',
  end_date: '',
  priority: 'medium',
  status: 'not_started',
  project_lead: '',
  assigned_recruiters: '',
  assigned_employees: '',
  required_roles: '',
  open_positions: '',
  documents: [],
});

export const InternalProjects = () => {
  const { state, dispatch } = useApp();
  const isCompanyAdmin = state.currentUser?.role === 'COMPANY_ADMIN';

  // ----- existing invite flow (unchanged) -----
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('Ayan Malik');

  // ----- new: DB-backed company projects -----
  const [dbProjects, setDbProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState(emptyProjectForm());
  const [creating, setCreating] = useState(false);

  // ----- new: monthly report -----
  const now = new Date();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMonth, setReportMonth] = useState(now.getMonth() + 1);
  const [reportYear, setReportYear] = useState(now.getFullYear());
  const [reportType, setReportType] = useState('pdf');
  const [generatingReport, setGeneratingReport] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await companyApi.getProjects();
      if (data.success) setDbProjects(data.projects || []);
    } catch (err) {
      // Best-effort load; section stays empty on failure.
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInvite = () => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'projects',
        title: 'Internal Project Invitation',
        message: `You've been invited to join "${selectedProject?.name}" by NovaTech Solutions.`,
        read: false,
        createdAt: new Date().toISOString(),
        link: '/employee/opportunities',
      },
    });
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        actor: 'Sarah Ahmed',
        actorRole: 'COMPANY_ADMIN',
        action: 'PROJECT_INVITATION_SENT',
        target: `${selectedEmployee} → ${selectedProject?.name}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        metadata: { project: selectedProject?.name },
      },
    });
    toast.success(`Invitation sent to ${selectedEmployee}!`);
    setShowInviteModal(false);
  };

  const statusColor = (status) => {
    if (status === 'active') return 'success';
    if (status === 'recruiting') return 'warning';
    return 'secondary';
  };

  const splitList = (value) =>
    String(value || '')
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) {
      toast.error('Project name is required');
      return;
    }
    setCreating(true);
    try {
      const payload = {
        name: projectForm.name.trim(),
        description: projectForm.description || null,
        department: projectForm.department || null,
        client_name: projectForm.client_name || null,
        start_date: projectForm.start_date || null,
        end_date: projectForm.end_date || null,
        priority: projectForm.priority,
        status: projectForm.status,
        project_lead: projectForm.project_lead || null,
        required_roles: projectForm.required_roles || null,
        open_positions: projectForm.open_positions ? Number(projectForm.open_positions) : 0,
        assigned_recruiters: splitList(projectForm.assigned_recruiters),
        assigned_employees: splitList(projectForm.assigned_employees),
        documents: (projectForm.documents || []).map((f) => f.name),
      };
      const data = await companyApi.createProject(payload);
      if (data.success && data.project) {
        setDbProjects((prev) => [data.project, ...prev]);
        dispatch({
          type: 'ADD_ACTIVITY',
          payload: {
            id: `act_${Date.now()}`,
            actor: state.currentUser?.name || 'Company Admin',
            actorRole: 'COMPANY_ADMIN',
            action: 'PROJECT_CREATED',
            target: data.project.name,
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
            metadata: { project: data.project.name },
          },
        });
        toast.success('Project created successfully');
        setShowProjectModal(false);
        setProjectForm(emptyProjectForm());
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    try {
      const data = await companyApi.deleteProject(project.id);
      if (data.success) {
        setDbProjects((prev) => prev.filter((p) => p.id !== project.id));
        toast.success('Project deleted');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setGeneratingReport(true);
    try {
      const data = await companyApi.getProjectReport({ month: reportMonth, year: reportYear });
      if (data.success) {
        const opened = openReportWindow(data);
        if (!opened) {
          toast.error('Please allow pop-ups to view the report');
        } else {
          toast.success(
            reportType === 'print' ? 'Report ready — use Print in the new tab' : 'Monthly report generated'
          );
          setShowReportModal(false);
        }
      }
    } catch (err) {
      toast.error(err.message || 'Failed to generate report');
    } finally {
      setGeneratingReport(false);
    }
  };

  const years = [];
  for (let y = now.getFullYear() + 1; y >= now.getFullYear() - 4; y--) years.push(y);

  const inputClass =
    'w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text placeholder-muted-light shadow-xs transition-all duration-150 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10';

  return (
    <>
<div className="space-y-6">
{/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text">Internal Projects</h2>
                <p className="text-muted mt-1">Manage internal project invitations and team allocation</p>
              </div>
              {isCompanyAdmin && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowReportModal(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => { setProjectForm(emptyProjectForm()); setShowProjectModal(true); }}
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    New Project
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Active Projects', value: INTERNAL_PROJECTS.filter(p => p.status === 'active').length, icon: '🚀', color: 'text-success' },
                { label: 'Recruiting', value: INTERNAL_PROJECTS.filter(p => p.status === 'recruiting').length, icon: '🔍', color: 'text-warning' },
                { label: 'Completed', value: INTERNAL_PROJECTS.filter(p => p.status === 'completed').length, icon: '✅', color: 'text-primary' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 tabular-nums ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company Projects (DB-backed) */}
            {(dbProjects.length > 0 || (isCompanyAdmin && !loadingProjects)) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">Company Projects</h3>
                  {dbProjects.length > 0 && (
                    <span className="text-sm text-muted">{dbProjects.length} project{dbProjects.length === 1 ? '' : 's'}</span>
                  )}
                </div>

                {dbProjects.length === 0 ? (
                  <div className="bg-surface rounded-xl border border-dashed border-border-strong p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-text font-medium">No company projects yet</p>
                    <p className="text-sm text-muted mt-1">Create your first project to start tracking progress and hiring.</p>
                    {isCompanyAdmin && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-4"
                        onClick={() => { setProjectForm(emptyProjectForm()); setShowProjectModal(true); }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        New Project
                      </Button>
                    )}
                  </div>
                ) : (
                  dbProjects.map((project, i) => {
                    const meta = statusMeta(project.status);
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-surface rounded-xl border border-border shadow-sm p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                              <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <h3 className="font-semibold text-text">{project.name}</h3>
                                <Badge variant={meta.variant} size="sm">{meta.label}</Badge>
                                {project.priority && (
                                  <Badge
                                    variant={project.priority === 'high' ? 'danger' : project.priority === 'medium' ? 'warning' : 'neutral'}
                                    size="sm"
                                  >
                                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted">
                                {project.department || 'General'}
                                {project.project_lead ? ` • Lead: ${project.project_lead}` : ''}
                                {project.client_name ? ` • Client: ${project.client_name}` : ''}
                              </p>
                              {project.description && (
                                <p className="text-sm text-muted mt-2">{project.description}</p>
                              )}
                            </div>
                          </div>
                          {isCompanyAdmin && (
                            <button
                              onClick={() => handleDeleteProject(project)}
                              aria-label="Delete project"
                              className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-soft transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        {/* Progress bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-muted">Progress</span>
                            <span className="font-semibold text-text tabular-nums">{project.progress || 0}%</span>
                          </div>
                          <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${Math.max(0, Math.min(100, project.progress || 0))}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <Calendar className="h-4 w-4" />
                            <span>{project.start_date || '—'} → {project.end_date || '—'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <Users className="h-4 w-4" />
                            <span>{(project.assigned_employees || []).length} employees • {(project.assigned_recruiters || []).length} recruiters</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            {project.remaining_positions > 0 ? (
                              <>
                                <Clock className="h-4 w-4 text-warning" />
                                <span className="text-warning font-medium">{project.remaining_positions} open position{project.remaining_positions === 1 ? '' : 's'}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <span className="text-success">Positions filled</span>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}

            {/* Projects List (existing invite flow — unchanged) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">Project Invitations</h3>
              {INTERNAL_PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-surface rounded-xl border border-border shadow-sm p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-text">{project.name}</h3>
                          <Badge variant={statusColor(project.status)} size="sm">
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted">{project.department} • Lead: {project.lead}</p>
                        <p className="text-sm text-muted mt-2">{project.description}</p>
                      </div>
                    </div>
                    {project.status !== 'completed' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => { setSelectedProject(project); setShowInviteModal(true); }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Invite
                      </Button>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Calendar className="h-4 w-4" />
                      <span>{project.startDate} → {project.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Users className="h-4 w-4" />
                      <span>{project.team.length} team members</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {project.openRoles.length > 0 ? (
                        <>
                          <Clock className="h-4 w-4 text-warning" />
                          <span className="text-warning font-medium">{project.openRoles.length} open roles</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="text-success">Team complete</span>
                        </>
                      )}
                    </div>
                  </div>

                  {project.openRoles.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.openRoles.map((role) => (
                        <span key={role} className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
</div>
{/* Invite Modal (existing — unchanged) */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite to Project"
      >
        {selectedProject && (
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold text-text">{selectedProject.name}</h4>
              <p className="text-sm text-muted mt-1">{selectedProject.department} • Lead: {selectedProject.lead}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Select Employee</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-surface-2 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option>Ayan Malik</option>
                <option>Sara Ali</option>
                <option>Usman Raza</option>
                <option>Fatima Khan</option>
                <option>Omar Hassan</option>
              </select>
            </div>

            {selectedProject.openRoles.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text mb-2">Open Roles</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.openRoles.map((role) => (
                    <span key={role} className="text-sm px-3 py-1 bg-warning/10 text-warning rounded-full border border-warning/20">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleInvite}>
                <ChevronRight className="h-4 w-4 mr-1" />
                Send Invitation
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => !creating && setShowProjectModal(false)}
        title="Create New Project"
        size="max-w-2xl"
      >
        <form onSubmit={handleCreateProject} className="space-y-6">
          {/* Project Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Project Information</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Project Name *"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  placeholder="e.g. Mobile App Revamp"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Project Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the project goals and scope"
                  className={inputClass}
                />
              </div>
              <Input
                label="Department / Category"
                value={projectForm.department}
                onChange={(e) => setProjectForm({ ...projectForm, department: e.target.value })}
                placeholder="e.g. Engineering"
              />
              <Input
                label="Client Name (Optional)"
                value={projectForm.client_name}
                onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                placeholder="e.g. Acme Corp"
              />
              <Input
                label="Start Date"
                type="date"
                value={projectForm.start_date}
                onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })}
              />
              <Input
                label="Expected End Date"
                type="date"
                value={projectForm.end_date}
                onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Priority</label>
                <select
                  value={projectForm.priority}
                  onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value })}
                  className={inputClass}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Status</label>
                <select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                  className={inputClass}
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <UserCog className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Assignments</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Project Lead"
                  value={projectForm.project_lead}
                  onChange={(e) => setProjectForm({ ...projectForm, project_lead: e.target.value })}
                  placeholder="e.g. Sarah Ahmed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Assign Recruiters</label>
                <input
                  value={projectForm.assigned_recruiters}
                  onChange={(e) => setProjectForm({ ...projectForm, assigned_recruiters: e.target.value })}
                  placeholder="Comma-separated names"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-muted">Separate multiple names with commas</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Assign Employees</label>
                <input
                  value={projectForm.assigned_employees}
                  onChange={(e) => setProjectForm({ ...projectForm, assigned_employees: e.target.value })}
                  placeholder="Comma-separated names"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-muted">Separate multiple names with commas</p>
              </div>
            </div>
          </div>

          {/* Hiring */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Hiring</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Required Roles"
                value={projectForm.required_roles}
                onChange={(e) => setProjectForm({ ...projectForm, required_roles: e.target.value })}
                placeholder="e.g. Backend Developer, QA Engineer"
              />
              <Input
                label="Number of Open Positions"
                type="number"
                min="0"
                value={projectForm.open_positions}
                onChange={(e) => setProjectForm({ ...projectForm, open_positions: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Documents</h4>
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-text-secondary mb-1.5">Upload Project Files (Optional)</span>
              <input
                type="file"
                multiple
                onChange={(e) => setProjectForm({ ...projectForm, documents: Array.from(e.target.files || []) })}
                className="block w-full text-sm text-muted file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-soft file:text-primary hover:file:bg-primary-light cursor-pointer"
              />
            </label>
            {projectForm.documents?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {projectForm.documents.map((f, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-surface-2 text-text-secondary rounded-full border border-border">
                    {f.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-border">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowProjectModal(false)} disabled={creating}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1" loading={creating}>
              <Plus className="h-4 w-4 mr-1" />
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* Monthly Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => !generatingReport && setShowReportModal(false)}
        title="Generate Monthly Report"
      >
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <p className="text-sm text-muted">
            Generate a complete monthly project report using live project data.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Month</label>
              <select
                value={reportMonth}
                onChange={(e) => setReportMonth(Number(e.target.value))}
                className={inputClass}
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Year</label>
              <select
                value={reportYear}
                onChange={(e) => setReportYear(Number(e.target.value))}
                className={inputClass}
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Report Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'pdf', label: 'PDF', hint: 'Download / save as PDF' },
                { value: 'print', label: 'Print Preview', hint: 'Open a printable view' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setReportType(opt.value)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    reportType === opt.value
                      ? 'border-primary bg-primary-soft ring-2 ring-primary/20'
                      : 'border-border-strong bg-surface hover:border-primary/40'
                  }`}
                >
                  <div className="text-sm font-semibold text-text">{opt.label}</div>
                  <div className="text-xs text-muted mt-0.5">{opt.hint}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowReportModal(false)} disabled={generatingReport}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1" loading={generatingReport}>
              <FileText className="h-4 w-4 mr-1.5" />
              Generate Report
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
