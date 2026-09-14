import { useEffect, useState } from 'react';
import { useDevisModal } from '../../context/DevisModalContext';
import { COORDONNEES } from '../../utils/coordonnees';
import { obtenirCoordonneesPubliques } from '../../service/coordonneesService';
import Apparition from '../ui/Apparition';

function LignePlaceholder({ children, present }) {
  return <span style={{ opacity: present ? 1 : 0.65, fontStyle: present ? 'normal' : 'italic' }}>{children}</span>;
}

export default function ContactSection() {
  const { ouvrir } = useDevisModal();
  // Valeurs par défaut = coordonnees.js (placeholders "à renseigner") tant
  // que l'appel réseau n'a pas répondu ou que rien n'est encore configuré
  // côté admin — jamais un flash de contenu vide.
  const [coordonnees, setCoordonnees] = useState({ telephone: COORDONNEES.telephone, email: COORDONNEES.email, adresse: '' });

  useEffect(() => {
    obtenirCoordonneesPubliques()
      .then((c) => setCoordonnees({ telephone: c.telephone || '', email: c.email || '', adresse: c.adresse || '' }))
      .catch(() => {}); // silencieux : les placeholders restent affichés
  }, []);

  return (
    <section id="contact" style={{ background: 'var(--bleu-marine)', padding: '56px 0' }}>
      <div
        className="conteneur"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Apparition style={{ maxWidth: 460 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: '#fff' }}>Discutons de votre projet</h2>
          <p style={{ margin: 0, color: '#CFEAFF', lineHeight: 1.6 }}>
            Notre équipe est à votre écoute pour vous proposer une solution adaptée à vos besoins.
          </p>
          <button type="button" onClick={ouvrir} className="bouton bouton--plein" style={{ marginTop: 20 }}>
            Demander un devis →
          </button>
        </Apparition>

        <Apparition delai={120} style={{ display: 'grid', gap: 12, color: '#fff', fontSize: 14.5 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>📞</span>
            <LignePlaceholder present={!!coordonnees.telephone}>
              {coordonnees.telephone || 'Téléphone à renseigner'}
            </LignePlaceholder>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>✉️</span>
            <LignePlaceholder present={!!coordonnees.email}>
              {coordonnees.email || 'E-mail à renseigner'}
            </LignePlaceholder>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>📍</span>
            {/* L'adresse précise (si configurée) prend le pas sur la zone
                d'intervention générique — les deux ne sont jamais affichées
                à vide en même temps. */}
            <LignePlaceholder present>{coordonnees.adresse || COORDONNEES.zoneIntervention}</LignePlaceholder>
          </div>
        </Apparition>
      </div>
    </section>
  );
}
