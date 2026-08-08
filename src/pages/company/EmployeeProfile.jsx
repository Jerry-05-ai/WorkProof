import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Lock, Shield, Briefcase, TrendingUp, Award, Star,
  CheckCircle2, X, Calendar, ChevronRight, Plus,
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { SkillBadge } from '../../components/employee/SkillBadge';
import { ProjectCard } from '../../components/employee/ProjectCard';
import { TransactionProcessor } from '../../components/transactions/TransactionProcessor';
import { companyApi } from '../../services/company';

const BEHAVIOR_CATEGORIES = [
  'collaboration', 'communication', 'reliability', 'leadership',
  'problem_solving', 'adaptability', 'professional_growth',
];

const TABS = ['Overview', 'Skills', 'Projects', 'Behavior', 'Career Growth'];

export const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [employee, setEmployee] = useState(null);
  const [profile, setProfile] = useState({ skills: [], projects: [], achievements: [], behavior: [], behavior_summary: {} });
  const [loading, setLoading] = useState(true);
  const [showEndEmployment, setShowEndEmployment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [skillForm, setSkillForm] = useState({ name: '', category: '', proficiency_level: 'intermediate', years_experience: '' });
  const [projectForm, setProjectForm] = useState({ name: '', description: '', role: '', technologies: '', status: 'in_progress', start_date: '', end_date: '' });
  const [achievementForm, setAchievementForm] = useState({ title: '', description: '', date: '', category: 'other' });
  const [behaviorForm, setBehaviorForm] = useState({ category: 'collaboration', rating: 3, comments: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await companyApi.getEmployeeDetail(employeeId);
      if (data.success) {
        setEmployee(data.employee);
        setProfile(data.profile || { skills: [], projects: [], achievements: [], behavior: [], behavior_summary: {} });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  const handleEndEmployment = () => {
    setShowEndEmployment(false);
    setProcessing(true);
    setTimeout(async () => {
      try {
        await companyApi.endEmployment(employeeId, { end_date: new Date().toISOString().split('T')[0] });
        setSuccess(true);
        toast.success('Employment ended successfully');
        fetchData();
      } catch (err) {
        toast.error('Failed to end employment');
        setProcessing(false);
      }
    }, 1000);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await companyApi.addSkill(employeeId, skillForm);
      toast.success('Skill added successfully');
      setShowSkillModal(false);
      setSkillForm({ name: '', category: '', proficiency_level: 'intermediate', years_experience: '' });
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to add skill');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await companyApi.addProject(employeeId, projectForm);
      toast.success('Project added successfully');
      setShowProjectModal(false);
      setProjectForm({ name: '', description: '', role: '', technologies: '', status: 'in_progress', start_date: '', end_date: '' });
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to add project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await companyApi.addAchievement(employeeId, achievementForm);
      toast.success('Achievement added successfully');
      setShowAchievementModal(false);
      setAchievementForm({ title: '', description: '', date: '', category: 'other' });
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to add achievement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddBehavior = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await companyApi.addBehaviorRating(employeeId, behaviorForm);
      toast.success('Behavior rating added successfully');
      setShowBehaviorModal(false);
      setBehaviorForm({ category: 'collaboration', rating: 3, comments: '' });
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to add behavior rating');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDismissTransaction = () => {
    setProcessing(false);
    setSuccess(false);
    setConfirmed(false);
    navigate('/company/employees');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </main>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <p className="text-muted">Employee not found.</p>
            </main>
          </div>
        </div>
      </div>
    );
  }

  const isFormer = employee.employment_status !== 'active';
  const employeeName = employee.full_name || `${employee.first_name} ${employee.last_name}`;
  const behaviorScore = profile.behavior_summary?.behavior_score;
  const behaviorByCategory = profile.behavior_summary?.by_category || {};

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            {/* Privacy Banner */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-center gap-3"
            >
              <div className="p-2 bg-warning/20 rounded-lg">
                <Lock className="h-5 w-5 text-warning" />
              </div>
              <p className="text-sm text-muted flex-1">
                🔒 PRIVATE EMPLOYEE PROFILE — Visible only to authorized company members.
              </p>
            </motion.div>

            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-xl border border-border shadow-sm p-6 lg:p-8"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary">{employeeName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-text">{employeeName}</h1>
                    <Badge variant={isFormer ? 'warning' : 'success'} size="sm">
                      {isFormer ? 'Former Employee' : 'Active Employee'}
                    </Badge>
                  </div>
                  <p className="text-muted">
                    {employee.job_title} | {employee.department}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm text-muted">{employee.email}</span>
                    {employee.location && (
                      <>
                        <span className="text-muted">|</span>
                        <span className="text-sm text-muted">{employee.location}</span>
                      </>
                    )}
                  </div>
                </div>
                {!isFormer && (
                  <div className="flex gap-2">
                    <Button variant="danger" size="sm" onClick={() => setShowEndEmployment(true)}>
                      End Employment
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Award, tile: 'bg-primary-soft text-primary', value: profile.skills.length, label: 'Skills' },
                { icon: Briefcase, tile: 'bg-emerald-50 text-success', value: profile.projects.length, label: 'Projects' },
                { icon: TrendingUp, tile: 'bg-violet-50 text-accent', value: behaviorScore !== null ? behaviorScore.toFixed(1) : 'N/A', label: 'Behavior Score' },
                { icon: Star, tile: 'bg-amber-50 text-warning', value: profile.achievements.length, label: 'Achievements' },
              ].map(({ icon: Icon, tile, value, label }) => (
                <div
                  key={label}
                  className="group bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${tile}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <p className="text-2xl font-bold text-text tabular-nums">{value}</p>
                  <p className="text-xs text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-surface rounded-xl border border-border shadow-sm">
              <div className="border-b border-border px-6">
                <nav className="flex gap-6 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted hover:text-text'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'Overview' && (
                  <div className="space-y-6">
                    {/* Achievements */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-text">Achievements</h3>
                        <Button size="sm" variant="ghost" onClick={() => setShowAchievementModal(true)}>
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {profile.achievements.length === 0 && <p className="text-sm text-muted">No achievements recorded yet.</p>}
                        {profile.achievements.map((ach, i) => (
                          <div key={ach.id || i} className="flex items-center gap-2 text-sm text-muted bg-surface-2 rounded-lg p-3">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                            <div>
                              <span className="font-medium text-text">{ach.title}</span>
                              {ach.description && <p className="text-xs text-muted">{ach.description}</p>}
                            </div>
                            {ach.date && <span className="text-xs text-muted ml-auto">{ach.date}</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Behavior Summary */}
                    {Object.keys(behaviorByCategory).length > 0 && (
                      <div>
                        <h3 className="font-semibold text-text mb-3">Behavior Ratings</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(behaviorByCategory).map(([cat, rating]) => (
                            <div key={cat} className="bg-surface-2 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-text">{rating}/5</p>
                              <p className="text-xs text-muted capitalize">{cat.replace(/_/g, ' ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Skills' && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setShowSkillModal(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Add Skill
                      </Button>
                    </div>
                    {profile.skills.length === 0 && <p className="text-sm text-muted">No skills recorded yet.</p>}
                    {profile.skills.map((skill) => (
                      <SkillBadge key={skill.id} {...skill} />
                    ))}
                  </div>
                )}

                {activeTab === 'Projects' && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setShowProjectModal(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Add Project
                      </Button>
                    </div>
                    {profile.projects.length === 0 && <p className="text-sm text-muted">No projects recorded yet.</p>}
                    {profile.projects.map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                  </div>
                )}

                {activeTab === 'Behavior' && (
                  <div className="space-y-6">
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setShowBehaviorModal(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Add Rating
                      </Button>
                    </div>
                    {profile.behavior.length === 0 && <p className="text-sm text-muted">No behavior ratings recorded yet.</p>}
                    {profile.behavior.map((b) => (
                      <div key={b.id} className="p-4 bg-surface-2 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-text capitalize">{b.category.replace(/_/g, ' ')}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning fill-warning" />
                            <span className="font-semibold text-text">{b.rating}/5</span>
                          </div>
                        </div>
                        {b.comments && <p className="text-sm text-muted">"{b.comments}"</p>}
                        <p className="text-xs text-muted mt-2">{b.review_date}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Career Growth' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-text mb-4">Career Timeline</h3>
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        </div>
                        <div className="pb-6">
                          <p className="text-sm font-medium text-text">Started as {employee.job_title}</p>
                          <p className="text-xs text-muted">{employee.start_date}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
                      <h3 className="font-semibold text-text mb-4">Growth Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted">Skills Growth</span>
                          <span className="text-sm font-bold text-text">{profile.skills.length} skills</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted">Projects Completed</span>
                          <span className="text-sm font-bold text-text">{profile.projects.filter(p => p.status === 'completed').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted">Behavior Score</span>
                          <span className="text-sm font-bold text-text">{behaviorScore !== null ? behaviorScore.toFixed(2) : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Navigation />

      {/* End Employment Modal */}
      <Modal isOpen={showEndEmployment && !processing && !success} onClose={() => setShowEndEmployment(false)} title="End Employment">
        <div className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-sm">
            <p className="font-medium text-warning">Are you sure you want to end this employment record?</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Employee</span>
              <span className="font-medium text-text">{employeeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Current Role</span>
              <span className="font-medium text-text">{employee.job_title}</span>
            </div>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5" />
            <span className="text-muted">I understand that the employee will control their verified profile after employment ends.</span>
          </label>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setShowEndEmployment(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1" disabled={!confirmed} onClick={handleEndEmployment}>Confirm Employment End</Button>
          </div>
        </div>
      </Modal>

      <TransactionProcessor type="endEmployment" isOpen={processing || success} onComplete={() => {}} isSuccess={success} onDismiss={handleDismissTransaction} />

      {/* Add Skill Modal */}
      <Modal isOpen={showSkillModal} onClose={() => setShowSkillModal(false)} title="Add Skill">
        <form onSubmit={handleAddSkill} className="space-y-4">
          <Input label="Skill Name" required value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} />
          <Input label="Category" value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Proficiency Level</label>
            <select value={skillForm.proficiency_level} onChange={(e) => setSkillForm({ ...skillForm, proficiency_level: e.target.value })} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <Input label="Years Experience" type="number" step="0.1" value={skillForm.years_experience} onChange={(e) => setSkillForm({ ...skillForm, years_experience: e.target.value })} />
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowSkillModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Add Skill</Button>
          </div>
        </form>
      </Modal>

      {/* Add Project Modal */}
      <Modal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} title="Add Project">
        <form onSubmit={handleAddProject} className="space-y-4">
          <Input label="Project Name" required value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Description</label>
            <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text resize-none" />
          </div>
          <Input label="Role" value={projectForm.role} onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })} />
          <Input label="Technologies (comma-separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={projectForm.start_date} onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })} />
            <Input label="End Date" type="date" value={projectForm.end_date} onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowProjectModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Add Project</Button>
          </div>
        </form>
      </Modal>

      {/* Add Achievement Modal */}
      <Modal isOpen={showAchievementModal} onClose={() => setShowAchievementModal(false)} title="Add Achievement">
        <form onSubmit={handleAddAchievement} className="space-y-4">
          <Input label="Title" required value={achievementForm.title} onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })} />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Description</label>
            <textarea value={achievementForm.description} onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })} rows={2} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text resize-none" />
          </div>
          <Input label="Date" type="date" value={achievementForm.date} onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })} />
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowAchievementModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Add Achievement</Button>
          </div>
        </form>
      </Modal>

      {/* Add Behavior Rating Modal */}
      <Modal isOpen={showBehaviorModal} onClose={() => setShowBehaviorModal(false)} title="Add Behavior Rating">
        <form onSubmit={handleAddBehavior} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Category</label>
            <select value={behaviorForm.category} onChange={(e) => setBehaviorForm({ ...behaviorForm, category: e.target.value })} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text">
              {BEHAVIOR_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Rating (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(r => (
                <button key={r} type="button" onClick={() => setBehaviorForm({ ...behaviorForm, rating: r })} className={`w-10 h-10 rounded-lg font-bold text-sm ${behaviorForm.rating === r ? 'bg-primary text-white' : 'bg-surface-2 text-muted hover:bg-border'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-text">Comments</label>
            <textarea value={behaviorForm.comments} onChange={(e) => setBehaviorForm({ ...behaviorForm, comments: e.target.value })} rows={2} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text resize-none" />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowBehaviorModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Add Rating</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};