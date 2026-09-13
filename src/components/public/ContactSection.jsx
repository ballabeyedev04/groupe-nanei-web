import { useDevisModal } from '../../context/DevisModalContext';
import { COORDONNEES } from '../../utils/coordonnees';
import Apparition from '../ui/Apparition';

function LignePlaceholder({ children, present }) {
  return <span style={{ opacity: present ? 1 : 0.65, fontStyle: present ? 'normal' : 'italic' }}>{children}</span>;
}

export default function ContactSection() {
  const { ouvrir } = useDevisModal();

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
            <LignePlaceholder present={!!COORDONNEES.telephone}>
              {COORDONNEES.telephone || 'Téléphone à renseigner'}
            </LignePlaceholder>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>✉️</span>
            <LignePlaceholder present={!!COORDONNEES.email}>
              {COORDONNEES.email || 'E-mail à renseigner'}
            </LignePlaceholder>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>📍</span>
            <LignePlaceholder present>{COORDONNEES.zoneIntervention}</LignePlaceholder>
          </div>
        </Apparition>
      </div>
    </section>
  );
}
