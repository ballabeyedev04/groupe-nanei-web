import aboutImg from '../../assets/img/about.jpg';
import Apparition from '../ui/Apparition';
import { COORDONNEES } from '../../utils/coordonnees';

// Contenu repris du cahier §3 "À propos de Groupe Nanei" — titre, texte de
// présentation, promesse, et les 5 valeurs avec leurs pictogrammes.
const VALEURS = [
  { titre: 'Sécurité', texte: 'Respect des consignes, contrôle des accès et prévention des risques.' },
  { titre: 'Organisation', texte: 'Coordination méthodique des flux, zones et interventions.' },
  { titre: 'Réactivité', texte: 'Une équipe disponible pour répondre aux imprévus du chantier.' },
  { titre: 'Propreté', texte: "Maintien d'espaces propres et circulables." },
  { titre: 'Engagement', texte: "Respect des équipes, des délais et de l'environnement." },
];

function IconeValeur() {
  return (
    <span
      className="icone-valeur"
      style={{
        width: 40, height: 40, borderRadius: 10, background: 'var(--bleu-ciel-clair)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z" stroke="#0A5EA8" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function About() {
  return (
    <section id="a-propos" style={{ padding: '72px 0' }}>
      <div className="conteneur">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 48, alignItems: 'center', marginBottom: 44 }}>
          <Apparition effet="gauche">
            <span className="etiquette-section">À propos de Groupe Nanei</span>
            <h2 className="titre-section">Un partenaire de confiance pour vos chantiers</h2>
            <p style={{ fontSize: 16, color: 'var(--texte-doux)', lineHeight: 1.7 }}>
              Groupe Nanei est spécialisé dans la logistique de chantier et l'accompagnement opérationnel des
              entreprises du BTP. Nos équipes interviennent pour organiser les flux, réceptionner et orienter les
              livraisons, gérer les accès, assurer le suivi des bennes, maintenir la propreté des zones de travail
              et contribuer à la sécurisation du site. Notre priorité est simple&nbsp;: permettre aux équipes
              travaux de se concentrer sur leur métier pendant que nous assurons une logistique rigoureuse,
              réactive et adaptée aux contraintes du chantier.
            </p>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 6,
                background: 'var(--bleu-ciel-clair)', color: 'var(--bleu-marine)', fontWeight: 600, fontSize: 13.5,
                padding: '8px 14px', borderRadius: 999,
              }}
            >
              📍 Intervention : {COORDONNEES.zoneIntervention}
            </span>
          </Apparition>
          <Apparition delai={120} effet="droite" className="image-zoom" style={{ borderRadius: 'var(--rayon)', boxShadow: 'var(--ombre)' }}>
            <img
              src={aboutImg}
              alt="Logisticien Groupe Nanei consultant une tablette sur un chantier"
              loading="lazy"
              style={{ width: '100%', aspectRatio: '4/3.2', objectFit: 'cover' }}
            />
          </Apparition>
        </div>

        <Apparition effet="zoom">
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(120deg, var(--bleu-marine), var(--bleu-marine-clair))',
              borderRadius: 'var(--rayon)',
              padding: '30px 34px',
              color: '#fff',
              marginBottom: 44,
            }}
          >
            <div className="hero-bulle" style={{ width: 260, height: 260, background: '#1f7fd1', top: -120, right: -60, opacity: 0.45 }} />
            <span style={{ position: 'relative', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--bleu-ciel)' }}>NOTRE PROMESSE</span>
            <h3 style={{ position: 'relative', margin: '8px 0 10px', fontSize: 22, fontWeight: 800 }}>
              Des chantiers mieux organisés, plus sûrs et plus efficaces.
            </h3>
            <p style={{ position: 'relative', margin: 0, color: '#DCEEFF', lineHeight: 1.65, maxWidth: 720 }}>
              Une logistique maîtrisée réduit les pertes de temps, limite les encombrements, améliore la circulation
              et contribue directement à la qualité d'exécution du chantier.
            </p>
          </div>
        </Apparition>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20 }}>
          {VALEURS.map((v, i) => (
            <Apparition key={v.titre} delai={i * 80} className="valeur" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'default' }}>
              <IconeValeur />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--bleu-marine)', marginBottom: 4 }}>{v.titre}</div>
                <div style={{ fontSize: 13.5, color: 'var(--texte-doux)', lineHeight: 1.5 }}>{v.texte}</div>
              </div>
            </Apparition>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #a-propos .conteneur > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
