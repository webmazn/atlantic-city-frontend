// Módulos del sistema y roles autorizados (RF02).
// La matriz sigue a los actores del análisis: cada rol ve solo lo que necesita.
export const ROLES = {
  OPERACIONES: 'OPERACIONES',
  MARKETING: 'MARKETING',
  SERVICIO_CLIENTE: 'SERVICIO_CLIENTE',
  GERENCIA: 'GERENCIA',
};

const ALL = Object.values(ROLES);

export const MODULES = [
  { path: '/', label: 'Panel principal', roles: ALL, sprint: 3, description: 'Indicadores y accesos a los módulos.' },
  {
    path: '/clientes',
    label: 'Clientes',
    roles: [ROLES.OPERACIONES, ROLES.SERVICIO_CLIENTE, ROLES.MARKETING],
    sprint: 1,
    description: 'Registro, búsqueda y actualización de clientes (RF05–RF08) y segmentación (RF12).',
  },
  {
    path: '/visitas',
    label: 'Visitas y juegos',
    roles: [ROLES.OPERACIONES],
    sprint: 2,
    description: 'Registro de visitas, juegos e historial del cliente (RF09–RF11).',
  },
  {
    path: '/atencion',
    label: 'Atención al cliente',
    roles: [ROLES.SERVICIO_CLIENTE],
    sprint: 2,
    description: 'Solicitudes, reclamos e incidencias con seguimiento (RF15–RF17).',
  },
  {
    path: '/promociones',
    label: 'Promociones',
    roles: [ROLES.MARKETING],
    sprint: 3,
    description: 'Registro de promociones y seguimiento de su uso (RF13–RF14).',
  },
];

export const ROLE_LABELS = {
  OPERACIONES: 'Operaciones',
  MARKETING: 'Marketing',
  SERVICIO_CLIENTE: 'Servicio al Cliente',
  GERENCIA: 'Gerencia',
};

export const canAccess = (role, roles) => Boolean(role) && roles.includes(role);
