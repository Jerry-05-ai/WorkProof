import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store/context';
import { ToastProvider } from './components/ui/Toast';
import { GuidedDemo } from './components/demo/GuidedDemo';
import { DemoControlCenter } from './components/demo/DemoControlCenter';
import { ErrorBoundary } from './components/ui/ErrorState';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Navigation } from './components/layout/Navigation';

// Pages - Auth & Landing
import { LandingPage } from './pages/landing/LandingPage';
import { PricingPage } from './pages/landing/PricingPage';
import { ContactPage } from './pages/landing/ContactPage';
import { DemoLoginPage } from './pages/auth/DemoLoginPage';
import { LoginPage } from './pages/auth/LoginPage';
import { CompanyRegistration } from './pages/auth/CompanyRegistration';
import { AcceptInvitation } from './pages/auth/AcceptInvitation';

// Pages - Platform Admin
import { PlatformDashboard } from './pages/admin/PlatformDashboard';
import { AdminMessages } from './pages/admin/AdminMessages';

// Pages - Company
import { CompanyStatus } from './pages/company/CompanyStatus';
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyEmployees } from './pages/company/CompanyEmployees';
import { EmployeeProfile } from './pages/company/EmployeeProfile';
import { WorkforceIntelligence } from './pages/company/WorkforceIntelligence';
import { VerificationRequests } from './pages/company/verification/VerificationRequests';
import { InternalProjects } from './pages/company/projects/InternalProjects';
import { ActivityPage } from './pages/shared/ActivityPage';

// Pages - Employee
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { PrivacyControls } from './pages/employee/PrivacyControls';
import { OpportunitiesPage } from './pages/employee/OpportunitiesPage';

// Pages - Recruiter
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { TalentDiscovery } from './pages/recruiter/TalentDiscovery';
import { CandidateProfile } from './pages/recruiter/CandidateProfile';
import { SavedCandidates } from './pages/recruiter/SavedCandidates';
import { RecruiterOpportunities } from './pages/recruiter/RecruiterOpportunities';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state } = useApp();
  const location = useLocation();
  const { isAuthenticated, currentUser, companies } = state;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/" replace />;
  }

  if (currentUser?.role === 'COMPANY_ADMIN') {
    const company = companies.find(c => c.id === currentUser.companyId);
    const companyStatus = company?.verificationStatus || company?.status;
    if (company && companyStatus && companyStatus !== 'APPROVED' && companyStatus !== 'approved') {
      if (location.pathname !== '/company/status') {
        return <Navigate to="/company/status" replace />;
      }
    } else {
      if (location.pathname === '/company/status') {
        return <Navigate to="/company/dashboard" replace />;
      }
    }
  }

  return children;
};

// Layout wrapper for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

// Overlay components mounted globally
const GlobalOverlays = () => {
  const { state } = useApp();
  const isLoggedIn = state.isAuthenticated;
  if (!isLoggedIn) return null;
  return (
    <>
      <GuidedDemo />
      <DemoControlCenter />
    </>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo-login" element={<DemoLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CompanyRegistration />} />
        <Route path="/accept-invitation" element={<AcceptInvitation />} />

        {/* Platform Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <AuthenticatedLayout>
                <PlatformDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <AuthenticatedLayout>
                <PlatformDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <AuthenticatedLayout>
                <AdminMessages />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activity"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <AuthenticatedLayout>
                <ActivityPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Status Route */}
        <Route
          path="/company/status"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <CompanyStatus />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Routes */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <CompanyDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/employees"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <CompanyEmployees />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/employee/:employeeId"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <EmployeeProfile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/workforce-intelligence"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <WorkforceIntelligence />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/verification"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <VerificationRequests />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/projects"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <InternalProjects />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/activity"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <AuthenticatedLayout>
                <ActivityPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <AuthenticatedLayout>
                <EmployeeDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/privacy"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <AuthenticatedLayout>
                <PrivacyControls />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/opportunities"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <AuthenticatedLayout>
                <OpportunitiesPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/activity"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <AuthenticatedLayout>
                <ActivityPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <AuthenticatedLayout>
                <RecruiterDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/talent"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <AuthenticatedLayout>
                <TalentDiscovery />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/candidate/:candidateId"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <AuthenticatedLayout>
                <CandidateProfile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/saved"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <AuthenticatedLayout>
                <SavedCandidates />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/opportunities"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <AuthenticatedLayout>
                <RecruiterOpportunities />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <GlobalOverlays />
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
          <ToastProvider />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;