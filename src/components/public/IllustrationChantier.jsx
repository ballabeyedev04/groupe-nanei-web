// Illustration de la section À propos : un chantier organisé (bâtiment en
// construction, grue, benne, camion de livraison), dans le même style plat
// et la même palette que l'illustration du hero (marine, orange, bleu ciel).
// En SVG inline : nette à toutes les tailles et sans requête réseau.
const MARINE = '#0D4178';
const MARINE_FONCE = '#0A2F55';
const ORANGE = '#F2A12E';
const CIEL = '#E4EFFA';
const TRAIT = '#2F6DB5';

export default function IllustrationChantier({ titre }) {
  return (
    <svg viewBox="0 0 600 470" role="img" aria-labelledby="illustration-chantier-titre" className="illustration-chantier">
      <title id="illustration-chantier-titre">{titre}</title>

      {/* Fond */}
      <circle cx="300" cy="235" r="215" fill={CIEL} />
      <circle cx="300" cy="235" r="215" fill="none" stroke={TRAIT} strokeWidth="2" strokeDasharray="4 10" opacity="0.35" />

      {/* Grue : mât, flèche, tirants, cabine, contrepoids, câble et charge */}
      <rect x="378" y="104" width="16" height="284" fill={MARINE} />
      {[130, 170, 210, 250, 290, 330].map((y) => (
        <path key={y} d={`M378 ${y} L394 ${y + 20} M394 ${y} L378 ${y + 20}`} stroke="#FFFFFF" strokeWidth="2" opacity="0.55" />
      ))}
      <path d="M386 70 L230 104 M386 70 L470 104" stroke={MARINE} strokeWidth="4" strokeLinecap="round" />
      <rect x="222" y="100" width="258" height="12" rx="3" fill={MARINE} />
      <rect x="370" y="112" width="32" height="24" rx="4" fill={ORANGE} />
      <rect x="440" y="112" width="30" height="22" rx="3" fill={MARINE_FONCE} />
      <line x1="262" y1="112" x2="262" y2="150" stroke={MARINE_FONCE} strokeWidth="3" />
      <rect x="240" y="150" width="44" height="24" rx="4" fill={ORANGE} />
      <rect x="240" y="158" width="44" height="4" fill="#FFFFFF" opacity="0.45" />

      {/* Bâtiment en construction : poteaux, dalles, vitrages des étages finis */}
      {[
        { x: 200, y: 265 },
        { x: 265, y: 265 },
        { x: 200, y: 330 },
        { x: 265, y: 330 },
      ].map((b) => (
        <g key={`${b.x}-${b.y}`}>
          <rect x={b.x} y={b.y} width="55" height="55" fill="#FFFFFF" />
          <rect x={b.x + 8} y={b.y + 8} width="39" height="39" rx="2" fill={TRAIT} opacity="0.18" />
          <line x1={b.x + 27.5} y1={b.y + 8} x2={b.x + 27.5} y2={b.y + 47} stroke="#FFFFFF" strokeWidth="3" />
        </g>
      ))}
      {[190, 255, 320].map((x) => (
        <rect key={x} x={x} y="196" width="10" height="192" fill={MARINE} />
      ))}
      {[190, 255, 320].map((y) => (
        <rect key={y} x="182" y={y} width="156" height="10" rx="2" fill={MARINE} />
      ))}

      {/* Sol et cheminement balisé */}
      <rect x="70" y="386" width="460" height="6" rx="3" fill={MARINE} opacity="0.18" />
      <line x1="140" y1="414" x2="470" y2="414" stroke={TRAIT} strokeWidth="3" strokeDasharray="12 10" strokeLinecap="round" />

      {/* Benne */}
      <path d="M92 330 H178 L166 388 H104 Z" fill={MARINE} />
      <rect x="86" y="320" width="98" height="12" rx="4" fill={ORANGE} />
      <circle cx="114" cy="394" r="7" fill={MARINE_FONCE} />
      <circle cx="156" cy="394" r="7" fill={MARINE_FONCE} />

      {/* Cône de signalisation */}
      <path d="M344 388 L356 352 L368 388 Z" fill={ORANGE} />
      <rect x="349" y="368" width="14" height="5" fill="#FFFFFF" />
      <rect x="338" y="386" width="36" height="5" rx="2" fill={MARINE_FONCE} />

      {/* Camion de livraison */}
      <rect x="410" y="318" width="92" height="56" rx="7" fill={MARINE} />
      <rect x="502" y="336" width="40" height="38" rx="6" fill={ORANGE} />
      <rect x="512" y="344" width="20" height="13" rx="2" fill="#FFFFFF" opacity="0.7" />
      <circle cx="434" cy="380" r="13" fill={MARINE_FONCE} />
      <circle cx="520" cy="380" r="13" fill={MARINE_FONCE} />
      <circle cx="434" cy="380" r="4" fill={CIEL} />
      <circle cx="520" cy="380" r="4" fill={CIEL} />

      {/* Pastille casque (sécurité) */}
      <g filter="url(#illustration-ombre)">
        <circle cx="118" cy="170" r="40" fill="#FFFFFF" />
      </g>
      <path d="M96 182 a22 22 0 0 1 44 0 Z" fill={ORANGE} />
      <rect x="112" y="152" width="12" height="16" rx="3" fill="#FFFFFF" opacity="0.5" />
      <rect x="90" y="180" width="56" height="8" rx="4" fill={MARINE} />

      {/* Pastille validation (site conforme) */}
      <g filter="url(#illustration-ombre)">
        <circle cx="512" cy="200" r="40" fill="#FFFFFF" />
      </g>
      <circle cx="512" cy="200" r="26" fill={MARINE} />
      <path d="M500 200 L509 209 L525 191" fill="none" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      <defs>
        <filter id="illustration-ombre" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={MARINE} floodOpacity="0.16" />
        </filter>
      </defs>
    </svg>
  );
}
