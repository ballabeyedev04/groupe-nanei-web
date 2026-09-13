import useEnVue from '../../hooks/useEnVue';

// Enveloppe générique : fait apparaître son contenu en fondu + léger
// glissement vers le haut dès qu'il entre dans le viewport. `delai` (ms)
// permet un effet "en cascade" sur une liste de cartes (voir Services,
// PourquoiChoisir, Realisations).
export default function Apparition({ children, delai = 0, style, ...props }) {
  const [ref, visible] = useEnVue();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.6s ease ${delai}ms, transform 0.6s ease ${delai}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
