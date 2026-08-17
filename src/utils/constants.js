export const ROLES = {
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  RECRUITER: 'RECRUITER',
};

export const ROUTES = {
  LANDING: '/',
  DEMO_LOGIN: '/demo-login',
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_EMPLOYEES: '/company/employees',
  COMPANY_EMPLOYEE_PROFILE: '/company/employee/ayan',
  COMPANY_WORKFORCE: '/company/workforce-intelligence',
  COMPANY_VERIFICATION: '/company/verification',
  COMPANY_PROJECTS: '/company/projects',
  COMPANY_ACTIVITY: '/company/activity',
  EMPLOYEE_DASHBOARD: '/employee/dashboard',
  EMPLOYEE_PRIVACY: '/employee/privacy',
  EMPLOYEE_ACTIVITY: '/employee/activity',
  EMPLOYEE_OPPORTUNITIES: '/employee/opportunities',
  RECRUITER_DASHBOARD: '/recruiter/dashboard',
};

export const NAV_ITEMS = {
  PLATFORM_ADMIN: [
    { path: '/admin/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/admin/companies', icon: 'Building2', label: 'Companies' },
    { path: '/admin/messages', icon: 'Mail', label: 'Messages' },
    { path: '/admin/activity', icon: 'Activity', label: 'Activity' },
  ],
  COMPANY_ADMIN: [
    { path: '/company/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/company/employees', icon: 'Users', label: 'Employees' },
    { path: '/company/workforce-intelligence', icon: 'Brain', label: 'Intelligence' },
    { path: '/company/verification', icon: 'ShieldCheck', label: 'Verification' },
    { path: '/company/projects', icon: 'Briefcase', label: 'Projects' },
    { path: '/company/activity', icon: 'Activity', label: 'Activity' },
  ],
  EMPLOYEE: [
    { path: '/employee/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/employee/privacy', icon: 'Lock', label: 'Privacy' },
    { path: '/employee/opportunities', icon: 'Briefcase', label: 'Opportunities' },
    { path: '/employee/activity', icon: 'Activity', label: 'Activity' },
  ],
  RECRUITER: [
    { path: '/recruiter/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/recruiter/talent', icon: 'Search', label: 'Talent' },
    { path: '/recruiter/saved', icon: 'Bookmark', label: 'Saved' },
    { path: '/recruiter/opportunities', icon: 'Briefcase', label: 'Opportunities' },
  ],
};