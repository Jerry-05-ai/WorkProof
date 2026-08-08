// frontend/src/lib/api.js
// Axios instance configured for PHP session cookies (HTTP-only).
import axios from "axios";

const api = axios.create({
  // Vite env var; falls back to local PHP dev server.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: true, // send/receive the session cookie
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Response interceptor: normalize errors and surface auth failures.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      // Broadcast a 401 so the AuthContext can clear state / redirect.
      if (status === 401) {
        window.dispatchEvent(new CustomEvent("workproof:unauthorized"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
