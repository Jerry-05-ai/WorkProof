import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

export const companyService = {
  register: async (data) => {
    const response = await api.post('/api/companies/register', data);
    return response.data;
  },

  getStatus: async () => {
    const response = await api.get('/api/companies/status');
    return response.data;
  },
};

export const invitationService = {
  create: async (data) => {
    const response = await api.post('/api/company/invitations', data);
    return response.data;
  },

  verify: async (token) => {
    const response = await api.get(`/api/company/invitations/verify?token=${token}`);
    return response.data;
  },

  accept: async (data) => {
    const response = await api.post('/api/company/invitations/accept', data);
    return response.data;
  },
};

// Map backend roles to frontend roles
export const mapRole = (backendRole) => {
  const roleMap = {
    'platform_admin': 'PLATFORM_ADMIN',
    'company_admin': 'COMPANY_ADMIN',
    'employee': 'EMPLOYEE',
    'recruiter': 'RECRUITER',
  };
  return roleMap[backendRole] || backendRole;
};

// Map frontend roles to backend roles
export const unmapRole = (frontendRole) => {
  const roleMap = {
    'PLATFORM_ADMIN': 'platform_admin',
    'COMPANY_ADMIN': 'company_admin',
    'EMPLOYEE': 'employee',
    'RECRUITER': 'recruiter',
  };
  return roleMap[frontendRole] || frontendRole;
};

export const getRoleBasedRoutes = (role) => {
  const routes = {
    PLATFORM_ADMIN: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/admin/companies', label: 'Companies', icon: 'Building2' },
      { path: '/admin/activity', label: 'Platform Activity', icon: 'Activity' },
    ],
    COMPANY_ADMIN: [
      { path: '/company/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/company/employees', label: 'Employees', icon: 'Users' },
      { path: '/company/workforce-intelligence', label: 'Intelligence', icon: 'Brain' },
      { path: '/company/activity', label: 'Activity', icon: 'Activity' },
    ],
    EMPLOYEE: [
      { path: '/employee/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/employee/profile', label: 'My Profile', icon: 'User' },
      { path: '/employee/privacy', label: 'Privacy', icon: 'Lock' },
      { path: '/employee/activity', label: 'Activity', icon: 'Activity' },
    ],
    RECRUITER: [
      { path: '/recruiter/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/recruiter/talent', label: 'Talent Discovery', icon: 'Search' },
      { path: '/recruiter/saved', label: 'Saved Candidates', icon: 'Bookmark' },
      { path: '/recruiter/opportunities', label: 'Opportunities', icon: 'Briefcase' },
    ],
  };
  return routes[role] || [];
};

export const logout = async () => {
  try {
    await authService.logout();
  } catch {
    // Ignore errors during logout
  }
};