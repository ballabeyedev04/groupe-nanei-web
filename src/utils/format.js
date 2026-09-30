export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// Sans l'heure — pour l'affichage public d'une actualité, où la minute de
// publication n'a pas d'intérêt.
export function formatDateCourte(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// Deux lettres pour l'avatar du compte admin : initiales du nom, sinon début
// de l'e-mail.
export function initiales(nom = '', email = '') {
  const mots = (nom || '').trim().split(/\s+/).filter(Boolean);
  if (mots.length >= 2) return mots[0][0] + mots[1][0];
  return (mots[0] || email || '?').slice(0, 2);
}
