const MOIS_ABBR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

function libelleMois(cle) {
  const [, mois] = cle.split('-');
  return MOIS_ABBR[parseInt(mois, 10) - 1];
}

// Graphe en barres dessiné à la main en SVG — pas besoin d'une dépendance de
// charting pour 12 points de données, même logique que les graphes internes
// du projet principal (pas de lib externe pour un simple histogramme).
export default function GraphiqueDevisParMois({ donnees }) {
  const max = Math.max(1, ...donnees.map((d) => d.total));
  const largeurBarre = 100 / donnees.length;

  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '22px 24px', boxShadow: 'var(--ombre)' }}>
      <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: 'var(--bleu-marine)' }}>
        Demandes de devis par mois
      </h3>
      <svg viewBox="0 0 100 46" style={{ width: '100%', height: 200, overflow: 'visible' }} preserveAspectRatio="none">
        {donnees.map((d, i) => {
          const hauteur = (d.total / max) * 36;
          const x = i * largeurBarre + largeurBarre * 0.2;
          const largeur = largeurBarre * 0.6;
          return (
            <g key={d.mois}>
              <rect
                x={x}
                y={38 - hauteur}
                width={largeur}
                height={hauteur}
                rx={1.2}
                fill="var(--bleu-action)"
                opacity={d.total === 0 ? 0.15 : 1}
              >
                <title>{`${d.mois} : ${d.total} demande(s)`}</title>
              </rect>
            </g>
          );
        })}
        <line x1="0" y1="38" x2="100" y2="38" stroke="var(--bordure)" strokeWidth="0.4" />
      </svg>
      <div style={{ display: 'flex', marginTop: 4 }}>
        {donnees.map((d) => (
          <span key={d.mois} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--texte-doux)' }}>
            {libelleMois(d.mois)}
          </span>
        ))}
      </div>
    </div>
  );
}
