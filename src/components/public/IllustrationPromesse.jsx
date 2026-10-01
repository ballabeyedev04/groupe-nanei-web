// Illustration de la promesse "Des chantiers mieux organisés, plus sûrs et
// plus efficaces" : une checklist (organisation), un bouclier (sécurité), un
// chronomètre et une courbe montante (efficacité). Même style plat et même
// palette que IllustrationChantier, en SVG inline pour la même raison.
const MARINE = '#0D4178';
const MARINE_FONCE = '#0A2F55';
const ORANGE = '#F2A12E';
const CIEL = '#E4EFFA';
const TRAIT = '#2F6DB5';

// Lignes de la checklist : les deux premières sont cochées, la dernière en cours.
const LIGNES = [
  { y: 128, fait: true, largeur: 112 },
  { y: 184, fait: true, largeur: 96 },
  { y: 240, fait: false, largeur: 104 },
];

export default function IllustrationPromesse({ titre }) {
  return (
    <svg viewBox="0 0 600 400" role="img" aria-labelledby="illustration-promesse-titre" className="illustration-promesse">
      <title id="illustration-promesse-titre">{titre}</title>

      {/* Fond */}
      <circle cx="300" cy="200" r="185" fill={CIEL} />
      <circle cx="300" cy="200" r="185" fill="none" stroke={TRAIT} strokeWidth="2" strokeDasharray="4 10" opacity="0.35" />

      {/* Checklist : planche, pince, lignes cochées et barre d'avancement */}
      <g filter="url(#illustration-promesse-ombre)">
        <rect x="200" y="70" width="200" height="262" rx="16" fill="#FFFFFF" />
      </g>
      <rect x="255" y="54" width="90" height="32" rx="9" fill={MARINE} />
      <rect x="285" y="62" width="30" height="8" rx="4" fill={CIEL} />

      {LIGNES.map((l) => (
        <g key={l.y}>
          {l.fait ? (
            <>
              <circle cx="240" cy={l.y} r="15" fill={MARINE} />
              <path
                d={`M233 ${l.y} L238.5 ${l.y + 5.5} L248 ${l.y - 5}`}
                fill="none"
                stroke={ORANGE}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <circle cx="240" cy={l.y} r="13.5" fill="none" stroke={TRAIT} strokeWidth="3" strokeDasharray="5 5" />
          )}
          <rect x="266" y={l.y - 10} width={l.largeur} height="9" rx="4.5" fill={MARINE} opacity={l.fait ? 0.85 : 0.35} />
          <rect x="266" y={l.y + 5} width={l.largeur - 36} height="7" rx="3.5" fill={TRAIT} opacity="0.25" />
        </g>
      ))}

      <rect x="226" y="290" width="148" height="12" rx="6" fill={CIEL} />
      <rect x="226" y="290" width="104" height="12" rx="6" fill={ORANGE} />

      {/* Pastille bouclier (sécurité) */}
      <g filter="url(#illustration-promesse-ombre)">
        <circle cx="142" cy="262" r="46" fill="#FFFFFF" />
      </g>
      <path d="M142 232 L166 241 V261 C166 278 155 288 142 294 C129 288 118 278 118 261 V241 Z" fill={MARINE} />
      <path d="M131 262 L139 270 L154 254" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Pastille chronomètre (gain de temps) */}
      <g filter="url(#illustration-promesse-ombre)">
        <circle cx="458" cy="120" r="46" fill="#FFFFFF" />
      </g>
      <rect x="451" y="86" width="14" height="9" rx="2.5" fill={MARINE} />
      <circle cx="458" cy="124" r="25" fill="none" stroke={MARINE} strokeWidth="6" />
      <line x1="458" y1="124" x2="470" y2="112" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" />
      <circle cx="458" cy="124" r="4.5" fill={MARINE_FONCE} />

      {/* Courbe d'efficacité : barres croissantes et flèche montante */}
      <rect x="432" y="284" width="18" height="36" rx="3" fill={TRAIT} opacity="0.4" />
      <rect x="458" y="266" width="18" height="54" rx="3" fill={MARINE} opacity="0.7" />
      <rect x="484" y="244" width="18" height="76" rx="3" fill={MARINE} />
      <rect x="422" y="320" width="92" height="5" rx="2.5" fill={MARINE} opacity="0.25" />
      <path d="M424 270 L452 248 L468 258 L500 226" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M486 224 L502 224 L502 240" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      <defs>
        <filter id="illustration-promesse-ombre" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={MARINE} floodOpacity="0.16" />
        </filter>
      </defs>
    </svg>
  );
}
