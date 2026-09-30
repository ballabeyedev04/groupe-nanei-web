import useEnVue from '../../hooks/useEnVue';

// Position de départ de chaque effet, avant l'entrée dans le viewport.
const EFFETS = {
  haut: 'translateY(28px)',
  gauche: 'translateX(-40px)',
  droite: 'translateX(40px)',
  zoom: 'scale(0.92)',
};

// Enveloppe générique : fait apparaître son contenu en fondu + mouvement
// (glissement vers le haut par défaut, ou depuis la gauche / la droite, ou
// zoom) dès qu'il entre dans le viewport. `delai` (ms) permet un effet "en
// cascade" sur une liste de cartes (voir Services, PourquoiChoisir, Realisations).
export default function Apparition({ children, delai = 0, effet = 'haut', style, ...props }) {
  const [ref, visible] = useEnVue();
  const courbe = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : EFFETS[effet] ?? EFFETS.haut,
        transition: `opacity 0.8s ${courbe} ${delai}ms, transform 0.8s ${courbe} ${delai}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
