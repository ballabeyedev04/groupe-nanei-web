import PageLegaleLayout from '../../components/public/PageLegaleLayout';

export default function ConfidentialitePage() {
  return (
    <PageLegaleLayout titre="Politique de confidentialité">
      <h2>Données collectées</h2>
      <p>
        Lorsque vous remplissez le formulaire « Demander un devis », nous collectons votre nom, votre société (le
        cas échéant), votre téléphone, votre e-mail, la ville ou le chantier concerné, le type de besoin et votre
        message.
      </p>

      <h2>Finalité</h2>
      <p>
        Ces informations sont utilisées exclusivement pour étudier votre demande et vous recontacter. Elles ne
        sont ni cédées, ni vendues à des tiers.
      </p>

      <h2>Conservation</h2>
      <p>
        Les demandes sont conservées le temps nécessaire au traitement de votre demande commerciale, puis
        archivées ou supprimées conformément à nos obligations légales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos
        données. Pour l'exercer, contactez-nous via les coordonnées indiquées sur la page{' '}
        <a href="/mentions-legales">mentions légales</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n'utilise pas de cookies de suivi publicitaire. Seuls des cookies techniques strictement
        nécessaires (le cas échéant) peuvent être déposés pour son fonctionnement.
      </p>
    </PageLegaleLayout>
  );
}
