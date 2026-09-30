import { useEffect, useState } from 'react';
import useEnVue from '../../hooks/useEnVue';

const MOUVEMENT_REDUIT =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Nombre qui compte de 0 à `valeur` à son entrée dans le viewport. Le
// nombre final est toujours présent pour les lecteurs d'écran et les
// moteurs de recherche ; seule la version visuelle est animée.
export default function Compteur({ valeur, chiffres = 2, duree = 1400 }) {
  const [ref, visible] = useEnVue({ seuil: 0.6 });
  const [courant, setCourant] = useState(0);

  useEffect(() => {
    if (!visible || MOUVEMENT_REDUIT) return undefined;
    let frame;
    const debut = performance.now();
    function avancer(maintenant) {
      const t = Math.min(1, (maintenant - debut) / duree);
      const adouci = 1 - (1 - t) ** 3;
      setCourant(Math.round(adouci * valeur));
      if (t < 1) frame = requestAnimationFrame(avancer);
    }
    frame = requestAnimationFrame(avancer);
    return () => cancelAnimationFrame(frame);
  }, [visible, valeur, duree]);

  const format = (n) => String(n).padStart(chiffres, '0');
  const affiche = MOUVEMENT_REDUIT ? valeur : courant;

  return (
    <span ref={ref}>
      <span aria-hidden="true">{format(affiche)}</span>
      <span className="visuellement-cache">{valeur}</span>
    </span>
  );
}
