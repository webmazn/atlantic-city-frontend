import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthError } from '../services/authService.js';
import { apiErrorMessage } from '../services/api.js';
import { minLength, required, validate } from '../utils/validators.js';

const RULES = {
  username: [(v) => required(v, 'tu usuario')],
  password: [(v) => required(v, 'tu contraseña'), (v) => minLength(v, 6, 'La contraseña')],
};

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const refs = { username: useRef(null), password: useRef(null) };

  if (user) return <Navigate to="/" replace />;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' })); // limpia el error al corregir
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const found = validate(values, RULES);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      refs[first].current?.focus(); // lleva el foco al primer campo con error (RNF03)
      return;
    }
    setLoading(true);
    try {
      await login(values.username.trim(), values.password);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-brand">
        <div className="brand-logo"><span className="brand-mark">AC</span>ATLANTIC CITY</div>
        <h1>Sistema de Gestión de Clientes</h1>
        <p>Una sola plataforma para conocer a cada cliente, registrar sus visitas y dar seguimiento a su atención.</p>
      </section>

      <section className="login-area">
        <form className="login-card" onSubmit={onSubmit} noValidate>
          <h2>Iniciar sesión</h2>
          <p className="text-secondary">Ingresa con tus credenciales corporativas.</p>

          {formError && <div className="alert alert-danger py-2" role="alert">{formError}</div>}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario *</label>
            <input
              id="username" name="username" ref={refs.username} autoComplete="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              value={values.username} onChange={onChange}
              aria-invalid={Boolean(errors.username)} aria-describedby="username-error"
            />
            {errors.username && <div id="username-error" className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña *</label>
            <input
              id="password" name="password" type="password" ref={refs.password} autoComplete="current-password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={values.password} onChange={onChange}
              aria-invalid={Boolean(errors.password)} aria-describedby="password-error"
            />
            {errors.password && <div id="password-error" className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="small text-secondary">* Campos obligatorios</span>
            <button type="button" className="btn btn-link btn-sm p-0" onClick={() => setShowRecovery((s) => !s)}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          {showRecovery && (
            <div className="alert alert-warning small mt-3 mb-0" role="status">
              Recuperar acceso: se enviará un enlace a tu correo corporativo (envío simulado en el piloto).
            </div>
          )}
        </form>
        <p className="small text-secondary mt-3">Acceso solo para personal autorizado · Atlantic City © 2026</p>
      </section>
    </div>
  );
}
