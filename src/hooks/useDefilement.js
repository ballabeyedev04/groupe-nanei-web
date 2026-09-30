import { useEffect, useState } from 'react';

// Renvoie la position de défilement verticale (px) et la progression de
// lecture de la page (0 → 1). Mis à jour au plus une fois par frame.
export default function useDefilement() {
  const [etat, setEtat] = useState({ y: 0, progression: 0 });

  useEffect(() => {
    let frame = 0;
    function mesurer() {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setEtat({ y, progression: max > 0 ? Math.min(1, y / max) : 0 });
    }
    function surDefilement() {
      if (!frame) frame = requestAnimationFrame(mesurer);
    }
    mesurer();
    window.addEventListener('scroll', surDefilement, { passive: true });
    window.addEventListener('resize', surDefilement);
    return () => {
      window.removeEventListener('scroll', surDefilement);
      window.removeEventListener('resize', surDefilement);
      cancelAnimationFrame(frame);
    };
  }, []);

  return etat;
}
