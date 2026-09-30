import api from './api';

// Public — site vitrine, sans authentification.
export async function obtenirCoordonneesPubliques() {
  const { data } = await api.get('/public/coordonnees');
  return data.coordonnees;
}

// Admin — cookie de session requis.
export async function obtenirCoordonnees() {
  const { data } = await api.get('/coordonnees');
  return data.coordonnees;
}

// Une seule ligne de contact existe : POST la crée (refusé s'il y en a déjà
// une), PUT modifie celle qui existe.
export async function creerCoordonnees(valeurs) {
  const { data } = await api.post('/coordonnees', valeurs);
  return data.coordonnees;
}

export async function modifierCoordonnees(valeurs) {
  const { data } = await api.put('/coordonnees', valeurs);
  return data.coordonnees;
}

export async function supprimerCoordonnees() {
  await api.delete('/coordonnees');
}
