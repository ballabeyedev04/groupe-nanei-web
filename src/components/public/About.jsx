import useCoordonnees from '../../hooks/useCoordonnees';
import { numeroter } from '../../data/site';
import Apparition from '../ui/Apparition';
import Icone from '../ui/Icone';
import IllustrationChantier from './IllustrationChantier';
import IllustrationPromesse from './IllustrationPromesse';

// Contenu repris du cahier §3 "À propos de Groupe Nanei" — présentation,
// promesse et les 5 valeurs. Les valeurs sont présentées en colonnes
// numérotées séparées par des filets, sans pictogramme décoratif.
const VALEURS = [
  { titre: 'Sécurité', texte: 'Respect des consignes, contrôle des accès et prévention des risques.' },
  { titre: 'Organisation', texte: 'Coordination méthodique des flux, zones et interventions.' },
  { titre: 'Réactivité', texte: 'Une équipe disponible pour répondre aux imprévus du chantier.' },
  { titre: 'Propreté', texte: "Maintien d'espaces propres et circulables." },
  { titre: 'Engagement', texte: "Respect des équipes, des délais et de l'environnement." },
];

export default function About() {
  const { adresse } = useCoordonnees();

  return (
    <section id="a-propos" className="section" aria-labelledby="titre-apropos">
      <div className="conteneur">
        <div className="apropos-grille">
          <div className="apropos-visuel">
            <Apparition as="figure" devoilement>
              <IllustrationChantier titre="Chantier organisé par Groupe Nanei : bâtiment en construction, grue, benne, camion de livraison et accès sécurisé" />
            </Apparition>
            {adresse && (
              <span className="apropos-zone">
                <Icone nom="lieu" /> {adresse}
              </span>
            )}
          </div>

          <div className="apropos-texte">
            <Apparition>
              <span className="etiquette-section">À propos de Groupe Nanei</span>
              <h2 id="titre-apropos" className="titre-section">Un partenaire de confiance pour vos chantiers</h2>
            </Apparition>
            <Apparition delai={80}>
              <p>
                Groupe Nanei est spécialisé dans la logistique de chantier et l'accompagnement opérationnel des
                entreprises du BTP. Nos équipes organisent les flux, réceptionnent et orientent les livraisons,
                gèrent les accès, assurent le suivi des bennes, maintiennent la propreté des zones de travail et
                contribuent à la sécurisation du site.
              </p>
              <p>
                Notre priorité est simple&nbsp;: permettre aux équipes travaux de se concentrer sur leur métier,
                pendant que nous assurons une logistique rigoureuse, réactive et adaptée aux contraintes du chantier.
              </p>
            </Apparition>
          </div>
        </div>

        {/* Promesse sur sa propre ligne, illustration à gauche : en colonne
            de droite, elle laissait un grand vide sous l'illustration. */}
        <div className="promesse-bloc">
          <Apparition as="figure" devoilement className="promesse-visuel">
            <IllustrationPromesse titre="Une checklist cochée, un bouclier de sécurité, un chronomètre et une courbe montante : des chantiers organisés, sûrs et efficaces" />
          </Apparition>

          <Apparition as="figure" className="promesse" delai={120}>
            <span className="etiquette-section">Notre promesse</span>
            <blockquote>Des chantiers mieux organisés, plus sûrs et plus efficaces.</blockquote>
            <p>
              Une logistique maîtrisée réduit les pertes de temps, limite les encombrements, améliore la
              circulation et contribue directement à la qualité d'exécution du chantier.
            </p>
          </Apparition>
        </div>

        <ul className="valeurs" aria-label="Nos valeurs" style={{ listStyle: 'none', padding: 0 }}>
          {VALEURS.map((v, i) => (
            <Apparition as="li" key={v.titre} delai={i * 70} className="valeur">
              <span className="valeur-numero">{numeroter(i)}</span>
              <h3>{v.titre}</h3>
              <p>{v.texte}</p>
            </Apparition>
          ))}
        </ul>
      </div>
    </section>
  );
}
