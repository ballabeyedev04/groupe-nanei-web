import { useEffect, useRef, useState } from 'react';

// Détecte l'entrée d'un élément dans le viewport pour déclencher une
// apparition douce — exactement ce que demande le cahier §6 : "Animations :
// discrètes seulement : apparition douce des cartes [...]. Éviter les effets
// lourds qui ralentissent le site." Une fois visible, on ne redéclenche pas
// l'animation (évite un effet de clignotement en scrollant de haut en bas).
export default function useEnVue({ seuil = 0.15, marge = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    // Respecte la préférence système "réduire les animations" — cohérent
    // avec l'exigence d'accessibilité du cahier §6.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      // Rendu immédiatement visible, sans animation : la règle set-state-in-
      // effect suppose un risque de rendu en cascade, mais cet effet ne
      // dépend d'aucun état qu'il modifierait lui-même (pas de boucle possible).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return undefined;
    }

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: seuil, rootMargin: marge }
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, [seuil, marge]);

  return [ref, visible];
}
