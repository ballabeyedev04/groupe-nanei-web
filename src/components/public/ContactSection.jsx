import useCoordonnees from '../../hooks/useCoordonnees';
import Apparition from '../ui/Apparition';
import Icone from '../ui/Icone';
import DevisFormulaire from './DevisFormulaire';

// Une ligne de coordonnées, cliquable (appel / e-mail) quand `href` est
// fourni. Une coordonnée non encore renseignée dans l'admin n'est pas
// affichée du tout, plutôt qu'avec un texte d'attente.
function Coordonnee({ icone, libelle, valeur, href }) {
  if (!valeur) return null;
  const contenu = (
    <>
      <Icone nom={icone} />
      <div>
        <small>{libelle}</small>
        <span>{valeur}</span>
      </div>
    </>
  );
  return (
    <li>
      {href ? <a className="coordonnee" href={href}>{contenu}</a> : <div className="coordonnee">{contenu}</div>}
    </li>
  );
}

export default function ContactSection() {
  const { telephone, email, adresse, zone } = useCoordonnees();

  return (
    <section id="contact" className="section section--papier" aria-labelledby="titre-contact">
      <div className="conteneur">
        <Apparition className="contact-grille">
          <div className="contact-infos">
            <span className="etiquette-section" style={{ color: 'var(--bleu-ciel)' }}>Contact</span>
            <h2 id="titre-contact">Discutons de votre projet</h2>
            <p>Notre équipe est à votre écoute pour vous proposer une solution adaptée à votre chantier.</p>

            <ul className="coordonnees">
              <Coordonnee
                icone="telephone"
                libelle="Téléphone"
                valeur={telephone}
                href={telephone && `tel:${telephone.replace(/\s+/g, '')}`}
              />
              <Coordonnee
                icone="email"
                libelle="E-mail"
                valeur={email}
                href={email && `mailto:${email}`}
              />
              <Coordonnee icone="lieu" libelle={adresse ? 'Adresse' : "Zone d'intervention"} valeur={adresse || zone} />
            </ul>

            <p className="contact-note">
              Vous pouvez aussi nous écrire via le formulaire : chaque demande est lue et traitée par notre équipe.
            </p>
          </div>

          <div className="contact-formulaire">
            <h3>Demande de devis</h3>
            <p>Quelques informations sur votre chantier suffisent pour que nous revenions vers vous.</p>
            <DevisFormulaire />
          </div>
        </Apparition>
      </div>
    </section>
  );
}
