// Jeu d'icônes au trait, volontairement réduit : utilisées uniquement là où
// elles aident à la lecture (coordonnées, menu, flèches), jamais en décor.
const TRACES = {
  fleche: <path d="M5 12h14M13 6l6 6-6 6" />,
  haut: <path d="M12 19V5M6 11l6-6 6 6" />,
  menu: <path d="M3 8h18M3 16h18" />,
  fermer: <path d="M6 6l12 12M18 6 6 18" />,
  telephone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  lieu: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

export default function Icone({ nom, taille = 18 }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRACES[nom]}
    </svg>
  );
}
