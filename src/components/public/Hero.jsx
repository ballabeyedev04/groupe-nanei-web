import heroImg from '../../assets/img/hero.jpg';
import { useDevisModal } from '../../context/DevisModalContext';

// Texte repris mot pour mot du cahier §3 "Bannière principale / Hero".
export default function Hero() {
  const { ouvrir } = useDevisModal();

  return (
    <section id="accueil" style={{ background: 'linear-gradient(180deg, var(--bleu-ciel-clair), #fff 85%)' }}>
      <div
        className="conteneur"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 48,
          alignItems: 'center',
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        <div>
          <span className="etiquette-section">Logistique de chantier</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.2vw, 46px)', fontWeight: 800, color: 'var(--bleu-marine)', lineHeight: 1.12, margin: '0 0 18px' }}>
            La logistique au service de vos chantiers
          </h1>
          <p style={{ fontSize: 17, color: 'var(--texte-doux)', lineHeight: 1.65, maxWidth: 520, margin: '0 0 30px' }}>
            Groupe Nanei accompagne les entreprises du BTP dans l'organisation quotidienne de leurs chantiers.
            Nous coordonnons les flux, les accès, les livraisons, les bennes, la propreté et la sécurité
            logistique afin de rendre vos opérations plus fluides, plus sûres et plus performantes.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#services" className="bouton bouton--contour-bleu" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Découvrir nos services
            </a>
            <button type="button" onClick={ouvrir} className="bouton bouton--plein">
              Demander un devis →
            </button>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <img
            src={heroImg}
            alt="Logisticien Groupe Nanei coordonnant la circulation sur un chantier"
            loading="eager"
            style={{ width: '100%', borderRadius: 'var(--rayon)', boxShadow: 'var(--ombre)', aspectRatio: '4/3.4', objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
