import { useState } from 'react';
import Modal from '../ui/Modal';
import PastillesBesoins from './PastillesBesoins';
import { repondreDevis } from '../../service/devisService';
import { formatDate } from '../../utils/format';

const styleLigne = { display: 'flex', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--bordure)', fontSize: 14 };
const styleLabel = { width: 140, color: 'var(--texte-doux)', flexShrink: 0 };

export default function DevisDetailModal({ devis, onFermer, onReponduAvecSucces }) {
  const [sujet, setSujet] = useState(devis ? `Votre demande de devis — Groupe Nanei` : '');
  const [message, setMessage] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  if (!devis) return null;

  const dejaTraite = devis.statut === 'traite';

  async function soumettre(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur('');
    try {
      const misAJour = await repondreDevis(devis.id, { sujet, message });
      onReponduAvecSucces(misAJour);
    } catch (err) {
      setErreur(err?.response?.data?.message || "L'envoi a échoué. Merci de réessayer.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <Modal ouvert={!!devis} onFermer={onFermer} titre="Demande de devis" largeur={620}>
      <div style={{ marginBottom: 20 }}>
        <div style={styleLigne}><span style={styleLabel}>Nom</span><strong>{devis.nom}</strong></div>
        {devis.societe && <div style={styleLigne}><span style={styleLabel}>Société</span>{devis.societe}</div>}
        <div style={styleLigne}><span style={styleLabel}>Téléphone</span><a href={`tel:${devis.telephone}`}>{devis.telephone}</a></div>
        <div style={styleLigne}><span style={styleLabel}>E-mail</span><a href={`mailto:${devis.email}`}>{devis.email}</a></div>
        {devis.ville && <div style={styleLigne}><span style={styleLabel}>Ville / chantier</span>{devis.ville}</div>}
        {devis.typesBesoin?.length > 0 && (
          <div style={{ ...styleLigne, alignItems: 'center' }}>
            <span style={styleLabel}>{devis.typesBesoin.length > 1 ? 'Besoins' : 'Besoin'}</span>
            <PastillesBesoins besoins={devis.typesBesoin} />
          </div>
        )}
        <div style={styleLigne}><span style={styleLabel}>Reçu le</span>{formatDate(devis.createdAt)}</div>
        <div style={{ padding: '14px 16px', background: 'var(--bleu-ciel-clair)', borderRadius: 10, marginTop: 10, whiteSpace: 'pre-wrap', fontSize: 14 }}>
          {devis.message}
        </div>
      </div>

      {dejaTraite && (
        <div style={{ padding: '14px 16px', background: '#EAF7EE', border: '1px solid #BFE3CB', borderRadius: 10, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: 'var(--succes)', marginBottom: 6 }}>
            ✅ Déjà répondu le {formatDate(devis.reponduLe)}
          </div>
          <div style={{ fontSize: 13, color: 'var(--texte-doux)', marginBottom: 4 }}>Objet : {devis.reponseSujet}</div>
          <div style={{ fontSize: 13.5, whiteSpace: 'pre-wrap' }}>{devis.reponseMessage}</div>
        </div>
      )}

      {/* Une demande traitée est close : on n'affiche plus que la réponse
          envoyée (encadré ci-dessus), plus de formulaire. */}
      {!dejaTraite && (
        <>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--bleu-marine)', marginBottom: 12 }}>
            Répondre par e-mail
          </h3>
          <form onSubmit={soumettre} style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 }}>Objet</label>
              <input
                value={sujet}
                onChange={(e) => setSujet(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 }}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14, resize: 'vertical' }}
              />
            </div>
            {erreur && <p style={{ margin: 0, color: 'var(--erreur)', fontSize: 13.5 }}>{erreur}</p>}
            <button type="submit" disabled={envoi} className="bouton bouton--plein" style={{ justifyContent: 'center' }}>
              {envoi ? 'Envoi en cours…' : 'Envoyer la réponse'}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
