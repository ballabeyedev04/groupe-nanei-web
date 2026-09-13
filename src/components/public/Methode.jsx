import Apparition from '../ui/Apparition';

// Reformulation en étapes du fonctionnement déjà décrit dans le cahier
// (§5 "Pourquoi choisir Groupe Nanei" et le bloc d'appel à l'action) — aucune
// nouvelle promesse, juste une présentation plus lisible du déroulé réel.
const ETAPES = [
  {
    n: '1',
    titre: 'Vous nous présentez votre chantier',
    texte: "Vos contraintes d'accès, vos flux et vos besoins logistiques — par le formulaire de devis ou par téléphone.",
  },
  {
    n: '2',
    titre: 'Nous étudions votre organisation',
    texte: 'Configuration du site, phases du chantier, contraintes de circulation : nous cernons précisément vos besoins.',
  },
  {
    n: '3',
    titre: 'Nous vous proposons une solution sur mesure',
    texte: "Une méthode adaptée à la taille, aux contraintes et au rythme de votre chantier — pas une offre standardisée.",
  },
  {
    n: '4',
    titre: 'Nos logisticiens interviennent et assurent le suivi',
    texte: 'Présence opérationnelle sur site, communication claire avec votre encadrement, adaptation aux imprévus.',
  },
];

export default function Methode() {
  return (
    <section id="methode" style={{ padding: '72px 0', background: 'var(--bleu-ciel-clair)' }}>
      <div className="conteneur">
        <Apparition style={{ marginBottom: 40, maxWidth: 640 }}>
          <span className="etiquette-section">Notre méthode</span>
          <h2 className="titre-section">Comment se déroule une intervention Groupe Nanei</h2>
        </Apparition>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 22 }}>
          {ETAPES.map((etape, i) => (
            <Apparition key={etape.n} delai={i * 90}>
              <div
                className="carte-animee"
                style={{ background: '#fff', borderRadius: 'var(--rayon)', padding: '26px 22px', boxShadow: 'var(--ombre)', height: '100%' }}
              >
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: '50%', background: 'var(--bleu-action)',
                    color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 16,
                  }}
                >
                  {etape.n}
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: 'var(--bleu-marine)' }}>{etape.titre}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--texte-doux)', lineHeight: 1.6 }}>{etape.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  );
}
