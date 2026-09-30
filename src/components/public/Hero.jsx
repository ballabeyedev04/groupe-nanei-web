import heroImg from '../../assets/img/hero.webp';
import { useDevisModal } from '../../context/DevisModalContext';
import useCoordonnees from '../../hooks/useCoordonnees';
import { ENGAGEMENTS, SERVICES, defilerVers } from '../../data/site';
import Apparition from '../ui/Apparition';
import Compteur from '../ui/Compteur';
import Icone from '../ui/Icone';

// Texte adapté du cahier §3 "Bannière principale / Hero" (et de la promesse
// du §3 "À propos" pour la dernière phrase). Les repères sous
// le hero ne contiennent que des faits vérifiables (nombre de services et
// d'engagements réellement présentés sur le site, zone d'intervention) —
// aucun chiffre commercial inventé.
export default function Hero() {
  const { ouvrir } = useDevisModal();
  const { zone } = useCoordonnees();

  return (
    <>
      <section id="accueil" className="hero" aria-labelledby="titre-hero">
        <div className="hero-grille">
          <div className="hero-texte">
            <Apparition>
              <span className="etiquette-section">Logistique de chantier · BTP</span>
            </Apparition>
            <Apparition delai={80}>
              <h1 id="titre-hero">
                La logistique au service de <em>vos chantiers</em>
              </h1>
            </Apparition>
            <Apparition delai={160}>
              <p className="hero-accroche">
                Groupe Nanei accompagne les entreprises du BTP dans l'organisation quotidienne de leurs chantiers :
                flux, accès, livraisons, bennes, propreté et sécurité logistique. Vos équipes se concentrent sur
                leur métier, nous assurons le reste.
              </p>
            </Apparition>
            <Apparition delai={240} className="hero-actions">
              <button type="button" onClick={ouvrir} className="bouton bouton--plein">
                Demander un devis <Icone nom="fleche" />
              </button>
              <a href="#services" className="lien-souligne" onClick={(e) => { e.preventDefault(); defilerVers('#services'); }}>
                Découvrir nos services
              </a>
            </Apparition>
          </div>

          <Apparition as="figure" devoilement className="hero-visuel">
            <img
              src={heroImg}
              alt="Logisticien Groupe Nanei coordonnant la circulation des véhicules à l'entrée d'un chantier"
              fetchPriority="high"
              width="792"
              height="556"
            />
            <figcaption className="hero-legende">
              <strong>Zone d'intervention</strong>
              {zone}
            </figcaption>
          </Apparition>
        </div>
      </section>

      <div className="reperes">
        <div className="conteneur reperes-grille">
          <Apparition className="repere">
            <span className="repere-valeur"><Compteur valeur={SERVICES.length} /></span>
            <span className="repere-libelle">services logistiques coordonnés par une seule équipe</span>
          </Apparition>
          <Apparition className="repere" delai={80}>
            <span className="repere-valeur"><Compteur valeur={ENGAGEMENTS.length} /></span>
            <span className="repere-libelle">engagements tenus sur chaque chantier</span>
          </Apparition>
          <Apparition className="repere" delai={160}>
            <span className="repere-valeur repere-valeur--texte">Sur mesure</span>
            <span className="repere-libelle">une organisation adaptée à chaque phase du chantier</span>
          </Apparition>
          <Apparition className="repere" delai={240}>
            <span className="repere-valeur repere-valeur--texte">Sur site</span>
            <span className="repere-libelle">des logisticiens présents au quotidien, au contact de vos équipes</span>
          </Apparition>
        </div>
      </div>
    </>
  );
}
