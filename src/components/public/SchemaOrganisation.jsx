import { COORDONNEES } from '../../utils/coordonnees';

// Données structurées LocalBusiness/Organization demandées par le cahier
// (§6 "SEO : [...] données LocalBusiness/Organization"). Les champs non
// renseignés dans coordonnees.js sont simplement omis plutôt que remplis de
// valeurs inventées — un JSON-LD partiel est correct, un JSON-LD avec un
// faux numéro de téléphone ne l'est pas.
export default function SchemaOrganisation() {
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Groupe Nanei',
    description:
      "Groupe Nanei accompagne les entreprises du BTP dans l'organisation quotidienne de leurs chantiers : bennes, trafic, livraisons, propreté et sécurité logistique.",
    areaServed: COORDONNEES.zoneIntervention,
    ...(COORDONNEES.telephone ? { telephone: COORDONNEES.telephone } : {}),
    ...(COORDONNEES.email ? { email: COORDONNEES.email } : {}),
    ...(COORDONNEES.adresseSiege ? { address: { '@type': 'PostalAddress', streetAddress: COORDONNEES.adresseSiege } } : {}),
  };

  return <script type="application/ld+json">{JSON.stringify(donnees)}</script>;
}
