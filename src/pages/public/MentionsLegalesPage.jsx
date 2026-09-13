import PageLegaleLayout from '../../components/public/PageLegaleLayout';
import { COORDONNEES, coordonneeOuPlaceholder } from '../../utils/coordonnees';

// Trame standard de mentions légales françaises. Les informations
// juridiques (SIRET, forme, siège, hébergeur...) ne figurent pas dans le
// cahier fourni par le client — publier ces mentions sans les compléter
// exposerait l'entreprise, donc les placeholders restent visibles tels
// quels tant que src/utils/coordonnees.js n'est pas renseigné.
export default function MentionsLegalesPage() {
  return (
    <PageLegaleLayout titre="Mentions légales">
      <p style={{ padding: '12px 16px', background: '#FFF7E6', border: '1px solid #F0D9A0', borderRadius: 10, fontSize: 13.5 }}>
        ⚠️ Page à compléter avant mise en ligne : les informations légales de l'entreprise (SIRET, forme
        juridique, siège social, hébergeur) doivent être renseignées dans <code>src/utils/coordonnees.js</code>.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Groupe Nanei — {coordonneeOuPlaceholder(COORDONNEES.formeJuridique, '[forme juridique à renseigner]')}<br />
        Siège social : {coordonneeOuPlaceholder(COORDONNEES.adresseSiege, '[adresse à renseigner]')}<br />
        SIRET : {coordonneeOuPlaceholder(COORDONNEES.siret, '[SIRET à renseigner]')}<br />
        E-mail : {coordonneeOuPlaceholder(COORDONNEES.email, '[e-mail à renseigner]')}<br />
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
        demande. Voir notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>
    </PageLegaleLayout>
  );
}
