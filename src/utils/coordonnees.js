// Coordonnées réelles de l'entreprise — NON fournies dans le cahier de
// contenu (qui demande justement de ne jamais publier de coordonnées
// fictives, §8 et §6 "Confiance"/"RGPD"). Un seul endroit à modifier avant
// mise en production : ces valeurs sont importées par la section Contact,
// le pied de page et les pages légales.
export const COORDONNEES = {
  siret: '', // requis pour des mentions légales valides
  formeJuridique: '', // ex. 'SAS au capital de ...'
  directeurPublication: '',
  hebergeur: {
    nom: '',
    adresse: '',
  },
};

export function coordonneeOuPlaceholder(valeur, libellePlaceholder) {
  return valeur && valeur.trim() ? valeur : libellePlaceholder;
}
