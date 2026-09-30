// Contenus partagés entre plusieurs composants du site vitrine (en-tête,
// pied de page, section Services, formulaire de devis) — un seul endroit à
// modifier pour que tout reste cohérent.

export const NAVIGATION = [
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#methode', label: 'Méthode' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#actualites', label: 'Actualités' },
  { href: '#contact', label: 'Contact' },
];

// Les 8 services et leurs textes proviennent du cahier §4 "Nos services -
// textes complets", repris mot pour mot.
export const SERVICES = [
  {
    titre: 'Gestion des bennes',
    texte: 'Mise en place et suivi des bennes, organisation des rotations, contrôle du remplissage, coordination des enlèvements et maintien des zones de déchets propres et accessibles.',
  },
  {
    titre: 'Gestion du trafic chantier',
    texte: "Organisation des entrées et sorties de véhicules, guidage des camions et engins, régulation des circulations, gestion des zones d'attente et prévention des conflits de flux.",
  },
  {
    titre: 'Réception des colis et livraisons',
    texte: 'Accueil des transporteurs, contrôle des livraisons, enregistrement, orientation vers les zones prévues, coordination avec les équipes concernées et suivi des colis reçus.',
  },
  {
    titre: 'Ouverture et fermeture des portes',
    texte: 'Gestion des accès selon les horaires du chantier, ouverture et fermeture des portails et portes, contrôle des entrées et signalement des anomalies.',
  },
  {
    titre: 'Sécurité logistique du chantier',
    texte: 'Contrôle des accès, application des consignes du site, surveillance des zones logistiques, remontée des situations à risque et soutien à la prévention des incidents.',
  },
  {
    titre: 'Nettoyage et entretien',
    texte: 'Nettoyage des circulations et zones communes, évacuation des déchets, maintien des accès dégagés et contribution à un chantier propre, organisé et professionnel.',
  },
  {
    titre: 'Gestion des flux piétons',
    texte: 'Organisation des cheminements, maintien des passages libres, signalisation des zones sensibles et accompagnement des visiteurs ou intervenants lorsque nécessaire.',
  },
  {
    titre: 'Gestion des zones de stockage',
    texte: "Organisation et repérage des espaces de stockage, optimisation de l'occupation, maintien des accès et coordination avec les entreprises pour éviter l'encombrement.",
  },
];

// Contenu du cahier §5 "Pourquoi choisir Groupe Nanei ?", repris tel quel.
export const ENGAGEMENTS = [
  { titre: 'Sécurité en priorité', texte: 'Des procédures claires, des accès maîtrisés et une vigilance quotidienne.' },
  { titre: 'Organisation sur mesure', texte: 'Une méthode adaptée à la taille, aux contraintes et au rythme de chaque chantier.' },
  { titre: 'Réactivité terrain', texte: 'Une présence opérationnelle pour gérer les besoins et imprévus au quotidien.' },
  { titre: 'Chantier propre', texte: 'Une attention constante portée aux circulations, déchets et zones communes.' },
  { titre: 'Interlocuteur fiable', texte: "Un suivi professionnel et une communication claire avec l'encadrement du chantier." },
];

export function numeroter(index) {
  return String(index + 1).padStart(2, '0');
}

// Défilement doux vers une ancre de la page (le décalage de l'en-tête fixe
// est géré par `scroll-padding-top` dans index.css).
export function defilerVers(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}
