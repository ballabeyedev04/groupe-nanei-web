import { Link } from 'react-router-dom';
import Logo from './Logo';

const LIENS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Nos services' },
  { href: '#realisations', label: 'Nos réalisations' },
  { href: '#engagements', label: 'Engagements' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer style={{ background: '#052A52', padding: '32px 0', color: '#9FC3E0' }}>
      <div
        className="conteneur"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Logo variante="blanc" taille={30} />

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 13.5 }}>
          {LIENS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ textDecoration: 'none', color: '#9FC3E0' }}
            >
              {l.label}
            </a>
          ))}
          <Link to="/mentions-legales" style={{ textDecoration: 'none', color: '#9FC3E0' }}>Mentions légales</Link>
          <Link to="/politique-de-confidentialite" style={{ textDecoration: 'none', color: '#9FC3E0' }}>Confidentialité</Link>
        </nav>

        <span style={{ fontSize: 12.5 }}>© {annee} Groupe Nanei — Tous droits réservés</span>
      </div>
    </footer>
  );
}
