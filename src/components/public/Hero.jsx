import heroImg from '../../assets/img/hero.jpg';
import { useDevisModal } from '../../context/DevisModalContext';
import Apparition from '../ui/Apparition';

function defilerVers(selecteur) {
  document.querySelector(selecteur)?.scrollIntoView({ behavior: 'smooth' });
}

// Texte repris mot pour mot du cahier §3 "Bannière principale / Hero".
// Les badges flottants ne reprennent que des engagements déjà présents dans
// le cahier (§5) — aucun chiffre ni référence client inventés.
export default function Hero() {
  const { ouvrir } = useDevisModal();

  return (
    <section id="accueil" className="hero" style={{ background: 'linear-gradient(180deg, var(--bleu-ciel-clair), #fff 85%)' }}>
      <div className="hero-grille-deco" />
      <div className="hero-bulle" style={{ width: 420, height: 420, background: '#9fd3ff', top: -120, right: -80 }} />
      <div className="hero-bulle" style={{ width: 320, height: 320, background: '#cfeaff', bottom: -60, left: -100, animationDelay: '-8s' }} />

      <div
        className="conteneur hero-grille"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 56,
          alignItems: 'center',
          paddingTop: 64,
          paddingBottom: 40,
        }}
      >
        <div>
          <Apparition>
            <span className="etiquette-section">Logistique de chantier</span>
          </Apparition>
          <Apparition delai={100}>
            <h1 style={{ fontSize: 'clamp(32px, 4.6vw, 52px)', fontWeight: 800, color: 'var(--bleu-marine)', lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              La logistique au service de <span className="hero-titre-accent">vos chantiers</span>
            </h1>
          </Apparition>
          <Apparition delai={200}>
            <p style={{ fontSize: 17, color: 'var(--texte-doux)', lineHeight: 1.7, maxWidth: 530, margin: '0 0 32px' }}>
              Groupe Nanei accompagne les entreprises du BTP dans l'organisation quotidienne de leurs chantiers.
              Nous coordonnons les flux, les accès, les livraisons, les bennes, la propreté et la sécurité
              logistique afin de rendre vos opérations plus fluides, plus sûres et plus performantes.
            </p>
          </Apparition>
          <Apparition delai={300} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" onClick={ouvrir} className="bouton bouton--plein">
              Demander un devis <span className="fleche">→</span>
            </button>
            <a href="#services" className="bouton bouton--contour-bleu" onClick={(e) => { e.preventDefault(); defilerVers('#services'); }}>
              Découvrir nos services
            </a>
          </Apparition>
        </div>

        <Apparition delai={200} effet="zoom" style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: '18px -18px -18px 18px', borderRadius: 'var(--rayon)',
              border: '2px solid var(--bleu-ciel)', background: 'linear-gradient(135deg, var(--bleu-ciel-clair), transparent)',
            }}
          />
          <img
            src={heroImg}
            alt="Logisticien Groupe Nanei de dos, gilet haute visibilité et casque blanc, coordonnant la circulation sur un chantier moderne"
            loading="eager"
            style={{ position: 'relative', width: '100%', borderRadius: 'var(--rayon)', boxShadow: '0 24px 60px rgba(7, 59, 111, 0.22)', aspectRatio: '4/3.4', objectFit: 'cover' }}
          />

          <div className="hero-badge flotte" style={{ top: -20, left: -30 }}>
            <span className="pastille-icone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A5EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-2.5 9.5 1.8 1.8L15.5 9" />
              </svg>
            </span>
            <span>Sécurité en priorité<small>Accès maîtrisés</small></span>
          </div>

          <div className="hero-badge flotte flotte--lent" style={{ bottom: 34, right: -26 }}>
            <span className="point-pulse" />
            <span>Réactivité terrain<small>Présence opérationnelle sur site</small></span>
          </div>
        </Apparition>
      </div>

      <div style={{ position: 'relative', paddingBottom: 28 }}>
        <button type="button" className="indicateur-scroll" aria-label="Défiler vers la section À propos" onClick={() => defilerVers('#a-propos')}>
          <span />
        </button>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hero-grille { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
