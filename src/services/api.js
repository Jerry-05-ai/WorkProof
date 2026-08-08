import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
        const { status, data, config } = error.response;
      if (status === 401) {
          const publicPaths = ['/login', '/register', '/accept-invitation', '/demo-login', '/'];
          const currentPath = window.location.pathname;
          const isPublicPath = publicPaths.some(
            (path) => currentPath === path || currentPath.startsWith(`${path}/`)
          );

          // Avoid redirect loops on public auth pages and allow public routes to stay accessible.
          if (
            !isPublicPath &&
            !config?.url?.includes('/api/auth/login') &&
            !config?.url?.includes('/api/auth/me')
          ) {
            window.location.href = '/login';
          }
        }
        return Promise.reject(new Error(data?.error || 'An error occurred'));
      }
    if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    return Promise.reject(error);
  }
);

export default api;