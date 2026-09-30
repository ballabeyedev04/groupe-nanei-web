import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/admin/LoginPage';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import ContactPage from '../pages/admin/ContactPage';
import DevisListPage from '../pages/admin/DevisListPage';
import ActualitesPage from '../pages/admin/ActualitesPage';
import ProfilPage from '../pages/admin/ProfilPage';
import IntrouvablePage from '../pages/public/IntrouvablePage';
import '../styles/admin.css';

// Back-office, chargé à la demande depuis App.jsx (routes relatives à /admin).
// L'AuthProvider n'est monté qu'ici : la vitrine n'interroge jamais la
// session admin.
//   /admin            → /admin/dashboard, ou /admin/login sans session
//   /admin/login      → après connexion, /admin/dashboard
export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="devis" element={<DevisListPage />} />
            <Route path="actualites" element={<ActualitesPage />} />
            <Route path="profil" element={<ProfilPage />} />
          </Route>
        </Route>
        <Route path="*" element={<IntrouvablePage />} />
      </Routes>
    </AuthProvider>
  );
}
