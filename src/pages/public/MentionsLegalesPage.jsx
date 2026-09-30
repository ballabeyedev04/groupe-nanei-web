import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLegaleLayout from '../../components/public/PageLegaleLayout';
import { COORDONNEES, coordonneeOuPlaceholder } from '../../utils/coordonnees';
import { obtenirCoordonneesPubliques } from '../../service/coordonneesService';

// Trame standard de mentions légales françaises. L'e-mail et l'adresse
// viennent désormais de l'admin (menu « Coordonnées ») — les informations
// purement juridiques (SIRET, forme, hébergeur...) restent hors de ce
// périmètre et gardent leurs placeholders tant que coordonnees.js n'est
// pas complété : les publier sans les compléter exposerait l'entreprise.
export default function MentionsLegalesPage() {
  const [dynamique, setDynamique] = useState({ email: '', adresse: '' });

  useEffect(() => {
    obtenirCoordonneesPubliques()
      .then((c) => setDynamique({ email: c.email || '', adresse: c.adresse || '' }))
      .catch(() => {});
  }, []);

  return (
    <PageLegaleLayout titre="Mentions légales">
      <p style={{ padding: '12px 16px', background: '#FFF7E6', border: '1px solid #F0D9A0', borderRadius: 10, fontSize: 13.5 }}>
        ⚠️ Page à compléter avant mise en ligne : SIRET, forme juridique et hébergeur doivent être renseignés dans{' '}
        <code>src/utils/coordonnees.js</code>. Le siège social et l'e-mail se renseignent depuis l'espace admin,
        menu « Info Contact ».
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Groupe Nanei — {coordonneeOuPlaceholder(COORDONNEES.formeJuridique, '[forme juridique à renseigner]')}<br />
        Siège social : {coordonneeOuPlaceholder(dynamique.adresse, '[adresse à renseigner dans l’admin]')}<br />
        SIRET : {coordonneeOuPlaceholder(COORDONNEES.siret, '[SIRET à renseigner]')}<br />
        E-mail : {coordonneeOuPlaceholder(dynamique.email, '[e-mail à renseigner dans l’admin]')}<br />
        Directeur de la publication : {coordonneeOuPlaceholder(COORDONNEES.directeurPublication, '[nom à renseigner]')}
      </p>

      <h2>Hébergement</h2>
      <p>
        {coordonneeOuPlaceholder(COORDONNEES.hebergeur.nom, '[nom de l’hébergeur à renseigner]')}<br />
        {coordonneeOuPlaceholder(COORDONNEES.hebergeur.adresse, '[adresse de l’hébergeur à renseigner]')}
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété de Groupe Nanei,
        sauf mention contraire, et ne peut être reproduit sans autorisation préalable.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les informations transmises via le formulaire de devis sont utilisées uniquement pour traiter votre
        demande. Voir notre <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    </PageLegaleLayout>
  );
}
