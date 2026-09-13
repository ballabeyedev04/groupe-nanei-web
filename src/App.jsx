import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import VitrinePage from './pages/public/VitrinePage';
import MentionsLegalesPage from './pages/public/MentionsLegalesPage';
import ConfidentialitePage from './pages/public/ConfidentialitePage';
import IntrouvablePage from './pages/public/IntrouvablePage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import DevisListPage from './pages/admin/DevisListPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<VitrinePage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/politique-de-confidentialite" element={<ConfidentialitePage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="devis" element={<DevisListPage />} />
          </Route>
        </Route>

        <Route path="*" element={<IntrouvablePage />} />
      </Routes>
    </AuthProvider>
  );
}
