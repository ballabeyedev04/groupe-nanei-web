import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function PageLegaleLayout({ titre, children }) {
  return (
    <div>
      <header style={{ borderBottom: '1px solid var(--bordure)', padding: '18px 0' }}>
        <div className="conteneur">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo taille={34} />
          </Link>
        </div>
      </header>
      <main className="conteneur" style={{ padding: '48px 0 80px', maxWidth: 820 }}>
        <h1 style={{ color: 'var(--bleu-marine)', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>{titre}</h1>
        <div style={{ color: 'var(--texte)', fontSize: 15, lineHeight: 1.75 }}>{children}</div>
        <Link to="/" style={{ display: 'inline-block', marginTop: 32, color: 'var(--bleu-action)', fontWeight: 600, textDecoration: 'none' }}>
          ← Retour à l'accueil
        </Link>
      </main>
    </div>
  );
}
