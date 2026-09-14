import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { creerActualite, modifierActualite } from '../../service/actualiteService';
import { erreur as afficherErreur } from '../../utils/swal';

const styleChamp = {
  width: '100%', padding: '11px 13px', borderRadius: 10, border: '1px solid var(--bordure)',
  fontSize: 14.5, fontFamily: 'inherit',
};
const styleLabel = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 };

function dateEnValeurInput(date) {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().slice(0, 10);
}

// Sert à la fois pour la création et la modification — `actualite` non nul
// pré-remplit le formulaire et bascule les libellés/l'appel API en mode édition.
export default function ActualiteFormModal({ actualite, ouvert, onFermer, onEnregistree }) {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [publieLe, setPublieLe] = useState(dateEnValeurInput());
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    // Réinitialise le formulaire à chaque ouverture (création ou édition) —
    // ne dépend que des props `ouvert`/`actualite`, jamais de son propre
    // état : pas de risque de boucle de rendu malgré ce que suppose la règle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitre(actualite?.titre || '');
    setContenu(actualite?.contenu || '');
    setPublieLe(dateEnValeurInput(actualite?.publieLe));
  }, [ouvert, actualite]);

  async function soumettre(e) {
    e.preventDefault();
    setEnvoi(true);
    const valeurs = { titre, contenu, publieLe: new Date(publieLe).toISOString() };
    try {
      const resultat = actualite
        ? await modifierActualite(actualite.id, valeurs)
        : await creerActualite(valeurs);
      onEnregistree(resultat);
    } catch (err) {
      afficherErreur({ titre: "Échec de l'enregistrement", texte: err?.response?.data?.message || 'Merci de réessayer.' });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <Modal ouvert={ouvert} onFermer={onFermer} titre={actualite ? "Modifier l'actualité" : 'Ajouter une actualité'} largeur={560}>
      <form onSubmit={soumettre} style={{ display: 'grid', gap: 16 }}>
        <div>
          <label style={styleLabel} htmlFor="actu-titre">Titre *</label>
          <input id="actu-titre" required maxLength={200} style={styleChamp} value={titre} onChange={(e) => setTitre(e.target.value)} />
        </div>
        <div>
          <label style={styleLabel} htmlFor="actu-date">Date de publication</label>
          <input id="actu-date" type="date" style={styleChamp} value={publieLe} onChange={(e) => setPublieLe(e.target.value)} />
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--texte-doux)' }}>
            Une date future n'apparaît pas encore sur le site — pratique pour préparer une actualité à l'avance.
          </p>
        </div>
        <div>
          <label style={styleLabel} htmlFor="actu-contenu">Contenu *</label>
          <textarea
            id="actu-contenu"
            required
            minLength={2}
            maxLength={10000}
            rows={7}
            style={{ ...styleChamp, resize: 'vertical' }}
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
          />
        </div>
        <button type="submit" disabled={envoi} className="bouton bouton--plein" style={{ justifyContent: 'center' }}>
          {envoi ? 'Enregistrement…' : actualite ? 'Enregistrer les modifications' : "Publier l'actualité"}
        </button>
      </form>
    </Modal>
  );
}
