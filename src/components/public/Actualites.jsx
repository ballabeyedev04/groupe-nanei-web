import Apparition from '../ui/Apparition';

// Le cahier prévoit "Actualités" dans le menu principal (§2) sans fournir de
// contenu à publier. Plutôt qu'inventer de fausses actualités, la section
// existe (cohérence du menu, promesse d'un site qui vivra dans le temps)
// mais annonce honnêtement l'absence de contenu pour l'instant.
export default function Actualites() {
  return (
    <section id="actualites" style={{ padding: '72px 0' }}>
      <div className="conteneur">
        <Apparition style={{ marginBottom: 32, maxWidth: 640 }}>
          <span className="etiquette-section">Actualités</span>
          <h2 className="titre-section">Ce qui se passe chez Groupe Nanei</h2>
        </Apparition>

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
              d'expérience et actualités de l'équipe. Pour toute question dès maintenant, contactez-nous directement.
            </p>
          </div>
        </Apparition>
      </div>
    </section>
  );
}
