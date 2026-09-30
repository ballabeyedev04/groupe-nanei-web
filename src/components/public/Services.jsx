import Apparition from '../ui/Apparition';

// Les 8 services et leurs textes proviennent du cahier §4 "Nos services -
// textes complets", repris mot pour mot.
const SERVICES = [
  {
    titre: 'Gestion des bennes',
    texte: "Mise en place et suivi des bennes, organisation des rotations, contrôle du remplissage, coordination des enlèvements et maintien des zones de déchets propres et accessibles.",
    icone: (
      <path d="M4 8h16l-2 11H6L4 8Zm2-4h12l1 4H5l1-4Z" />
    ),
  },
  {
    titre: 'Gestion du trafic chantier',
    texte: "Organisation des entrées et sorties de véhicules, guidage des camions et engins, régulation des circulations, gestion des zones d'attente et prévention des conflits de flux.",
    icone: <path d="M12 3v4m0 10v4M4.2 7 7 9.2M17 14.8l2.8 2.2M4.2 17 7 14.8M17 9.2l2.8-2.2M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />,
  },
  {
    titre: 'Réception des colis et livraisons',
    texte: 'Accueil des transporteurs, contrôle des livraisons, enregistrement, orientation vers les zones prévues, coordination avec les équipes concernées et suivi des colis reçus.',
    icone: <path d="M4 7 12 3l8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4M12 11v10" />,
  },
  {
    titre: 'Ouverture et fermeture des portes',
    texte: 'Gestion des accès selon les horaires du chantier, ouverture et fermeture des portails et portes, contrôle des entrées et signalement des anomalies.',
    icone: <path d="M6 3h9v18H6V3Zm9 0 6 3v15l-6-3M13 12v0.01" />,
  },
  {
    titre: 'Sécurité logistique du chantier',
    texte: 'Contrôle des accès, application des consignes du site, surveillance des zones logistiques, remontée des situations à risque et soutien à la prévention des incidents.',
    icone: <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-2.5 9.5 1.8 1.8L15.5 9" />,
  },
  {
    titre: 'Nettoyage et entretien',
    texte: "Nettoyage des circulations et zones communes, évacuation des déchets, maintien des accès dégagés et contribution à un chantier propre, organisé et professionnel.",
    icone: <path d="M15 3 9 9m0 0-4 10 5-2 8-8m-9 0 5 5M5 21l1-4" />,
  },
  {
    titre: 'Gestion des flux piétons',
    texte: 'Organisation des cheminements, maintien des passages libres, signalisation des zones sensibles et accompagnement des visiteurs ou intervenants lorsque nécessaire.',
    icone: <path d="M12 5.5a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM9 22l1.4-6.2L9 13l1-4.5L13 10l1 3-1.4 2 1.4 7" />,
  },
  {
    titre: 'Gestion des zones de stockage',
    texte: "Organisation et repérage des espaces de stockage, optimisation de l'occupation, maintien des accès et coordination avec les entreprises pour éviter l'encombrement.",
    icone: <path d="M3 9 12 4l9 5M4 10.5V20h16v-9.5M9 20v-6h6v6" />,
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '72px 0', background: 'var(--bleu-ciel-clair)' }}>
      <div className="conteneur">
        <Apparition style={{ marginBottom: 40, maxWidth: 640 }}>
          <span className="etiquette-section">Nos services</span>
          <h2 className="titre-section">Une solution complète pour la gestion de vos chantiers</h2>
        </Apparition>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
          {SERVICES.map((s, i) => (
            <Apparition key={s.titre} delai={(i % 4) * 90} effet="zoom">
              <div
                className="carte-animee carte-service"
                style={{
                  background: 'var(--blanc)',
                  borderRadius: 'var(--rayon)',
                  padding: '26px 24px',
                  boxShadow: 'var(--ombre)',
                  height: '100%',
                }}
              >
                <span
                  className="icone-service"
                  style={{
                    width: 48, height: 48, borderRadius: 12, background: 'var(--bleu-ciel-clair)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A5EA8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {s.icone}
                  </svg>
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: 16.5, fontWeight: 700, color: 'var(--bleu-marine)' }}>{s.titre}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--texte-doux)', lineHeight: 1.6 }}>{s.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </div>
    </section>
  );
}
