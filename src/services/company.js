import api from './api';

export const companyApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/api/company/dashboard');
    return response.data;
  },

  // Employees
  getEmployees: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    if (filters.employment_status) params.append('employment_status', filters.employment_status);
    if (filters.is_verified !== undefined && filters.is_verified !== '') params.append('is_verified', filters.is_verified);
    const query = params.toString();
    const url = `/api/company/employees${query ? '?' + query : ''}`;
    const response = await api.get(url);
    return response.data;
  },

  createEmployee: async (data) => {
    const response = await api.post('/api/company/employees', data);
    return response.data;
  },

  getEmployeeDetail: async (employeeId) => {
    const response = await api.get(`/api/company/employees/${employeeId}`);
    return response.data;
  },
  
  updateEmployee: async (employeeId, data) => {
    const response = await api.put(`/api/company/employees/${employeeId}`, data);
    return response.data;
  },

  endEmployment: async (employeeId, data = {}) => {
    const response = await api.post(`/api/company/employees/${employeeId}/end-employment`, data);
    return response.data;
  },

  deleteEmployee: async (employeeId) => {
    const response = await api.delete(`/api/company/employees/${employeeId}`);
    return response.data;
  },

  // Skills
  addSkill: async (employeeId, data) => {
    const response = await api.post(`/api/company/employees/${employeeId}/skills`, data);
    return response.data;
  },

  updateSkill: async (employeeId, skillId, data) => {
    const response = await api.put(`/api/company/employees/${employeeId}/skills/${skillId}`, data);
    return response.data;
  },

  // Projects
  addProject: async (employeeId, data) => {
    const response = await api.post(`/api/company/employees/${employeeId}/projects`, data);
    return response.data;
  },

  updateProject: async (employeeId, projectId, data) => {
    const response = await api.put(`/api/company/employees/${employeeId}/projects/${projectId}`, data);
    return response.data;
  },

  // Achievements
  addAchievement: async (employeeId, data) => {
    const response = await api.post(`/api/company/employees/${employeeId}/achievements`, data);
    return response.data;
  },

  // Behavior Ratings
  addBehaviorRating: async (employeeId, data) => {
    const response = await api.post(`/api/company/employees/${employeeId}/behavior`, data);
    return response.data;
  },

  // Performance Reviews
  addPerformanceReview: async (employeeId, data) => {
    const response = await api.post(`/api/company/employees/${employeeId}/performance-review`, data);
    return response.data;
  },

  // Monthly Reports
  generateMonthlyReport: async (employeeId, data = {}) => {
    const response = await api.post(`/api/company/employees/${employeeId}/monthly-report`, data);
    return response.data;
  },

  getEmployeeReports: async (employeeId) => {
    const response = await api.get(`/api/company/employees/${employeeId}/reports`);
    return response.data;
  },

  // Internal Projects (Company Dashboard → Projects)
  getProjects: async () => {
    const response = await api.get('/api/company/projects');
    return response.data;
  },

  createProject: async (data) => {
    const response = await api.post('/api/company/projects', data);
    return response.data;
  },

  updateProject_: async (projectId, data) => {
    const response = await api.put(`/api/company/projects/${projectId}`, data);
    return response.data;
  },

  deleteProject: async (projectId) => {
    const response = await api.delete(`/api/company/projects/${projectId}`);
    return response.data;
  },

  getProjectReport: async ({ month, year } = {}) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    const query = params.toString();
    const response = await api.get(`/api/company/projects/report${query ? '?' + query : ''}`);
    return response.data;
  },
};

export const employeeApi = {
  getDashboard: async () => {
    const response = await api.get('/api/employee/dashboard');
    return response.data;
  },
  getReports: async () => {
    const response = await api.get('/api/employee/reports');
    return response.data;
  },

  // Privacy settings (visibility + granular field flags)
  getPrivacy: async () => {
    const response = await api.get('/api/employee/privacy');
    return response.data;
  },
  updatePrivacy: async (data) => {
    const response = await api.put('/api/employee/privacy', data);
    return response.data;
  },

  // Public profile publish / unpublish
  publishProfile: async () => {
    const response = await api.post('/api/employee/profile/publish');
    return response.data;
  },
  unpublishProfile: async () => {
    const response = await api.post('/api/employee/profile/unpublish');
    return response.data;
  },
};

// Platform-admin endpoints (companies management + platform audit log)
export const adminApi = {
  getDashboard: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  getCompanies: async (status = '') => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    const response = await api.get(`/api/admin/companies${query}`);
    return response.data;
  },

  // action: 'approve' | 'reject' | 'suspend' | 'unsuspend'
  companyAction: async (companyId, action, reason) => {
    const response = await api.post(
      `/api/admin/companies/${companyId}/${action}`,
      reason ? { reason } : {}
    );
    return response.data;
  },

  getAuditLogs: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.action) params.append('action', filters.action);
    if (filters.role) params.append('role', filters.role);
    if (filters.entity_type) params.append('entity_type', filters.entity_type);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    const query = params.toString();
    const response = await api.get(`/api/admin/audit-logs${query ? '?' + query : ''}`);
    return response.data;
  },
};
