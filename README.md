# atlantic-city-frontend

Capa de vista del **CRM piloto de Atlantic City**: React + Vite, React Router, Bootstrap 5 y Axios.
Proyecto EFSRT · Desarrollo de los Componentes de la Capa de Vista · IDAT 2026-III · Grupo 02.

Prototipo de referencia (Figma): https://www.figma.com/proto/7yK14co8zbBfKIORF83SN4/Atlantic-City-CRM---Prototipo-Grupo-02?node-id=2-23&starting-point-node-id=2%3A23&scaling=scale-down-width

## Requisitos

- Node.js 18 o superior y npm
- La API simulada en ejecución: [atlantic-city-backend](https://github.com/webmazn/atlantic-city-backend) (`npm start`, puerto 3001)

## Uso

```bash
npm install
cp .env.example .env   # opcional: cambia VITE_API_URL si la API no está en http://localhost:3001
npm run dev            # http://localhost:5173
npm run build          # compilación de producción en dist/
```

Usuarios de demostración (contraseña `demo123`): `operaciones`, `marketing`, `servicio`, `gerencia` e `inactivo` (cuenta inactiva).

## Estado (Sprint 1 · base inicial)

| Historia | Requerimientos | Estado |
|----------|----------------|--------|
| PB_01 · Login de acceso | RF01, RNF03, RNF05 | ✅ Login con validaciones, contraseña oculta y mensajes por campo |
| PB_02 · Menú por rol y cierre de sesión | RF02, RF03, RNF06 | ✅ Rutas protegidas, menú filtrado por rol y cierre de sesión |
| PB_03 a PB_15 | — | Módulos provisionales; se implementan en sus sprints |

## Acceso por rol (RF02)

| Módulo | Operaciones | Marketing | Servicio al Cliente | Gerencia |
|--------|:-----------:|:---------:|:-------------------:|:--------:|
| Panel principal | ✔ | ✔ | ✔ | ✔ |
| Clientes | ✔ | ✔ | ✔ | |
| Visitas y juegos | ✔ | | | |
| Atención al cliente | | | ✔ | |
| Promociones | | ✔ | | |

- Sin sesión, toda ruta interna redirige al login (RNF06).
- Con sesión, abrir un módulo no permitido (por ejemplo, escribiendo la URL) redirige al panel con el aviso «Acceso no permitido» (flujo 1 de la Actividad 07).

## Estructura

```
src/
├── config/menu.js            # módulos y roles autorizados
├── context/AuthContext.jsx   # sesión (usuario y rol) con Context API
├── routes/ProtectedRoute.jsx # rutas protegidas por sesión y por rol
├── services/api.js           # instancia de Axios (capa de servicios)
├── services/authService.js   # login contra la API simulada
├── utils/validators.js       # validaciones reutilizables (RNF02–RNF04)
├── layouts/MainLayout.jsx    # menú lateral según el rol
└── pages/                    # Login, Panel principal y módulos
```

> La autenticación del piloto es **simulada** (JSON Server no valida credenciales en el servidor).
> La autenticación real corresponde a la evolución del backend con Express.
