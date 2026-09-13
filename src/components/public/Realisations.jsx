import collageImg from '../../assets/img/collage-services.jpg';
import equipeImg from '../../assets/img/equipe.jpg';
import equipeTabletteImg from '../../assets/img/equipe-tablette.jpg';
import gestionBennesImg from '../../assets/img/gestion-bennes.jpg';
import tracabiliteImg from '../../assets/img/tracabilite.jpg';
import Apparition from '../ui/Apparition';

// Le cahier §9 fournit une galerie de visuels de marque plutôt que des
// couples avant/après chantier par chantier (aucun chantier nommé n'a été
// validé pour publication — cahier §8 : "ne pas publier [...] de références
// clients fictifs"). Les légendes reprennent le vocabulaire du §7 "Plan des
// images à prévoir" plutôt que d'inventer des noms de chantiers ou de clients.
const PHOTOS = [
  { src: collageImg, legende: "Suivi des bennes, organisation des flux et esprit d'équipe", type: 'Gestion des bennes · Gestion du trafic' },
  { src: gestionBennesImg, legende: 'Logisticien coordonnant une benne de chantier, zone propre et signalisation visible', type: 'Gestion des bennes' },
  { src: equipeTabletteImg, legende: 'Logisticiens Groupe Nanei coordonnant leurs interventions sur chantier', type: 'Organisation & sécurité logistique' },
  { src: equipeImg, legende: '2 à 5 logisticiens Groupe Nanei en EPI réunis sur chantier, esprit d’équipe', type: 'Esprit d’équipe' },
  { src: tracabiliteImg, legende: 'Suivi et traçabilité des bennes de chantier', type: 'Gestion des bennes' },
];

export default function Realisations() {
  return (
    <section id="realisations" style={{ padding: '72px 0', background: 'var(--bleu-ciel-clair)' }}>
      <div className="conteneur">
        <Apparition style={{ marginBottom: 36, maxWidth: 640 }}>
          <span className="etiquette-section">Nos réalisations en images</span>
          <h2 className="titre-section">Groupe Nanei sur le terrain</h2>
        </Apparition>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
          {PHOTOS.map((p, i) => (
            <Apparition key={p.src} delai={(i % 4) * 80}>
              <figure
                className="carte-animee image-zoom"
                style={{ margin: 0, borderRadius: 'var(--rayon)', overflow: 'hidden', background: '#fff', boxShadow: 'var(--ombre)' }}
              >
                <img src={p.src} alt={p.legende} loading="lazy" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <figcaption style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--bleu-action)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>
                    {p.type}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--texte-doux)', lineHeight: 1.45 }}>{p.legende}</div>
                </figcaption>
              </figure>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  );
}
