import { useEffect, useState } from 'react';
import { obtenirCoordonnees, enregistrerCoordonnees, supprimerCoordonnees } from '../../service/coordonneesService';
import { succes, erreur as afficherErreur, confirmer } from '../../utils/swal';

const VIDE = { telephone: '', email: '', adresse: '' };

const styleChamp = {
  width: '100%', padding: '11px 13px', borderRadius: 10, border: '1px solid var(--bordure)',
  fontSize: 14.5, fontFamily: 'inherit',
};
const styleLabel = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 };

export default function CoordonneesPage() {
  const [valeurs, setValeurs] = useState(VIDE);
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);

  useEffect(() => {
    obtenirCoordonnees()
      .then((c) => {
        if (c) setValeurs({ telephone: c.telephone || '', email: c.email || '', adresse: c.adresse || '' });
      })
      .finally(() => setChargement(false));
  }, []);

  function champ(nom) {
    return { value: valeurs[nom], onChange: (e) => setValeurs((v) => ({ ...v, [nom]: e.target.value })) };
  }

  async function soumettre(e) {
    e.preventDefault();
    setEnregistrement(true);
    try {
      await enregistrerCoordonnees(valeurs);
      succes({ titre: 'Coordonnées enregistrées', texte: 'Le site vitrine affiche désormais ces informations.' });
    } catch (err) {
      afficherErreur({ titre: "Échec de l'enregistrement", texte: err?.response?.data?.message || 'Merci de réessayer.' });
    } finally {
      setEnregistrement(false);
    }
  }

  async function supprimer() {
    const ok = await confirmer({
      titre: 'Supprimer les coordonnées ?',
      texte: 'Le site vitrine affichera à nouveau "à renseigner" tant que vous ne les aurez pas ressaisies.',
      confirmButtonText: 'Supprimer',
    });
    if (!ok) return;
    try {
      await supprimerCoordonnees();
      setValeurs(VIDE);
      succes({ titre: 'Coordonnées supprimées' });
    } catch (err) {
      afficherErreur({ titre: 'Échec de la suppression', texte: err?.response?.data?.message || 'Merci de réessayer.' });
    }
  }

  if (chargement) return null;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--bleu-marine)', marginBottom: 6 }}>Coordonnées</h1>
      <p style={{ color: 'var(--texte-doux)', fontSize: 14, marginBottom: 24, maxWidth: 560 }}>
        Ces informations remplacent les placeholders « à renseigner » sur le site vitrine (section Contact et
        mentions légales), dès leur enregistrement.
      </p>

      <form
        onSubmit={soumettre}
        style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--ombre)', padding: 28, maxWidth: 480, display: 'grid', gap: 18 }}
      >
        <div>
          <label style={styleLabel} htmlFor="coord-telephone">Téléphone</label>
          <input id="coord-telephone" type="tel" maxLength={30} style={styleChamp} {...champ('telephone')} />
        </div>
        <div>
          <label style={styleLabel} htmlFor="coord-email">E-mail</label>
          <input id="coord-email" type="email" maxLength={255} style={styleChamp} {...champ('email')} />
        </div>
        <div>
          <label style={styleLabel} htmlFor="coord-adresse">Adresse</label>
          <input id="coord-adresse" maxLength={500} style={styleChamp} {...champ('adresse')} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="submit" disabled={enregistrement} className="bouton bouton--plein">
            {enregistrement ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          <button type="button" onClick={supprimer} className="bouton bouton--contour-bleu">
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
}
