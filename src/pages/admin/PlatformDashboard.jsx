import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, Building2, Users, AlertCircle, Search, CheckCircle, XCircle, Ban } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { adminApi } from '../../services/company';
import toast from 'react-hot-toast';

// Map the backend company shape (snake_case, lowercase status) to the shape
// this page's UI was written against, so the existing JSX renders unchanged.
const normalizeCompany = (c) => ({
  id: c.id,
  name: c.name,
  industry: c.industry,
  country: c.country,
  officialEmail: c.email,
  website: c.website,
  createdAt: c.created_at,
  verificationStatus: (c.status || '').toUpperCase(), // pending -> PENDING, etc.
});

export const PlatformDashboard = () => {
  const location = useLocation();
  // The same component serves two routes. On /admin/companies we show a
  // focused company-management view (table + actions only); on /admin/dashboard
  // we show the full platform overview (stats + companies + contact inbox).
  const companiesView = location.pathname === '/admin/companies';

  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED, SUSPENDED

  const fetchCompanies = async () => {
    try {
      const data = await adminApi.getCompanies();
      if (data.success) {
        setAllCompanies((data.companies || []).map(normalizeCompany));
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const companies = allCompanies.filter(c => {
    if (filter !== 'ALL' && c.verificationStatus !== filter) return false;
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: allCompanies.length,
    pending: allCompanies.filter(c => c.verificationStatus === 'PENDING').length,
    approved: allCompanies.filter(c => c.verificationStatus === 'APPROVED').length,
    suspended: allCompanies.filter(c => c.verificationStatus === 'SUSPENDED').length,
  };

  // Map the page's dispatch action names to backend endpoint actions.
  const ACTION_MAP = {
    APPROVE_COMPANY: 'approve',
    REJECT_COMPANY: 'reject',
    SUSPEND_COMPANY: 'suspend',
  };

  const handleAction = async (id, actionType) => {
    const backendAction = ACTION_MAP[actionType];
    if (!backendAction) return;
    // For a suspended company, the "Restore" button reuses APPROVE_COMPANY,
    // but the backend expects 'unsuspend' to lift a suspension.
    const current = allCompanies.find(c => c.id === id);
    const action =
      backendAction === 'approve' && current?.verificationStatus === 'SUSPENDED'
        ? 'unsuspend'
        : backendAction;
    try {
      const data = await adminApi.companyAction(id, action);
      if (data.success) {
        toast.success('Company status updated successfully.');
        // Reflect the new status locally without a full refetch.
        setAllCompanies(prev =>
          prev.map(c =>
            c.id === id
              ? { ...c, verificationStatus: (data.company?.status || '').toUpperCase() || c.verificationStatus }
              : c
          )
        );
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update company status');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'PENDING': return <span className="px-2 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">Pending Review</span>;
      case 'APPROVED': return <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">Approved</span>;
      case 'REJECTED': return <span className="px-2 py-1 text-xs font-medium bg-danger/10 text-danger rounded-full">Rejected</span>;
      case 'SUSPENDED': return <span className="px-2 py-1 text-xs font-medium bg-danger/10 text-danger rounded-full">Suspended</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-text">
                {companiesView ? 'Companies' : 'Platform Overview'}
              </h1>
              <p className="text-muted">
                {companiesView
                  ? 'Review, approve, and manage WorkProof tenant companies.'
                  : 'Manage WorkProof tenant companies and platform activity.'}
              </p>
            </div>

            {/* Stats — platform overview only */}
            {!companiesView && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Building2, label: 'Total Companies', value: stats.total, tile: 'bg-primary/10 text-primary' },
                { icon: AlertCircle, label: 'Pending Review', value: stats.pending, tile: 'bg-warning/10 text-warning' },
                { icon: CheckCircle, label: 'Approved', value: stats.approved, tile: 'bg-success/10 text-success' },
                { icon: Ban, label: 'Suspended', value: stats.suspended, tile: 'bg-danger/10 text-danger' },
              ].map(({ icon: Icon, label, value, tile }) => (
                <div
                  key={label}
                  className="group bg-surface p-6 rounded-2xl border border-border shadow-sm transition-all duration-300 hover:shadow-card-hover hover:border-border-strong hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${tile}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{label}</p>
                      <p className="text-2xl font-bold text-text tabular-nums">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Company Management */}
            <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-text">Company Applications</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="text"
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-border-strong rounded-lg text-sm bg-surface transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-4 py-2 border border-border-strong rounded-lg text-sm bg-surface transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2/60 border-b border-border">
                    <tr>
                      <th className="th-premium">Company</th>
                      <th className="th-premium">Contact</th>
                      <th className="th-premium">Applied Date</th>
                      <th className="th-premium">Status</th>
                      <th className="th-premium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {companies.map((company) => (
                      <tr key={company.id} className="hover:bg-surface-2/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-text">{company.name}</p>
                            <p className="text-xs text-muted">{company.industry} • {company.country}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-text">{company.officialEmail}</p>
                            <a href={company.website} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">{company.website}</a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted">
                          {new Date(company.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(company.verificationStatus)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {company.verificationStatus === 'PENDING' && (
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" onClick={() => handleAction(company.id, 'APPROVE_COMPANY')}>
                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleAction(company.id, 'REJECT_COMPANY')}>
                                <XCircle className="w-4 h-4 mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                          {company.verificationStatus === 'APPROVED' && (
                            <Button size="sm" variant="outline" className="text-danger border-danger hover:bg-danger/10" onClick={() => handleAction(company.id, 'SUSPEND_COMPANY')}>
                              <Ban className="w-4 h-4 mr-1" /> Suspend
                            </Button>
                          )}
                          {company.verificationStatus === 'SUSPENDED' && (
                            <Button size="sm" onClick={() => handleAction(company.id, 'APPROVE_COMPANY')}>
                              Restore
                            </Button>
                          )}
                          {company.verificationStatus === 'REJECTED' && (
                            <span className="text-xs text-muted">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {companies.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">
                          No companies found matching the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
</div>
  );
};
