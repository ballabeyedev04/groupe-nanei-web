import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { admin, verifie } = useAuth();

  if (!verifie) return null; // évite un flash de redirection pendant la vérification initiale
  if (!admin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
