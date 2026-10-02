import api from './api';

// Formulaire public "Demander un devis" — voir cahier §6 pour la liste des
// champs attendue. `site_web` est le piège anti-spam (honeypot), laissé vide
// par un visiteur humain puisqu'invisible en CSS (voir DevisModal.jsx).
export async function envoyerDemandeDevis(donnees) {
  const { data } = await api.post('/devis', donnees);
  return data;
}

// Réservé à l'admin (cookie de session requis) :
export async function listerDevis(params) {
  const { data } = await api.get('/devis', { params });
  return data;
}

export async function obtenirDevis(id) {
  const { data } = await api.get(`/devis/${id}`);
  return data.devis;
}

// Avec pièces jointes : multipart/form-data (le navigateur pose lui-même
// l'en-tête et sa frontière) ; sans fichier, un simple envoi JSON.
export async function repondreDevis(id, { sujet, message, fichiers = [] }) {
  let corps = { sujet, message };
  if (fichiers.length > 0) {
    corps = new FormData();
    corps.append('sujet', sujet);
    corps.append('message', message);
    fichiers.forEach((f) => corps.append('piecesJointes', f));
  }
  const { data } = await api.post(`/devis/${id}/repondre`, corps);
  return data.devis;
}
