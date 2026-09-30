import useDefilement from '../../hooks/useDefilement';

// Barre de progression de lecture (en haut) + bouton "retour en haut" qui
// apparaît une fois le hero dépassé.
export default function IndicateursDefilement() {
  const { y, progression } = useDefilement();
  const boutonVisible = y > 600;

  return (
    <>
      <div className="barre-progression" style={{ transform: `scaleX(${progression})` }} aria-hidden="true" />
      <button
        type="button"
        className="retour-haut"
        aria-label="Revenir en haut de la page"
        tabIndex={boutonVisible ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          opacity: boutonVisible ? 1 : 0,
          transform: boutonVisible ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: boutonVisible ? 'auto' : 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
