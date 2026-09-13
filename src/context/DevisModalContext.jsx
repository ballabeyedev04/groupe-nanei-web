import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import DevisModal from '../components/public/DevisModal';

const DevisModalContext = createContext(null);

// Un seul modal monté une fois, ouvrable depuis n'importe quel bouton "Demander
// un devis" du site (header, hero, services, section contact...) sans avoir à
// faire remonter un état local dans chaque composant.
export function DevisModalProvider({ children }) {
  const [ouvert, setOuvert] = useState(false);

  const ouvrir = useCallback(() => setOuvert(true), []);
  const fermer = useCallback(() => setOuvert(false), []);

  const valeur = useMemo(() => ({ ouvrir }), [ouvrir]);

  return (
    <DevisModalContext.Provider value={valeur}>
      {children}
      <DevisModal ouvert={ouvert} onFermer={fermer} />
    </DevisModalContext.Provider>
  );
}

export function useDevisModal() {
  const ctx = useContext(DevisModalContext);
  if (!ctx) throw new Error('useDevisModal doit être utilisé sous <DevisModalProvider>.');
  return ctx;
}
