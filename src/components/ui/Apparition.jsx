import useEnVue from '../../hooks/useEnVue';

// Fait apparaître son contenu (fondu + léger glissement) à l'entrée dans le
// viewport. `devoilement` remplace l'effet par une ouverture du cadre, pour
// les images. `delai` (ms) permet un léger décalage entre éléments voisins.
// Le rendu reste un élément HTML au choix (`as`) pour ne pas multiplier les
// <div> inutiles autour des listes, figures, etc.
export default function Apparition({
  as: Balise = 'div',
  children,
  delai = 0,
  devoilement = false,
  className = '',
  style,
  ...props
}) {
  const [ref, visible] = useEnVue();
  const classes = [
    devoilement ? 'devoilement' : 'apparition',
    visible ? 'apparition--visible' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Balise
      ref={ref}
      className={classes}
      style={delai ? { transitionDelay: `${delai}ms`, ...style } : style}
      {...props}
    >
      {children}
    </Balise>
  );
}
