import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { canAccess } from '../config/menu.js';

// Sin sesión → login (RNF06). Con sesión pero sin permiso → panel con aviso (flujo 1, Act. 07).
export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !canAccess(user.rol, roles)) {
    return <Navigate to="/" replace state={{ denied: location.pathname }} />;
  }
  return <Outlet />;
}
