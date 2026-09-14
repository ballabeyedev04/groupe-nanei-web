import { useEffect, useState } from 'react';
import Apparition from '../ui/Apparition';
import { listerActualitesPubliques } from '../../service/actualiteService';
import { formatDateCourte } from '../../utils/format';

// Le cahier prévoit "Actualités" dans le menu principal (§2). Tant que
// l'admin n'a rien publié (menu Actualités), la section reste honnête sur
// l'absence de contenu plutôt que d'inventer de fausses actualités — dès
// qu'une actualité existe côté admin, elle s'affiche ici automatiquement.
export default function Actualites() {
  const [actualites, setActualites] = useState(null); // null = chargement

  useEffect(() => {
    listerActualitesPubliques({ page: 1, limite: 6 })
      .then((data) => setActualites(data.items))
      .catch(() => setActualites([]));
  }, []);

  return (
    <section id="actualites" style={{ padding: '72px 0' }}>
      <div className="conteneur">
        <Apparition style={{ marginBottom: 32, maxWidth: 640 }}>
          <span className="etiquette-section">Actualités</span>
          <h2 className="titre-section">Ce qui se passe chez Groupe Nanei</h2>
        </Apparition>

        {actualites && actualites.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {actualites.map((a, i) => (
              <Apparition key={a.id} delai={(i % 3) * 80}>
                <article
                  className="carte-animee"
                  style={{ background: '#fff', borderRadius: 'var(--rayon)', padding: '24px 22px', boxShadow: 'var(--ombre)', height: '100%' }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--bleu-action)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                    {formatDateCourte(a.publieLe)}
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--bleu-marine)' }}>{a.titre}</h3>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--texte-doux)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {a.contenu}
                  </p>
                </article>
              </Apparition>
            ))}
          </div>
        ) : (
          actualites && (
            <Apparition>
              <div
                style={{
                  border: '1.5px dashed var(--bordure)', borderRadius: 'var(--rayon)',
                  padding: '38px 32px', textAlign: 'center', background: 'var(--bleu-ciel-clair)',
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 10 }}>📰</div>
                <h3 style={{ margin: '0 0 8px', fontSize: 17, color: 'var(--bleu-marine)', fontWeight: 700 }}>
                  Bientôt disponible
                </h3>
                <p style={{ margin: '0 auto', maxWidth: 460, color: 'var(--texte-doux)', fontSize: 14.5, lineHeight: 1.6 }}>
                  Retrouverez ici prochainement l'actualité de Groupe Nanei : nouveaux chantiers accompagnés, retours
                  d'expérience et actualités de l'équipe. Pour toute question dès maintenant, contactez-nous
                  directement.
                </p>
              </div>
            </Apparition>
          )
        )}
      </div>
    </section>
  );
}
