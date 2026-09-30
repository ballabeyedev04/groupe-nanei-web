import bennesImg from '../../assets/img/bennes.webp';
import equipeTabletteImg from '../../assets/img/equipe-tablette.webp';
import tracabiliteImg from '../../assets/img/tracabilite.webp';
import EnTeteSection from '../ui/EnTeteSection';
import Apparition from '../ui/Apparition';

// Aucun chantier nommé n'a été validé pour publication (cahier §8 : "ne pas
// publier [...] de références clients fictifs") : les légendes décrivent
// les situations de terrain, sans inventer de noms de chantiers ou de
// clients. L'ordre compte : la mosaïque (index.css) donne au 1er visuel le
// grand format. Chaque photo n'apparaît qu'une fois sur la page.
const PHOTOS = [
  { src: equipeTabletteImg, l: 1400, h: 606, type: 'Coordination', legende: 'Point d’équipe avant le lancement des rotations de bennes' },
  { src: bennesImg, l: 1200, h: 960, type: 'Gestion des bennes', legende: 'Contrôle du remplissage et maintien d’une zone déchets propre' },
  { src: tracabiliteImg, l: 815, h: 484, type: 'Traçabilité', legende: 'Suivi des bennes : emplacement, statut et date d’enlèvement' },
];

export default function Realisations() {
  return (
    <section id="realisations" className="section section--papier" aria-labelledby="titre-realisations">
      <div className="conteneur">
        <EnTeteSection
          id="titre-realisations"
          etiquette="Sur le terrain"
          titre="Groupe Nanei, au quotidien sur vos chantiers"
          intro="Coordination des équipes, gestion des bennes, traçabilité : un aperçu du travail de nos logisticiens sur site."
          scinde
        />

        <div className="mosaique">
          {PHOTOS.map((p, i) => (
            <Apparition as="figure" devoilement key={p.legende} delai={(i % 3) * 100} className="mosaique-element">
              <img src={p.src} alt={p.legende} loading="lazy" width={p.l} height={p.h} />
              <figcaption>
                <span>{p.type}</span>
                <p>{p.legende}</p>
              </figcaption>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  );
}
