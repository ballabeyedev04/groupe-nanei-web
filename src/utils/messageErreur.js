// Message lisible à partir d'une erreur axios de l'API : les erreurs de
// validation (422) détaillent chaque champ dans `details`, plus utile que le
// générique « Données invalides. ».
export default function messageErreur(err, parDefaut = 'Merci de réessayer.') {
  const data = err?.response?.data;
  if (Array.isArray(data?.details) && data.details.length) return data.details.join(' ');
  return data?.message || parDefaut;
}
