import { useCallback, useEffect } from 'react';
import { useApp } from '../store/context';
import { authService, companyService, mapRole, logout as authLogout } from '../services/auth';

export const useAuth = () => {
  const { state, dispatch } = useApp();

  // Check session on mount. This ALWAYS asks the backend to verify the
  // session cookie — even if a (possibly stale) isAuthenticated flag was
  // persisted from a previous visit. Trusting the cached flag without
  // verifying let an expired/missing cookie cause an infinite
  // 401 -> hard-redirect -> reload -> "still authenticated" -> 401 loop.
  useEffect(() => {
    const checkSession = async () => {
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
        } else if (state.isAuthenticated) {
          // Backend says no valid session, but our cached state disagrees — clear it.
          dispatch({ type: 'LOGOUT' });
        }
      } catch {
        // No active session (or request failed). If we were showing as
        // authenticated from stale persisted state, clear it so
        // ProtectedRoute stops letting the user onto pages that will
        // just 401 and reload again.
        if (state.isAuthenticated) {
          dispatch({ type: 'LOGOUT' });
        }
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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