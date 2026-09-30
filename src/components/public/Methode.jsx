import useEnVue from '../../hooks/useEnVue';
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

// Section sombre (bleu marine) pour rythmer la page entre deux sections
// claires ; la ligne qui relie les étapes se trace à l'entrée dans l'écran.
export default function Methode() {
  const [refLigne, ligneVisible] = useEnVue({ seuil: 0.4 });

  return (
    <section id="methode" className="methode" style={{ padding: '84px 0' }}>
      <div className="conteneur" style={{ position: 'relative' }}>
        <Apparition style={{ marginBottom: 48, maxWidth: 640 }}>
          <span className="etiquette-section" style={{ color: 'var(--bleu-ciel)' }}>Notre méthode</span>
          <h2 className="titre-section" style={{ color: '#fff' }}>Comment se déroule une intervention Groupe Nanei</h2>
        </Apparition>

        <div ref={refLigne} className="methode-grille" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          <div className={`methode-ligne ${ligneVisible ? 'methode-ligne--visible' : ''}`} aria-hidden="true">
            <span />
          </div>

          {ETAPES.map((etape, i) => (
            <Apparition key={etape.n} delai={300 + i * 250} className="etape" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span
                className="etape-numero"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4fb3ff, var(--bleu-action))',
                  color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 18,
                  marginLeft: 'calc(50% - 22px)',
                }}
              >
                {etape.n}
              </span>
              <div className="etape-carte" style={{ borderRadius: 'var(--rayon)', padding: '24px 22px', flex: 1, width: '100%' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#fff' }}>{etape.titre}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: '#CFEAFF', lineHeight: 1.6 }}>{etape.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </div>

      <style>{`
        #methode .etiquette-section::before { background: var(--bleu-ciel); }
        @media (max-width: 980px) {
          .methode-grille { grid-template-columns: repeat(2, 1fr) !important; }
          .methode-ligne { display: none; }
        }
        @media (max-width: 560px) {
          .methode-grille { grid-template-columns: 1fr !important; }
          .etape-numero { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
