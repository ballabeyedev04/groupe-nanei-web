// Aucun fichier logo vectoriel n'a été fourni par le client (les visuels
// reçus sont soit des rendus 3D en photo, soit des mockups de page entière —
// rien d'utilisable comme logo isolé). Ce mark SVG reprend le style
// "silhouette de bâtiments" évoqué sur les maquettes de référence, dans le
// bleu du cahier de direction artistique — à remplacer par le vrai logo dès
// qu'un fichier SVG/PNG définitif est fourni.
export default function Logo({ variante = 'bleu', taille = 40 }) {
  const couleur = variante === 'blanc' ? '#FFFFFF' : '#073B6F';
  const accent = variante === 'blanc' ? '#CFEAFF' : '#0A5EA8';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={taille} height={taille} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M8 38V20l7-5 7 5v18M22 38V14l7-5 7 5v24"
          stroke={couleur}
          strokeWidth="3.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M4 38h40" stroke={accent} strokeWidth="3.4" strokeLinecap="round" />
      </svg>
      <span style={{ lineHeight: 1.05 }}>
        <span
          style={{
            display: 'block',
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: '0.02em',
            color: couleur,
          }}
        >
          GROUPE NANEI
        </span>
        <span
          style={{
            display: 'block',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.12em',
            color: accent,
          }}
        >
          LOGISTIQUE DE CHANTIER
        </span>
      </span>
    </span>
  );
}
