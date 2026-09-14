import Swal from 'sweetalert2';

// Instance partagée, dans la palette du site (même principe que l'admin de
// suivie_chantier : un seul point de configuration, jamais de Swal.fire brut
// dispersé dans les écrans).
const SwalSite = Swal.mixin({
  confirmButtonColor: '#0A5EA8',
  buttonsStyling: true,
  focusConfirm: false,
});

// `title` est interprété comme du HTML par SweetAlert2 — on passe toujours
// par `titleText` pour ne jamais exécuter de balises si le texte venait un
// jour à contenir des données saisies par un visiteur.
export function succes({ titre, texte }) {
  return SwalSite.fire({ icon: 'success', titleText: titre, text: texte, confirmButtonText: 'Fermer' });
}

export function erreur({ titre, texte }) {
  return SwalSite.fire({ icon: 'error', titleText: titre, text: texte, confirmButtonText: 'Fermer' });
}

// Confirmation avant une action irréversible (suppression) — résout `true`
// seulement si l'admin a cliqué sur le bouton de confirmation.
export async function confirmer({ titre, texte, confirmButtonText = 'Confirmer' }) {
  const resultat = await SwalSite.fire({
    icon: 'warning',
    titleText: titre,
    text: texte,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#C0392B',
    reverseButtons: true,
  });
  return resultat.isConfirmed;
}

export default SwalSite;
