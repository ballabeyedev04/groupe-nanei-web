import api from './api';

export async function login(email, motDePasse) {
  const { data } = await api.post('/auth/login', { email, motDePasse });
  return data.admin;
}

export async function obtenirSessionCourante() {
  const { data } = await api.get('/auth/me');
  return data.admin;
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function modifierProfil(valeurs) {
  const { data } = await api.put('/auth/profil', valeurs);
  return data.admin;
}

export async function changerMotDePasse(valeurs) {
  await api.put('/auth/mot-de-passe', valeurs);
}
