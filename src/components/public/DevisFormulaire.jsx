import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { envoyerDemandeDevis } from '../../service/devisService';
import { SERVICES } from '../../data/site';
import Icone from '../ui/Icone';

const TYPES_BESOIN = [...SERVICES.map((s) => s.titre), 'Autre besoin'];

const VIDE = {
  nom: '', societe: '', telephone: '', email: '', ville: '', typeBesoin: '', message: '',
  consentementRgpd: false, site_web: '',
};

// Formulaire de demande de devis, utilisé à la fois dans la modale (boutons
// "Demander un devis") et directement dans la section Contact. `useId`
// garantit des identifiants uniques si les deux sont affichés en même temps.
export default function DevisFormulaire({ onEnvoye }) {
  const id = useId();
  const [valeurs, setValeurs] = useState(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  function champ(nom) {
    return {
      id: `${id}-${nom}`,
      name: nom,
      value: valeurs[nom],
      onChange: (e) => setValeurs((v) => ({ ...v, [nom]: e.target.value })),
    };
  }

  async function soumettre(e) {
    e.preventDefault();
    if (!valeurs.consentementRgpd) {
      setErreur('Merci de confirmer votre consentement pour être recontacté.');
      return;
    }
    setEnvoi(true);
    setErreur('');
    try {
      await envoyerDemandeDevis(valeurs);
      setValeurs(VIDE);
      onEnvoye?.();
      // SweetAlert n'est téléchargé qu'au moment d'afficher la confirmation :
      // il ne pèse pas sur le chargement initial de la vitrine.
      const { succes } = await import('../../utils/swal');
      succes({
        titre: 'Votre demande a bien été envoyée',
        texte: 'Merci. Notre équipe l’étudie et revient vers vous rapidement. Un e-mail de confirmation vous a été adressé.',
      });
    } catch (err) {
      setErreur(err?.response?.data?.message || "L'envoi n'a pas abouti. Merci de réessayer dans un instant.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={soumettre} className="formulaire">
      <div className="formulaire-ligne">
        <div className="champ">
          <label htmlFor={`${id}-nom`}>Nom et prénom *</label>
          <input required maxLength={150} autoComplete="name" {...champ('nom')} />
        </div>
        <div className="champ">
          <label htmlFor={`${id}-societe`}>Société</label>
          <input maxLength={150} autoComplete="organization" {...champ('societe')} />
        </div>
      </div>

      <div className="formulaire-ligne">
        <div className="champ">
          <label htmlFor={`${id}-telephone`}>Téléphone *</label>
          <input type="tel" required maxLength={30} autoComplete="tel" {...champ('telephone')} />
        </div>
        <div className="champ">
          <label htmlFor={`${id}-email`}>E-mail professionnel *</label>
          <input type="email" required maxLength={255} autoComplete="email" {...champ('email')} />
        </div>
      </div>

      <div className="formulaire-ligne">
        <div className="champ">
          <label htmlFor={`${id}-ville`}>Ville du chantier</label>
          <input maxLength={150} autoComplete="address-level2" {...champ('ville')} />
        </div>
        <div className="champ">
          <label htmlFor={`${id}-typeBesoin`}>Type de besoin</label>
          <select {...champ('typeBesoin')}>
            <option value="">Sélectionner…</option>
            {TYPES_BESOIN.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="champ">
        <label htmlFor={`${id}-message`}>Votre projet *</label>
        <textarea
          required
          minLength={5}
          maxLength={4000}
          rows={4}
          placeholder="Nature du chantier, durée, contraintes d'accès, prestations souhaitées…"
          {...champ('message')}
        />
      </div>

      {/* Piège anti-spam : invisible et hors du flux de tabulation pour un
          visiteur humain, mais présent dans le DOM pour un robot qui
          remplit tous les champs sans exécuter le CSS. */}
      <div className="piege-antispam" aria-hidden="true">
        <label htmlFor={`${id}-site_web`}>Ne pas remplir ce champ</label>
        <input tabIndex={-1} autoComplete="off" {...champ('site_web')} />
      </div>

      <label className="champ-consentement">
        <input
          type="checkbox"
          checked={valeurs.consentementRgpd}
          onChange={(e) => setValeurs((v) => ({ ...v, consentementRgpd: e.target.checked }))}
          required
        />
        <span>
          J'accepte que mes informations soient utilisées par Groupe Nanei pour me recontacter au sujet de ma
          demande, conformément à la <Link to="/politique-de-confidentialite">politique de confidentialité</Link>. *
        </span>
      </label>

      <div aria-live="polite">
        {erreur && <p className="formulaire-erreur" role="alert">{erreur}</p>}
      </div>

      <div className="formulaire-pied">
        <small>* Champs obligatoires</small>
        <button type="submit" disabled={envoi} className="bouton bouton--plein" aria-busy={envoi}>
          {envoi ? 'Envoi en cours…' : <>Envoyer ma demande <Icone nom="fleche" /></>}
        </button>
      </div>
    </form>
  );
}
