import { useEffect, useState } from 'react';

// Indique si la page a défilé au-delà de `seuil` pixels. L'état ne change
// qu'au franchissement du seuil : pas de re-rendu à chaque pixel scrollé.
export default function useDefilementDepasse(seuil) {
  const [depasse, setDepasse] = useState(false);

  useEffect(() => {
    function mesurer() {
      setDepasse(window.scrollY > seuil);
    }
    mesurer();
    window.addEventListener('scroll', mesurer, { passive: true });
    return () => window.removeEventListener('scroll', mesurer);
  }, [seuil]);

  return depasse;
}
