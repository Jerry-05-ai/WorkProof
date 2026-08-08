import { useCallback, useEffect } from 'react';
import { useApp } from '../store/context';
import { authService, companyService, mapRole, logout as authLogout } from '../services/auth';

export const useAuth = () => {
  const { state, dispatch } = useApp();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (state.isAuthenticated) return;
      
      try {
        const data = await authService.getMe();
        if (data.success && data.user) {
          const user = {
            ...data.user,
            role: mapRole(data.user.role),
            name: data.user.full_name,
          };
          dispatch({ type: 'LOGIN', payload: { ...user, company: data.company?.name || '' } });
          
          // Store company data for ProtectedRoute checks
          if (data.company) {
            dispatch({ type: 'SET_COMPANY', payload: data.company });
          }
        }
      } catch {
        // No active session
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const data = await authService.login(email, password);
      if (data.success && data.user) {
        const user = {
          ...data.user,
          role: mapRole(data.user.role),
          name: data.user.full_name,
        };
        dispatch({ type: 'LOGIN', payload: user });
        
        // Fetch company data if user belongs to one
        if (user.company_id) {
          try {
            const companyData = await companyService.getStatus();
            if (companyData.success && companyData.company) {
              dispatch({ type: 'SET_COMPANY', payload: companyData.company });
            }
          } catch {
            // Company fetch is best-effort
          }
        }
        
        return user;
      }
      throw new Error(data.error || 'Login failed');
    } catch (err) {
      const errorMessage = err.message || 'Invalid email or password';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await authLogout();
    } catch {
      // Ignore
    }
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, [dispatch]);

  return {
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };
};
