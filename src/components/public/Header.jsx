import { useState } from 'react';
import Logo from './Logo';
import { useDevisModal } from '../../context/DevisModalContext';

const LIENS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Nos services' },
  { href: '#realisations', label: 'Nos réalisations' },
  { href: '#engagements', label: 'Engagements' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { ouvrir } = useDevisModal();

  function allerA(href) {
    setMenuOuvert(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid var(--bordure)',
      }}
    >
      <div
        className="conteneur"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}
      >
        <a href="#accueil" onClick={(e) => { e.preventDefault(); allerA('#accueil'); }} style={{ textDecoration: 'none' }}>
          <Logo taille={38} />
        </a>

        <nav
          style={{ display: 'flex', gap: 28, alignItems: 'center' }}
          className="nav-desktop"
        >
          {LIENS.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={(e) => { e.preventDefault(); allerA(lien.href); }}
              style={{ textDecoration: 'none', color: 'var(--texte)', fontWeight: 600, fontSize: 14.5 }}
            >
              {lien.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={ouvrir}
            className="bouton bouton--plein hidden-mobile"
          >
            Demander un devis →
          </button>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOuvert((v) => !v)}
            className="bouton-menu"
            style={{
              display: 'none',
              width: 42,
              height: 42,
              borderRadius: 10,
              border: '1px solid var(--bordure)',
              background: 'var(--blanc)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="#073B6F" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOuvert && (
        <div
          className="menu-mobile"
          style={{
            borderTop: '1px solid var(--bordure)',
            background: 'var(--blanc)',
            padding: '16px 24px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {LIENS.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={(e) => { e.preventDefault(); allerA(lien.href); }}
              style={{ textDecoration: 'none', color: 'var(--texte)', fontWeight: 600 }}
            >
              {lien.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setMenuOuvert(false); ouvrir(); }}
            className="bouton bouton--plein"
            style={{ justifyContent: 'center', marginTop: 6 }}
          >
            Demander un devis →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .nav-desktop { display: none !important; }
          .hidden-mobile { display: none !important; }
          .bouton-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
