import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, UserPlus, Trash2 } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { companyApi } from '../../services/company';
import { invitationService } from '../../services/auth';
import toast from 'react-hot-toast';

export const CompanyEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [addForm, setAddForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    job_title: '',
    department: '',
    password: '',
  });
  const [inviteForm, setInviteForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    job_title: '',
    department: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await companyApi.getEmployees({ search: searchTerm });
      if (data.success) {
        setEmployees(data.employees || []);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await companyApi.createEmployee(addForm);
      if (data.success) {
        toast.success('Employee added successfully');
        setShowAddModal(false);
        setAddForm({ first_name: '', last_name: '', email: '', job_title: '', department: '', password: '' });
        fetchEmployees();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await invitationService.create(inviteForm);
      if (data.success) {
        toast.success('Invitation sent successfully');
        setShowInviteModal(false);
        setInviteForm({ email: '', first_name: '', last_name: '', job_title: '', department: '' });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to send invitation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    setDeleting(true);
    try {
      const data = await companyApi.deleteEmployee(employeeToDelete.id);
      if (data.success) {
        toast.success('Employee deleted successfully');
        setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete.id));
        setEmployeeToDelete(null);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete employee');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />

          <main className="flex-1 p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text">Employees</h2>
                <p className="text-muted">{employees.length} team members</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-surface rounded-lg px-4 py-2 border border-border">
                  <Search className="h-4 w-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-text placeholder-muted w-48"
                  />
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
                <Button variant="outline" onClick={() => setShowInviteModal(true)}>
                  Invite
                </Button>
              </div>
            </div>

            {/* Employee Table */}
            {loading ? (
              <div className="bg-surface rounded-xl border border-border shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : employees.length === 0 ? (
              <div className="bg-surface rounded-xl border border-border shadow-sm p-12 text-center border border-border">
                <h3 className="text-lg font-medium text-text mb-2">No employees yet</h3>
                <p className="text-muted mb-4">Get started by adding your first employee to the platform.</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-2/60 border-b border-border">
                      <tr>
                        <th className="th-premium">Name</th>
                        <th className="th-premium">Role</th>
                        <th className="th-premium">Department</th>
                        <th className="th-premium">Email</th>
                        <th className="th-premium">Status</th>
                        <th className="th-premium text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee, index) => (
                        <motion.tr
                          key={employee.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border hover:bg-surface-2 transition-colors cursor-pointer"
                          onClick={() => navigate(`/company/employee/${employee.id}`)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-brand-gradient rounded-full flex items-center justify-center ring-2 ring-primary-soft">
                                <span className="text-sm font-semibold text-white">
                                  {(employee.first_name || employee.full_name || '?').charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-text">
                                {employee.full_name || `${employee.first_name} ${employee.last_name}`}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted">{employee.job_title}</td>
                          <td className="px-6 py-4 text-sm text-muted">{employee.department}</td>
                          <td className="px-6 py-4 text-sm text-muted">{employee.email}</td>
                          <td className="px-6 py-4">
                            <Badge variant={employee.employment_status === 'active' ? 'success' : 'warning'} size="sm">
                              {employee.employment_status || 'active'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEmployeeToDelete(employee);
                              }}
                              aria-label="Delete employee"
                              title="Delete employee"
                              className="inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
      <Navigation />

      {/* Add Employee Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Employee">
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="first_name" required value={addForm.first_name} onChange={(e) => setAddForm({ ...addForm, first_name: e.target.value })} />
            <Input label="Last Name" name="last_name" required value={addForm.last_name} onChange={(e) => setAddForm({ ...addForm, last_name: e.target.value })} />
          </div>
          <Input label="Email" name="email" type="email" required value={addForm.email} onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} />
          <Input label="Job Title" name="job_title" required value={addForm.job_title} onChange={(e) => setAddForm({ ...addForm, job_title: e.target.value })} />
          <Input label="Department" name="department" required value={addForm.department} onChange={(e) => setAddForm({ ...addForm, department: e.target.value })} />
          <Input label="Login Password" name="password" type="password" required value={addForm.password} onChange={(e) => setAddForm({ ...addForm, password: e.target.value })} placeholder="Create a password for this employee" />
          <p className="text-xs text-muted -mt-2">
            The employee will use this email and password to log in to their own private dashboard. Minimum 8 characters, with an uppercase letter, a lowercase letter, and a number.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Add Employee</Button>
          </div>
        </form>
      </Modal>

      {/* Invite Employee Modal */}
      <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite Employee">
        <form onSubmit={handleInvite} className="space-y-4">
          <Input label="Email" name="email" type="email" required value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="first_name" value={inviteForm.first_name} onChange={(e) => setInviteForm({ ...inviteForm, first_name: e.target.value })} />
            <Input label="Last Name" name="last_name" value={inviteForm.last_name} onChange={(e) => setInviteForm({ ...inviteForm, last_name: e.target.value })} />
          </div>
          <Input label="Job Title" name="job_title" value={inviteForm.job_title} onChange={(e) => setInviteForm({ ...inviteForm, job_title: e.target.value })} />
          <Input label="Department" name="department" value={inviteForm.department} onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })} />
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" onClick={() => setShowInviteModal(false)}>Cancel</Button>
            <Button className="flex-1" type="submit" loading={submitting}>Send Invitation</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Employee Confirmation Modal */}
      <Modal isOpen={!!employeeToDelete} onClose={() => !deleting && setEmployeeToDelete(null)} title="Delete Employee">
        <div className="space-y-5">
          <p className="text-sm text-text-secondary">
            Are you sure you want to permanently delete this employee? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" type="button" disabled={deleting} onClick={() => setEmployeeToDelete(null)}>Cancel</Button>
            <Button variant="danger" className="flex-1" type="button" loading={deleting} onClick={handleDeleteEmployee}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};