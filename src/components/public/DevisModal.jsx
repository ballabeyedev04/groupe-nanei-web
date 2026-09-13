import { useState } from 'react';
import Modal from '../ui/Modal';
import { envoyerDemandeDevis } from '../../service/devisService';

const TYPES_BESOIN = [
  'Gestion des bennes',
  'Gestion du trafic chantier',
  'Réception des colis et livraisons',
  'Ouverture et fermeture des portes',
  'Sécurité logistique du chantier',
  'Nettoyage et entretien',
  'Gestion des flux piétons',
  'Gestion des zones de stockage',
  'Autre besoin',
];

const VIDE = {
  nom: '', societe: '', telephone: '', email: '', ville: '', typeBesoin: '', message: '',
  consentementRgpd: false, site_web: '',
};

const styleChamp = {
  width: '100%', padding: '11px 13px', borderRadius: 10, border: '1px solid var(--bordure)',
  fontSize: 14.5, fontFamily: 'inherit', color: 'var(--texte)', background: '#fff',
};
const styleLabel = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 };

export default function DevisModal({ ouvert, onFermer }) {
  const [valeurs, setValeurs] = useState(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [statut, setStatut] = useState(null); // { type: 'succes' | 'erreur', message }

  function champ(nom) {
    return {
      value: valeurs[nom],
      onChange: (e) => setValeurs((v) => ({ ...v, [nom]: e.target.value })),
    };
  }

  function fermerEtReinitialiser() {
    onFermer();
    setTimeout(() => {
      setValeurs(VIDE);
      setStatut(null);
    }, 200);
  }

  async function soumettre(e) {
    e.preventDefault();
    if (!valeurs.consentementRgpd) {
      setStatut({ type: 'erreur', message: 'Merci de confirmer votre consentement pour être recontacté.' });
      return;
    }
    setEnvoi(true);
    setStatut(null);
    try {
      await envoyerDemandeDevis(valeurs);
      setStatut({ type: 'succes', message: 'Votre demande a bien été envoyée. Notre équipe revient vers vous rapidement.' });
      setValeurs(VIDE);
    } catch (err) {
      const message = err?.response?.data?.message || "L'envoi a échoué. Merci de réessayer dans un instant.";
      setStatut({ type: 'erreur', message });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <Modal ouvert={ouvert} onFermer={fermerEtReinitialiser} titre="Demander un devis" largeur={560}>
      {statut?.type === 'succes' ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <p style={{ color: 'var(--texte)', fontSize: 15.5, lineHeight: 1.6 }}>{statut.message}</p>
          <button type="button" onClick={fermerEtReinitialiser} className="bouton bouton--plein" style={{ marginTop: 10 }}>
            Fermer
          </button>
        </div>
      ) : (
        <form onSubmit={soumettre} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <div>
              <label style={styleLabel} htmlFor="devis-nom">Nom *</label>
              <input id="devis-nom" required maxLength={150} style={styleChamp} {...champ('nom')} />
            </div>
            <div>
              <label style={styleLabel} htmlFor="devis-societe">Société</label>
              <input id="devis-societe" maxLength={150} style={styleChamp} {...champ('societe')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={styleLabel} htmlFor="devis-telephone">Téléphone *</label>
              <input id="devis-telephone" type="tel" required maxLength={30} style={styleChamp} {...champ('telephone')} />
            </div>
            <div>
              <label style={styleLabel} htmlFor="devis-email">E-mail *</label>
              <input id="devis-email" type="email" required maxLength={255} style={styleChamp} {...champ('email')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={styleLabel} htmlFor="devis-ville">Ville / chantier</label>
              <input id="devis-ville" maxLength={150} style={styleChamp} {...champ('ville')} />
            </div>
            <div>
              <label style={styleLabel} htmlFor="devis-type">Type de besoin</label>
              <select id="devis-type" style={styleChamp} {...champ('typeBesoin')}>
                <option value="">Sélectionner…</option>
                {TYPES_BESOIN.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={styleLabel} htmlFor="devis-message">Votre message *</label>
            <textarea
              id="devis-message"
              required
              minLength={5}
              maxLength={4000}
              rows={4}
              style={{ ...styleChamp, resize: 'vertical' }}
              {...champ('message')}
            />
          </div>

          {/* Piège anti-spam : invisible et hors du flux de tabulation pour un
              visiteur humain, mais présent dans le DOM pour un robot qui
              remplit tous les champs sans exécuter le CSS. */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <label htmlFor="devis-site-web">Ne pas remplir ce champ</label>
            <input id="devis-site-web" tabIndex={-1} autoComplete="off" {...champ('site_web')} />
          </div>

          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--texte-doux)' }}>
            <input
              type="checkbox"
              checked={valeurs.consentementRgpd}
              onChange={(e) => setValeurs((v) => ({ ...v, consentementRgpd: e.target.checked }))}
              style={{ marginTop: 3 }}
              required
            />
            J'accepte que mes informations soient utilisées par Groupe Nanei pour me recontacter au sujet de ma
            demande, conformément à la politique de confidentialité. *
          </label>

          {statut?.type === 'erreur' && (
            <p style={{ margin: 0, color: 'var(--erreur)', fontSize: 13.5 }}>{statut.message}</p>
          )}

          <button type="submit" disabled={envoi} className="bouton bouton--plein" style={{ justifyContent: 'center' }}>
            {envoi ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </button>
        </form>
      )}
    </Modal>
  );
}
