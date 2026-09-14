import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/public/Logo';
import { useAuth } from '../context/AuthContext';

const LIENS = [
  { to: '/admin', label: 'Accueil', exact: true, icone: '🏠' },
  { to: '/admin/devis', label: 'Demandes de devis', icone: '📋' },
  { to: '/admin/actualites', label: 'Actualités', icone: '📰' },
  { to: '/admin/coordonnees', label: 'Coordonnées', icone: '☎️' },
];

export default function AdminLayout() {
  const { admin, seDeconnecter } = useAuth();
  const navigate = useNavigate();

  async function deconnexion() {
    await seDeconnecter();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr', background: '#F5FAFF' }}>
      <aside style={{ background: 'var(--bleu-marine)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px 18px' }}>
        <div style={{ marginBottom: 34, paddingLeft: 4 }}>
          <Logo variante="blanc" taille={32} />
        </div>

        <nav style={{ display: 'grid', gap: 6, flex: 1 }}>
          {LIENS.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end={lien.exact}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10,
                textDecoration: 'none', fontWeight: 600, fontSize: 14.5,
                color: isActive ? 'var(--bleu-marine)' : '#CFEAFF',
                background: isActive ? '#fff' : 'transparent',
              })}
            >
              <span>{lien.icone}</span>
              {lien.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16 }}>
          <div style={{ fontSize: 12.5, color: '#9FC3E0', marginBottom: 10, paddingLeft: 4 }}>
            Connecté·e : {admin?.email}
          </div>
          <button
            type="button"
            onClick={deconnexion}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff',
              fontWeight: 600, fontSize: 14.5, cursor: 'pointer',
            }}
          >
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <main style={{ padding: '32px 40px', maxWidth: 1100 }}>
        <Outlet />
      </main>
    </div>
  );
}
