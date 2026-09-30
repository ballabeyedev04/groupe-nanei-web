import { useDevisModal } from '../../context/DevisModalContext';
import { defilerVers } from '../../data/site';
import Apparition from '../ui/Apparition';
import Icone from '../ui/Icone';

// Appel à l'action du cahier §5 ("Vous avez un chantier à organiser ?"),
// placé en respiration pleine largeur entre les réalisations et la suite.
export default function BandeauAppel() {
  const { ouvrir } = useDevisModal();

  return (
    <section className="appel" aria-labelledby="titre-appel">
      <div className="conteneur appel-grille">
        <Apparition>
          <h2 id="titre-appel">Vous avez un chantier à organiser&nbsp;? Parlons de vos besoins.</h2>
          <p>
            Groupe Nanei étudie votre organisation, vos contraintes d'accès, vos flux et vos besoins logistiques
            afin de vous proposer une solution adaptée.
          </p>
        </Apparition>
        <Apparition delai={120} className="appel-actions">
          <button type="button" onClick={ouvrir} className="bouton bouton--blanc">
            Demander un devis <Icone nom="fleche" />
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); defilerVers('#contact'); }}
            className="bouton bouton--contour"
          >
            Nous contacter
          </a>
        </Apparition>
      </div>
    </section>
  );
}
