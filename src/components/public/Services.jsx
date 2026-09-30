import { useDevisModal } from '../../context/DevisModalContext';
import { SERVICES, numeroter } from '../../data/site';
import Apparition from '../ui/Apparition';
import Icone from '../ui/Icone';

// Présentation éditoriale des 8 services : une colonne fixe (titre,
// introduction, appel à l'action) et une liste numérotée séparée par des filets, plutôt
// qu'une grille de cartes identiques.
export default function Services() {
  const { ouvrir } = useDevisModal();

  return (
    <section id="services" className="section section--papier" aria-labelledby="titre-services">
      <div className="conteneur services-grille">
        <div className="services-colonne">
          <Apparition>
            <span className="etiquette-section">Nos services</span>
            <h2 id="titre-services" className="titre-section">Une solution complète pour la gestion de vos chantiers</h2>
            <p className="intro-section">
              Huit métiers logistiques, une seule équipe pour les coordonner. Vous choisissez les prestations
              dont votre chantier a besoin, nous les organisons ensemble.
            </p>
          </Apparition>
          <Apparition delai={120} style={{ marginTop: 40 }}>
            <button type="button" onClick={ouvrir} className="bouton bouton--plein">
              Demander un devis <Icone nom="fleche" />
            </button>
          </Apparition>
        </div>

        <ol className="liste-services">
          {SERVICES.map((s, i) => (
            <Apparition as="li" key={s.titre} className="service">
              <span className="service-numero">{numeroter(i)}</span>
              <h3>{s.titre}</h3>
              <p>{s.texte}</p>
            </Apparition>
          ))}
        </ol>
      </div>
    </section>
  );
}
