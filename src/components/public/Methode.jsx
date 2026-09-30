import useEnVue from '../../hooks/useEnVue';
import { numeroter } from '../../data/site';
import Apparition from '../ui/Apparition';
import EnTeteSection from '../ui/EnTeteSection';

// Reformulation en étapes du fonctionnement déjà décrit dans le cahier
// (§5 "Pourquoi choisir Groupe Nanei" et le bloc d'appel à l'action) — aucune
// nouvelle promesse, juste une présentation plus lisible du déroulé réel.
const ETAPES = [
  {
    titre: 'Vous nous présentez votre chantier',
    texte: "Vos contraintes d'accès, vos flux et vos besoins logistiques — par le formulaire de devis ou par téléphone.",
  },
  {
    titre: 'Nous étudions votre organisation',
    texte: 'Configuration du site, phases du chantier, contraintes de circulation : nous cernons précisément vos besoins.',
  },
  {
    titre: 'Nous proposons une solution sur mesure',
    texte: 'Une méthode adaptée à la taille, aux contraintes et au rythme de votre chantier — pas une offre standardisée.',
  },
  {
    titre: 'Nos logisticiens interviennent et assurent le suivi',
    texte: 'Présence opérationnelle sur site, communication claire avec votre encadrement, adaptation aux imprévus.',
  },
];

// Section sombre pour rythmer la page ; la ligne de temps se trace à
// l'entrée de la liste dans l'écran.
export default function Methode() {
  const [refListe, listeVisible] = useEnVue({ seuil: 0.3 });

  return (
    <section id="methode" className="section section--sombre methode" aria-labelledby="titre-methode">
      <div className="conteneur">
        <EnTeteSection
          id="titre-methode"
          etiquette="Notre méthode"
          titre="Comment se déroule une intervention Groupe Nanei"
          intro="Quatre étapes simples, du premier échange jusqu'au suivi quotidien sur le terrain."
          scinde
        />

        <div ref={refListe} className="etapes-cadre">
          <div className={`etapes-ligne ${listeVisible ? 'etapes-ligne--visible' : ''}`} aria-hidden="true">
            <span />
          </div>
          <ol className="etapes">
            {ETAPES.map((etape, i) => (
              <Apparition as="li" key={etape.titre} delai={200 + i * 180} className="etape">
                <span className="etape-numero" aria-hidden="true">{numeroter(i)}</span>
                <h3>{etape.titre}</h3>
                <p>{etape.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
