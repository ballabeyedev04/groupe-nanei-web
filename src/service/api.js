import axios from 'axios';

// withCredentials est indispensable : l'authentification admin repose sur un
// cookie httpOnly posé par l'API (voir backend/src/modules/auth), pas sur un
// token stocké côté client.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
});

export default api;
