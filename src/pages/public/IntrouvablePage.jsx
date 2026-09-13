import { Link } from 'react-router-dom';

export default function IntrouvablePage() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
      <h1 style={{ fontSize: 72, margin: 0, color: 'var(--bleu-ciel)', fontWeight: 800 }}>404</h1>
      <p style={{ color: 'var(--texte-doux)', marginBottom: 24 }}>Cette page n'existe pas.</p>
      <Link to="/" className="bouton bouton--plein">Retour à l'accueil</Link>
    </div>
  );
}
