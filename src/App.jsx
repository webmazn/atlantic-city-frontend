import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ModulePage from './pages/ModulePage.jsx';
import { MODULES } from './config/menu.js';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Toda ruta interna exige sesión iniciada (RNF06) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          {MODULES.filter((m) => m.path !== '/').map((m) => (
            // Cada módulo exige además que el rol esté autorizado (RF02)
            <Route key={m.path} element={<ProtectedRoute roles={m.roles} />}>
              <Route path={m.path} element={<ModulePage module={m} />} />
            </Route>
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
