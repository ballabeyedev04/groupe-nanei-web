import { useEffect, useState } from 'react';
import Logo, { LogoEntete } from './Logo';
import Icone from '../ui/Icone';
import { useDevisModal } from '../../context/DevisModalContext';
import useDefilementDepasse from '../../hooks/useDefilement';
import useCoordonnees from '../../hooks/useCoordonnees';
import { NAVIGATION, defilerVers, numeroter } from '../../data/site';

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [sectionActive, setSectionActive] = useState('');
  const defile = useDefilementDepasse(12);
  const { ouvrir } = useDevisModal();
  const { telephone, email, zone } = useCoordonnees();

  // Scrollspy : surligne dans le menu la section actuellement à l'écran.
  useEffect(() => {
    const sections = NAVIGATION.map((l) => document.querySelector(l.href)).filter(Boolean);
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

  // Menu mobile : bloque le défilement de la page et se ferme avec Échap.
  useEffect(() => {
    if (!menuOuvert) return undefined;
    function surEchap(e) {
      if (e.key === 'Escape') setMenuOuvert(false);
    }
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', surEchap);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', surEchap);
    };
  }, [menuOuvert]);

  function allerA(e, href) {
    e.preventDefault();
    setMenuOuvert(false);
    defilerVers(href);
  }

  return (
    <header className={`entete ${defile ? 'entete--defile' : ''}`}>
      <div className="conteneur entete-ligne">
        <a href="#accueil" onClick={(e) => allerA(e, '#accueil')} style={{ textDecoration: 'none' }} aria-label="Groupe Nanei — retour à l'accueil">
          <LogoEntete />
        </a>

        <nav className="entete-nav" aria-label="Navigation principale">
          {NAVIGATION.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={(e) => allerA(e, lien.href)}
              className={`lien-nav ${sectionActive === lien.href ? 'lien-nav--actif' : ''}`}
              aria-current={sectionActive === lien.href ? 'true' : undefined}
            >
              {lien.label}
            </a>
          ))}
        </nav>

        <div className="entete-actions">
          <button type="button" onClick={ouvrir} className="bouton bouton--plein">
            Demander un devis
          </button>
          <button
            type="button"
            className="bouton-menu"
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
            onClick={() => setMenuOuvert(true)}
          >
            Menu <Icone nom="menu" taille={22} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`menu-mobile ${menuOuvert ? 'menu-mobile--ouvert' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOuvert}
        inert={!menuOuvert}
      >
        <div className="menu-mobile-haut">
          <Logo variante="blanc" taille={32} />
          <button type="button" className="bouton-menu" onClick={() => setMenuOuvert(false)}>
            Fermer <Icone nom="fermer" taille={22} />
          </button>
        </div>

        <nav aria-label="Navigation mobile">
          {NAVIGATION.map((lien, i) => (
            <a
              key={lien.href}
              href={lien.href}
              onClick={(e) => allerA(e, lien.href)}
              style={{ transitionDelay: menuOuvert ? `${80 + i * 50}ms` : '0ms' }}
            >
              <span>{numeroter(i)}</span>
              {lien.label}
            </a>
          ))}
        </nav>

        <div className="menu-mobile-pied">
          <button
            type="button"
            onClick={() => { setMenuOuvert(false); ouvrir(); }}
            className="bouton bouton--blanc"
          >
            Demander un devis <Icone nom="fleche" />
          </button>
          <div>
            {telephone && <div><a href={`tel:${telephone.replace(/\s+/g, '')}`} style={{ color: '#fff' }}>{telephone}</a></div>}
            {email && <div><a href={`mailto:${email}`} style={{ color: '#fff' }}>{email}</a></div>}
            <div>{zone}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
