import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/admin/LoginPage';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import DevisListPage from '../pages/admin/DevisListPage';
import ActualitesPage from '../pages/admin/ActualitesPage';
import CoordonneesPage from '../pages/admin/CoordonneesPage';
import IntrouvablePage from '../pages/public/IntrouvablePage';

// Back-office, chargé à la demande depuis App.jsx (routes relatives à /admin).
// L'AuthProvider n'est monté qu'ici : la vitrine n'interroge jamais la
// session admin.
export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="devis" element={<DevisListPage />} />
            <Route path="actualites" element={<ActualitesPage />} />
            <Route path="coordonnees" element={<CoordonneesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<IntrouvablePage />} />
      </Routes>
    </AuthProvider>
  );
}
