import collageImg from '../../assets/img/collage-services.jpg';
import equipeImg from '../../assets/img/equipe.jpg';
import equipeTabletteImg from '../../assets/img/equipe-tablette.jpg';
import gestionBennesImg from '../../assets/img/gestion-bennes.jpg';
import tracabiliteImg from '../../assets/img/tracabilite.jpg';

// Le cahier §9 fournit une galerie de visuels de marque plutôt que des
// couples avant/après chantier par chantier (aucun chantier nommé n'a été
// validé pour publication — cahier §8 : "ne pas publier [...] de références
// clients fictifs"). On les présente donc comme des scènes de terrain,
// légendées par type d'intervention plutôt que par nom de client.
const PHOTOS = [
  { src: collageImg, legende: "Suivi des bennes, organisation des flux et esprit d'équipe" },
  { src: gestionBennesImg, legende: 'Contrôle et traçabilité des bennes de chantier' },
  { src: equipeTabletteImg, legende: 'Coordination des équipes au contact du terrain' },
  { src: equipeImg, legende: 'Communication et sécurité entre logisticiens' },
  { src: tracabiliteImg, legende: 'Suivi et traçabilité des interventions' },
];

export default function Realisations() {
  return (
    <section id="realisations" style={{ padding: '72px 0', background: 'var(--bleu-ciel-clair)' }}>
      <div className="conteneur">
        <div style={{ marginBottom: 36, maxWidth: 640 }}>
          <span className="etiquette-section">Nos réalisations en images</span>
          <h2 className="titre-section">Groupe Nanei sur le terrain</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
          {PHOTOS.map((p) => (
            <figure key={p.src} style={{ margin: 0, borderRadius: 'var(--rayon)', overflow: 'hidden', background: '#fff', boxShadow: 'var(--ombre)' }}>
              <img src={p.src} alt={p.legende} loading="lazy" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <figcaption style={{ padding: '12px 16px', fontSize: 13.5, color: 'var(--texte-doux)' }}>{p.legende}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
