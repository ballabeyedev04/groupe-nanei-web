import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Sans session : redirection vers la page de connexion. Pendant la
// vérification initiale du cookie, un simple indicateur plutôt qu'un flash
// de redirection.
export default function ProtectedRoute() {
  const { admin, verifie } = useAuth();

  if (!verifie) {
    return (
      <div className="adm-chargement" role="status" aria-label="Chargement">
        <span className="adm-spinner" />
      </div>
    );
  }
  if (!admin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
