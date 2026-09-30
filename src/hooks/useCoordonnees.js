import { useEffect, useState } from 'react';
import { obtenirCoordonneesPubliques } from '../service/coordonneesService';

// Informations de contact publiques (téléphone, e-mail, adresse), saisies
// dans l'admin (menu « Info Contact ») et partagées par le hero, la section
// À propos, la section Contact, le menu mobile et le pied de page. La
// requête est mise en cache au niveau du module : un seul appel réseau quel
// que soit le nombre de composants. Une information non renseignée (ou une
// API injoignable) donne une chaîne vide, et chaque composant masque alors
// simplement la ligne correspondante — jamais de valeur inventée.
const VIDE = { telephone: '', email: '', adresse: '' };

let requete = null;

function charger() {
  if (!requete) {
    requete = obtenirCoordonneesPubliques()
      .then((c) => ({
        telephone: c?.telephone || '',
        email: c?.email || '',
        adresse: c?.adresse || '',
      }))
      .catch(() => {
        requete = null; // nouvel essai au prochain montage plutôt qu'un échec mis en cache
        return VIDE;
      });
  }
  return requete;
}

export default function useCoordonnees() {
  const [coordonnees, setCoordonnees] = useState(VIDE);

  useEffect(() => {
    let actif = true;
    charger().then((c) => {
      if (actif) setCoordonnees(c);
    });
    return () => {
      actif = false;
    };
  }, []);

  return coordonnees;
}
