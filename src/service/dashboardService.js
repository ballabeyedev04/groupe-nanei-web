import api from './api';

export async function obtenirStats() {
  const { data } = await api.get('/dashboard/stats');
  return data;
}
