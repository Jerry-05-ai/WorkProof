import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store/context';
import { ToastProvider } from './components/ui/Toast';
import { GuidedDemo } from './components/demo/GuidedDemo';
import { DemoControlCenter } from './components/demo/DemoControlCenter';
import { ErrorBoundary } from './components/ui/ErrorState';

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
    // Support both mock data (verificationStatus) and real API (status) field names
    const companyStatus = company?.verificationStatus || company?.status;
    if (company && companyStatus && companyStatus !== 'APPROVED' && companyStatus !== 'approved') {
      if (location.pathname !== '/company/status') {
        return <Navigate to="/company/status" replace />;
      }
    } else {
      // If approved and trying to access status page, redirect to dashboard
      if (location.pathname === '/company/status') {
        return <Navigate to="/company/dashboard" replace />;
      }
    }
  }

  return children;
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
              <PlatformDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <PlatformDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <AdminMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activity"
          element={
            <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        {/* Company Status Route (For Pending/Rejected/Suspended) */}
        <Route
          path="/company/status"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <CompanyStatus />
            </ProtectedRoute>
          }
        />

        {/* Company Routes */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/employees"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <CompanyEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/employee/:employeeId"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/workforce-intelligence"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <WorkforceIntelligence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/verification"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <VerificationRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/projects"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <InternalProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/activity"
          element={
            <ProtectedRoute allowedRoles={['COMPANY_ADMIN']}>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/privacy"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <PrivacyControls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/opportunities"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <OpportunitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/activity"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes - Phase 3 */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/talent"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <TalentDiscovery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/candidate/:candidateId"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <CandidateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/saved"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <SavedCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/opportunities"
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <RecruiterOpportunities />
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
        <BrowserRouter>
          <AppRoutes />
          <ToastProvider />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;