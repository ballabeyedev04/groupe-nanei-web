import { useEffect, useState } from 'react';
import { obtenirCoordonneesPubliques } from '../service/coordonneesService';
import { COORDONNEES } from '../utils/coordonnees';

// Coordonnées publiques (configurées dans l'admin), partagées par la section
// Contact et le pied de page. La requête est mise en cache au niveau du
// module : un seul appel réseau quel que soit le nombre de composants.
// Tant que rien n'est configuré (ou si l'API ne répond pas), on retombe sur
// coordonnees.js — jamais un flash de contenu vide.
const PAR_DEFAUT = {
  telephone: COORDONNEES.telephone,
  email: COORDONNEES.email,
  adresse: COORDONNEES.adresseSiege,
};

let requete = null;

function charger() {
  if (!requete) {
    requete = obtenirCoordonneesPubliques()
      .then((c) => ({
        telephone: c?.telephone || PAR_DEFAUT.telephone,
        email: c?.email || PAR_DEFAUT.email,
        adresse: c?.adresse || PAR_DEFAUT.adresse,
      }))
      .catch(() => PAR_DEFAUT);
  }
  return requete;
}

export default function useCoordonnees() {
  const [coordonnees, setCoordonnees] = useState(PAR_DEFAUT);

  useEffect(() => {
    let actif = true;
    charger().then((c) => {
      if (actif) setCoordonnees(c);
    });
    return () => {
      actif = false;
    };
  }, []);

  return { ...coordonnees, zone: COORDONNEES.zoneIntervention };
}
