import { formatTaille } from './format';

// Mêmes règles que l'API (backend/src/middlewares/piecesJointes.middleware.js) :
// vérifiées ici pour prévenir l'admin avant l'envoi, l'API restant juge final.
export const MAX_FICHIERS = 5;
export const MAX_PAR_FICHIER = 3 * 1024 * 1024;
export const EXTENSIONS = [
  '.pdf', '.jpg', '.jpeg', '.png', '.webp', '.gif',
  '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.odt', '.ods', '.odp', '.txt', '.csv',
];

function extension(nom) {
  const i = nom.lastIndexOf('.');
  return i === -1 ? '' : nom.slice(i).toLowerCase();
}

// Ajoute `nouveaux` à `fichiers` ; renvoie la liste retenue et, s'il y a lieu,
// le motif du refus des fichiers écartés.
export function ajouterFichiers(fichiers, nouveaux) {
  const retenus = [...fichiers];
  const refus = [];
  for (const f of nouveaux) {
    if (retenus.some((r) => r.name === f.name && r.size === f.size)) continue;
    if (!EXTENSIONS.includes(extension(f.name))) {
      refus.push(`« ${f.name} » : format non accepté`);
    } else if (f.size > MAX_PAR_FICHIER) {
      refus.push(`« ${f.name} » fait ${formatTaille(f.size)} : veuillez mettre un fichier inférieur à 3 Mo`);
    } else if (retenus.length >= MAX_FICHIERS) {
      refus.push(`« ${f.name} » : ${MAX_FICHIERS} fichiers maximum`);
    } else {
      retenus.push(f);
    }
  }
  return { retenus, refus };
}
