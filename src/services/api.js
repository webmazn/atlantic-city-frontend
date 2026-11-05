import axios from 'axios';

// Capa de servicios: el único punto de contacto con la API.
// Para migrar de JSON Server a Express solo cambia VITE_API_URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 8000,
});

export function apiErrorMessage(error) {
  if (error?.code === 'ECONNABORTED') return 'El servidor tardó demasiado en responder. Intenta nuevamente.';
  if (!error?.response) return 'No se pudo conectar con el servidor. Verifica que la API esté en ejecución.';
  return 'Ocurrió un error inesperado. Intenta nuevamente.';
}

export default api;
