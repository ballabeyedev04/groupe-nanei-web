import { useState } from 'react';

// Histogramme des demandes de devis, dessiné en SVG (pas de dépendance de
// charting pour une trentaine de points au plus). Axe vertical gradué en
// entiers, bulle d'information au survol ou au focus clavier.
const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MOIS_LONGS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function versDate(periode) {
  const [a, m, j = '1'] = periode.split('-');
  return new Date(Number(a), Number(m) - 1, Number(j));
}

// Libellés courts (axe) et longs (bulle) selon la granularité.
const FORMATS = {
  mois: {
    court: (p) => MOIS_COURTS[versDate(p).getMonth()],
    long: (p) => {
      const d = versDate(p);
      return `${MOIS_LONGS[d.getMonth()]} ${d.getFullYear()}`;
    },
  },
  semaine: {
    court: (p) => {
      const d = versDate(p);
      return `${d.getDate()} ${MOIS_COURTS[d.getMonth()]}`;
    },
    long: (p) => {
      const d = versDate(p);
      const fin = new Date(d);
      fin.setDate(d.getDate() + 6);
      return `Semaine du ${d.getDate()} ${MOIS_COURTS[d.getMonth()]} au ${fin.getDate()} ${MOIS_COURTS[fin.getMonth()]}`;
    },
  },
  jour: {
    court: (p) => String(versDate(p).getDate()),
    long: (p) => {
      const d = versDate(p);
      return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    },
  },
};

// Pas de graduation "rond" : 1, 2, 5, 10, 20, 50…
function pasGraduation(max) {
  const brut = max / 4;
  const puissance = 10 ** Math.floor(Math.log10(Math.max(brut, 1)));
  const [pas] = [1, 2, 5, 10].map((f) => f * puissance).filter((p) => p >= brut);
  return Math.max(1, pas);
}

const L = 640;
const H = 260;
const MARGE = { haut: 16, droite: 8, bas: 28, gauche: 34 };

export default function GraphiqueDevis({ donnees, granularite }) {
  const [survol, setSurvol] = useState(null);
  const format = FORMATS[granularite];

  const maxBrut = Math.max(0, ...donnees.map((d) => d.total));
  const pas = pasGraduation(maxBrut);
  // Axe juste au-dessus du pic (au moins deux graduations, même sans donnée).
  const max = Math.max(pas * 2, Math.ceil(maxBrut / pas) * pas);
  const graduations = Array.from({ length: Math.round(max / pas) + 1 }, (_, i) => i * pas);

  const largeurZone = L - MARGE.gauche - MARGE.droite;
  const hauteurZone = H - MARGE.haut - MARGE.bas;
  const colonne = largeurZone / donnees.length;
  const largeurBarre = Math.min(34, colonne * 0.62);
  // Sur 30 jours, un libellé sur trois suffit pour rester lisible.
  const pasLibelle = donnees.length > 14 ? 3 : 1;
  const y = (v) => MARGE.haut + hauteurZone - (v / max) * hauteurZone;

  const actif = survol !== null ? donnees[survol] : null;

  return (
    <div className="adm-graphe">
      <svg viewBox={`0 0 ${L} ${H}`} role="img" aria-label="Nombre de demandes de devis par période">
        {graduations.map((g) => (
          <g key={g}>
            <line x1={MARGE.gauche} x2={L - MARGE.droite} y1={y(g)} y2={y(g)} stroke="var(--ligne)" strokeDasharray={g === 0 ? undefined : '3 5'} />
            <text x={MARGE.gauche - 10} y={y(g) + 4} textAnchor="end" fontSize="11" fill="var(--texte-doux)">{g}</text>
          </g>
        ))}

        {donnees.map((d, i) => {
          const x = MARGE.gauche + i * colonne + (colonne - largeurBarre) / 2;
          const hauteur = Math.max(d.total > 0 ? 3 : 2, (d.total / max) * hauteurZone);
          return (
            <g
              key={d.periode}
              className="adm-graphe-colonne"
              tabIndex={0}
              onMouseEnter={() => setSurvol(i)}
              onMouseLeave={() => setSurvol(null)}
              onFocus={() => setSurvol(i)}
              onBlur={() => setSurvol(null)}
              aria-label={`${format.long(d.periode)} : ${d.total} demande${d.total > 1 ? 's' : ''}`}
            >
              {/* Zone de survol pleine hauteur, plus facile à viser que la barre. */}
              <rect x={MARGE.gauche + i * colonne} y={MARGE.haut} width={colonne} height={hauteurZone} fill="transparent" />
              <rect
                className={`adm-graphe-barre${d.total === 0 ? ' adm-graphe-barre--vide' : ''}`}
                x={x}
                y={MARGE.haut + hauteurZone - hauteur}
                width={largeurBarre}
                height={hauteur}
                rx={Math.min(6, largeurBarre / 3)}
              />
              {i % pasLibelle === 0 && (
                <text x={x + largeurBarre / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--texte-doux)">
                  {format.court(d.periode)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {actif && (
        <div
          className="adm-graphe-bulle"
          style={{
            left: `${((MARGE.gauche + (survol + 0.5) * colonne) / L) * 100}%`,
            top: `${(y(actif.total) / H) * 100}%`,
          }}
        >
          <strong>{actif.total} demande{actif.total > 1 ? 's' : ''}</strong>
          {format.long(actif.periode)}
        </div>
      )}
    </div>
  );
}
