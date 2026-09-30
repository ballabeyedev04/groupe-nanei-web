import { useDevisModal } from '../../context/DevisModalContext';
import Apparition from '../ui/Apparition';

// Contenu du cahier §5 "Pourquoi choisir Groupe Nanei ?" — repris tel quel,
// y compris la numérotation 01 à 05.
const POINTS = [
  { n: '01', titre: 'Sécurité en priorité', texte: 'Des procédures claires, des accès maîtrisés et une vigilance quotidienne.' },
  { n: '02', titre: 'Organisation sur mesure', texte: 'Une méthode adaptée à la taille, aux contraintes et au rythme de chaque chantier.' },
  { n: '03', titre: 'Réactivité terrain', texte: 'Une présence opérationnelle pour gérer les besoins et imprévus au quotidien.' },
  { n: '04', titre: 'Chantier propre', texte: 'Une attention constante portée aux circulations, déchets et zones communes.' },
  { n: '05', titre: 'Interlocuteur fiable', texte: "Un suivi professionnel et une communication claire avec l'encadrement du chantier." },
];

export default function PourquoiChoisir() {
  const { ouvrir } = useDevisModal();

  return (
    <section id="engagements" style={{ padding: '72px 0' }}>
      <div className="conteneur" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'start' }}>
        <div>
          <Apparition>
            <span className="etiquette-section">Pourquoi choisir Groupe Nanei ?</span>
            <h2 className="titre-section">Une équipe dédiée à la performance de vos opérations</h2>
            <p style={{ color: 'var(--texte-doux)', fontSize: 15.5, lineHeight: 1.65, marginBottom: 32, maxWidth: 620 }}>
              Nous mettons en place une organisation claire, adaptée à la configuration du chantier et à ses
              différentes phases. Nos logisticiens travaillent au contact des équipes travaux, des sous-traitants,
              des transporteurs et des responsables du site pour assurer une circulation fluide de l'information et
              des flux.
            </p>
          </Apparition>

          <div style={{ display: 'grid', gap: 6 }}>
            {POINTS.map((p, i) => (
              <Apparition key={p.n} delai={i * 90} effet="gauche" className="point-engagement" style={{ display: 'flex', gap: 18 }}>
                <span className="numero-degrade" style={{ fontSize: 26, fontWeight: 800, width: 44, flexShrink: 0, lineHeight: 1.1 }}>{p.n}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--bleu-marine)' }}>{p.titre}</div>
                  <div style={{ fontSize: 14, color: 'var(--texte-doux)' }}>{p.texte}</div>
                </div>
              </Apparition>
            ))}
          </div>
        </div>

        <Apparition
          delai={150}
          effet="droite"
          style={{
            overflow: 'hidden',
            background: 'linear-gradient(145deg, var(--bleu-action), var(--bleu-marine))',
            boxShadow: '0 24px 50px rgba(10, 94, 168, 0.3)',
            borderRadius: 'var(--rayon)',
            padding: '34px 30px',
            color: '#fff',
            position: 'sticky',
            top: 100,
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: 21, fontWeight: 800, lineHeight: 1.3 }}>
            Vous avez un chantier à organiser&nbsp;? Parlons de vos besoins.
          </h3>
          <p style={{ color: '#DCEEFF', fontSize: 14.5, lineHeight: 1.6, marginBottom: 24 }}>
            Groupe Nanei étudie votre organisation, vos contraintes d'accès, vos flux et vos besoins logistiques
            afin de vous proposer une solution adaptée.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button type="button" onClick={ouvrir} className="bouton" style={{ background: '#fff', color: 'var(--bleu-action)', justifyContent: 'center' }}>
              Demander un devis
            </button>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bouton bouton--contour"
              style={{ justifyContent: 'center' }}
            >
              Nous contacter
            </a>
          </div>
        </Apparition>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #engagements .conteneur { grid-template-columns: 1fr !important; }
          #engagements .conteneur > div:last-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
