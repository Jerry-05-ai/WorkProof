// frontend/src/context/RouteGuards.jsx
// Route guards for react-router-dom v6.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, roleHome } from "./AuthContext";

// Requires an authenticated user. Optionally restricts to specific roles.
export function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <span>Loading…</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Signed in but wrong role → send to their own dashboard.
    return <Navigate to={roleHome(user.role)} replace />;
  }

  return children;
}

// For /login: if already signed in, bounce to the role dashboard.
export function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={roleHome(user.role)} replace />;
  return children;
}
