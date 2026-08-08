// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

// Maps a role to its default dashboard route.
export const roleHome = (role) => {
  switch (role) {
    case "platform_admin":
      return "/admin";
    case "company_admin":
      return "/company";
    case "employee":
      return "/employee";
    case "recruiter":
      return "/recruiter";
    default:
      return "/";
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user || null);
      setCompany(data.company || null);
    } catch {
      setUser(null);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Clear state if any request returns 401.
  useEffect(() => {
    const handler = () => {
      setUser(null);
      setCompany(null);
    };
    window.addEventListener("workproof:unauthorized", handler);
    return () => window.removeEventListener("workproof:unauthorized", handler);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    setUser(data.user);
    // Pull company info (and confirm session) right after login.
    await refresh();
    return data.user;
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setUser(null);
      setCompany(null);
    }
  }, []);

  const value = { user, company, loading, login, logout, refresh, setCompany };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
