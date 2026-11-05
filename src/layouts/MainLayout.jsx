import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { MODULES, ROLE_LABELS, canAccess } from '../config/menu.js';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const visibles = MODULES.filter((m) => canAccess(user.rol, m.roles)); // menú según el rol (RF02)
  const iniciales = user.nombre.split(' ').slice(0, 2).map((p) => p[0]).join('');

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Menú principal">
        <NavLink to="/" className="brand-logo small-logo"><span className="brand-mark">AC</span>ATLANTIC CITY</NavLink>
        <span className="menu-title">MENÚ PRINCIPAL</span>
        <nav className="d-flex flex-column gap-1">
          {visibles.map((m) => (
            <NavLink key={m.path} to={m.path} end={m.path === '/'} className="menu-link">
              {m.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex-grow-1" />
        <div className="user-box">
          <span className="avatar">{iniciales}</span>
          <span>
            <strong>{user.nombre}</strong>
            <small>Rol: {ROLE_LABELS[user.rol]}</small>
          </span>
        </div>
        <button type="button" className="menu-link logout" onClick={onLogout}>Cerrar sesión</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
