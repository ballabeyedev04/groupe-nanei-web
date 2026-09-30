import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogoEntete } from '../components/public/Logo';
import IconeAdmin from '../components/admin/IconeAdmin';
import { useAuth } from '../context/AuthContext';
import { confirmer } from '../utils/swal';
import { initiales } from '../utils/format';

// Les 5 écrans du back-office ; la déconnexion (6e entrée) est un bouton.
const LIENS = [
  { to: '/admin/dashboard', label: 'Accueil', icone: 'accueil' },
  { to: '/admin/contact', label: 'Info Contact', icone: 'contact' },
  { to: '/admin/devis', label: 'Les devis', icone: 'devis' },
  { to: '/admin/actualites', label: 'Actualités', icone: 'actualites' },
  { to: '/admin/profil', label: 'Profil', icone: 'profil' },
];

export default function AdminLayout() {
  const { admin, seDeconnecter } = useAuth();
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);
  // Sur mobile, le menu se referme dès qu'on choisit un écran.
  const fermerMenu = () => setMenuOuvert(false);

  async function deconnexion() {
    const ok = await confirmer({
      titre: 'Se déconnecter ?',
      texte: 'Vous devrez saisir à nouveau vos identifiants pour accéder à l’espace administration.',
      confirmButtonText: 'Se déconnecter',
    });
    if (!ok) return;
    await seDeconnecter();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className={`adm${menuOuvert ? ' adm--menu-ouvert' : ''}`}>
      <div className="adm-barre-mobile">
        <LogoEntete taille={36} />
        <button type="button" className="adm-bouton-icone" onClick={() => setMenuOuvert(true)} aria-label="Ouvrir le menu">
          <IconeAdmin nom="menu" />
        </button>
      </div>

      <div className="adm-coque">
        <aside className="adm-menu" aria-label="Menu de l'administration">
          <Link to="/admin/dashboard" className="adm-menu-logo" aria-label="Tableau de bord" onClick={fermerMenu}>
            <LogoEntete variante="blanc" taille={40} />
          </Link>

          <p className="adm-menu-titre">Administration</p>
          <nav className="adm-nav">
            {LIENS.map((lien) => (
              <NavLink key={lien.to} to={lien.to} className="adm-nav-lien" onClick={fermerMenu}>
                <IconeAdmin nom={lien.icone} />
                {lien.label}
              </NavLink>
            ))}
            <button type="button" className="adm-nav-lien adm-nav-lien--sortie" onClick={deconnexion}>
              <IconeAdmin nom="deconnexion" />
              Déconnexion
            </button>
          </nav>

          <div className="adm-menu-pied">
            <Link to="/admin/profil" className="adm-menu-compte" style={{ textDecoration: 'none' }} onClick={fermerMenu}>
              <span className="adm-avatar">{initiales(admin?.nom, admin?.email)}</span>
              <span>
                <strong>{admin?.nom}</strong>
                <span>{admin?.email}</span>
              </span>
            </Link>
          </div>
        </aside>

        <div className="adm-voile" onClick={fermerMenu} aria-hidden="true" />

        <main className="adm-contenu">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
