import equipeImg from '../../assets/img/equipe.webp';
import { ENGAGEMENTS, numeroter } from '../../data/site';
import Apparition from '../ui/Apparition';

// Contenu du cahier §5 "Pourquoi choisir Groupe Nanei ?", mis en regard
// d'une photo d'équipe : c'est la section "humaine" de la page.
export default function PourquoiChoisir() {
  return (
    <section id="engagements" className="section" aria-labelledby="titre-engagements">
      <div className="conteneur engagements-grille">
        <Apparition as="figure" devoilement className="engagements-visuel">
          <img
            src={equipeImg}
            alt="Logisticiens Groupe Nanei en équipement de protection, réunis sur chantier autour d'un plan"
            loading="lazy"
            width="567"
            height="662"
          />
        </Apparition>

        <div>
          <Apparition>
            <span className="etiquette-section">Pourquoi choisir Groupe Nanei</span>
            <h2 id="titre-engagements" className="titre-section">Une équipe dédiée à la performance de vos opérations</h2>
            <p className="intro-section">
              Nous mettons en place une organisation claire, adaptée à la configuration du chantier et à ses
              différentes phases. Nos logisticiens travaillent au contact des équipes travaux, des sous-traitants,
              des transporteurs et des responsables du site.
            </p>
          </Apparition>

          <ol className="liste-engagements">
            {ENGAGEMENTS.map((e, i) => (
              <Apparition as="li" key={e.titre} delai={i * 70} className="engagement">
                <span className="engagement-numero">{numeroter(i)}</span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
