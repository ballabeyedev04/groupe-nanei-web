import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useDevisModal } from '../../context/DevisModalContext';
import useDefilement from '../../hooks/useDefilement';

const LIENS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Nos services' },
  { href: '#methode', label: 'Notre méthode' },
  { href: '#realisations', label: 'Nos réalisations' },
  { href: '#engagements', label: 'Engagements' },
  { href: '#actualites', label: 'Actualités' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [sectionActive, setSectionActive] = useState('#accueil');
  const { ouvrir } = useDevisModal();
  const scrolle = useDefilement().y > 20;

  // Scrollspy léger : surligne dans le menu la section actuellement à
  // l'écran, sans dépendance externe — juste un IntersectionObserver par
  // section (cahier §6 : transitions discrètes, pas d'effet lourd).
  useEffect(() => {
    const sections = LIENS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observateur = new IntersectionObserver(
      (entrees) => {
        const visible = entrees.find((e) => e.isIntersecting);
        if (visible) setSectionActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observateur.observe(s));
    return () => observateur.disconnect();
  }, []);

  function allerA(href) {
    setMenuOuvert(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={`entete ${scrolle ? 'entete--scrolle' : ''}`}
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
        className="conteneur entete-ligne"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, height: 76 }}
      >
        <a
          href="#accueil"
          onClick={(e) => { e.preventDefault(); allerA('#accueil'); }}
          style={{ textDecoration: 'none', flexShrink: 0 }}
        >
          <Logo taille={38} />
        </a>

        <nav
          style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'nowrap' }}
          className="nav-desktop"
        >
          {LIENS.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={(e) => { e.preventDefault(); allerA(lien.href); }}
              className={`lien-nav ${sectionActive === lien.href ? 'lien-nav--actif' : ''}`}
              style={{ textDecoration: 'none', color: 'var(--texte)', fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap' }}
            >
              {lien.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            onClick={ouvrir}
            className="bouton bouton--plein hidden-mobile"
          >
            Demander un devis <span className="fleche">→</span>
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
            Demander un devis <span className="fleche">→</span>
          </button>
        </div>
      )}

      <style>{`
        /* Le menu complet (8 liens + logo + bouton) a besoin de place : on
           bascule sur le menu mobile dès que ça commence à se resserrer,
           plutôt que de laisser "Contact" coller au bouton "Demander un
           devis" dans l'entre-deux. */
        @media (max-width: 1220px) {
          .nav-desktop { display: none !important; }
          .hidden-mobile { display: none !important; }
          .bouton-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
