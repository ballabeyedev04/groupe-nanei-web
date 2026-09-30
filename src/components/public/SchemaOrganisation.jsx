import useCoordonnees from '../../hooks/useCoordonnees';

// Données structurées LocalBusiness/Organization demandées par le cahier
// (§6 "SEO : [...] données LocalBusiness/Organization"). Téléphone, e-mail
// et adresse viennent de l'admin (menu « Info Contact ») ; ceux qui ne sont
// pas renseignés sont simplement omis plutôt que remplis de valeurs
// inventées — un JSON-LD partiel est correct, un faux numéro ne l'est pas.
export default function SchemaOrganisation() {
  const { telephone, email, adresse } = useCoordonnees();
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Groupe Nanei',
    description:
      "Groupe Nanei accompagne les entreprises du BTP dans l'organisation quotidienne de leurs chantiers : bennes, trafic, livraisons, propreté et sécurité logistique.",
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    ...(adresse ? { address: { '@type': 'PostalAddress', streetAddress: adresse } } : {}),
  };

  return <script type="application/ld+json">{JSON.stringify(donnees)}</script>;
}
