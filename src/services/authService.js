import api from './api.js';

export class AuthError extends Error {}

// Autenticación SIMULADA del piloto: JSON Server no valida credenciales en el servidor.
// En la evolución (Express) este servicio llamará a POST /auth/login con contraseñas cifradas.
export async function login(username, password) {
  const { data: usuarios } = await api.get('/usuarios', { params: { username, password } });
  const usuario = usuarios[0];
  if (!usuario) throw new AuthError('Usuario o contraseña incorrectos.');
  if (usuario.estado !== 'ACTIVO') throw new AuthError('Cuenta inactiva. Contacta al área de TI.');

  const { data: rol } = await api.get(`/roles/${usuario.id_rol}`);
  return {
    id: usuario.id,
    nombre: `${usuario.nombres} ${usuario.apellidos}`,
    username: usuario.username,
    rol: rol.nombre,
  };
}
