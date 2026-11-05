import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { MODULES, ROLE_LABELS, canAccess } from '../config/menu.js';

export default function DashboardPage() {
  const { user } = useAuth();
  const location = useLocation();
  const denied = location.state?.denied;
  const modulos = MODULES.filter((m) => m.path !== '/' && canAccess(user.rol, m.roles));

  return (
    <>
      <header className="page-header">
        <span className="breadcrumb-text">Inicio / Panel principal</span>
        <h1>Panel principal</h1>
      </header>

      {denied && (
        <div className="alert alert-warning" role="alert">
          Acceso no permitido: tu rol no tiene acceso a <strong>{denied}</strong>. Se te redirigió al panel principal.
        </div>
      )}

      <p className="lead">
        Hola, {user.nombre.split(' ')[0]}. Ingresaste con el rol <strong>{ROLE_LABELS[user.rol]}</strong>.
      </p>

      <h2 className="h5 mt-4 mb-3">Tus módulos</h2>
      {modulos.length === 0 ? (
        <p className="text-secondary">Tu rol consulta los indicadores del panel principal (disponibles en el Sprint 3).</p>
      ) : (
        <div className="row g-3">
          {modulos.map((m) => (
            <div className="col-md-4" key={m.path}>
              <Link to={m.path} className="module-card">
                <strong>{m.label}</strong>
                <span>{m.description}</span>
                <span className="go">Ir al módulo →</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
