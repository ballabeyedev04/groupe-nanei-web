import api from './api';

// Public — site vitrine, sans authentification. Ne renvoie que les
// actualités déjà publiées (voir actualite.service.js côté backend).
export async function listerActualitesPubliques(params) {
  const { data } = await api.get('/public/actualites', { params });
  return data;
}

// Admin — cookie de session requis. Renvoie aussi les actualités
// programmées dans le futur.
export async function listerActualites(params) {
  const { data } = await api.get('/actualites', { params });
  return data;
}

export async function obtenirActualite(id) {
  const { data } = await api.get(`/actualites/${id}`);
  return data.actualite;
}

export async function creerActualite(valeurs) {
  const { data } = await api.post('/actualites', valeurs);
  return data.actualite;
}

export async function modifierActualite(id, valeurs) {
  const { data } = await api.put(`/actualites/${id}`, valeurs);
  return data.actualite;
}

export async function supprimerActualite(id) {
  await api.delete(`/actualites/${id}`);
}
