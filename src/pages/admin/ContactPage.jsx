import { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import IconeAdmin from '../../components/admin/IconeAdmin';
import {
  obtenirCoordonnees,
  creerCoordonnees,
  modifierCoordonnees,
  supprimerCoordonnees,
} from '../../service/coordonneesService';
import { succes, erreur as afficherErreur, confirmer } from '../../utils/swal';
import messageErreur from '../../utils/messageErreur';

const VIDE = { email: '', telephone: '', adresse: '' };

// Informations de contact affichées sur le site (hero, À propos, section
// Contact, menu mobile, pied de page). Une seule ligne possible : le bouton
// « Ajouter » disparaît dès qu'elle existe, on la modifie ou la supprime.
export default function ContactPage() {
  const [contact, setContact] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [formulaire, setFormulaire] = useState(null); // null | 'ajout' | 'modification'
  const [valeurs, setValeurs] = useState(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [erreurFormulaire, setErreurFormulaire] = useState('');

  useEffect(() => {
    obtenirCoordonnees()
      .then(setContact)
      .catch((err) => afficherErreur({ titre: 'Chargement impossible', texte: messageErreur(err) }))
      .finally(() => setChargement(false));
  }, []);

  function ouvrir(mode) {
    setValeurs(
      mode === 'modification'
        ? { email: contact.email || '', telephone: contact.telephone || '', adresse: contact.adresse || '' }
        : VIDE
    );
    setErreurFormulaire('');
    setFormulaire(mode);
  }

  function champ(nom) {
    return { value: valeurs[nom], onChange: (e) => setValeurs((v) => ({ ...v, [nom]: e.target.value })) };
  }

  async function soumettre(e) {
    e.preventDefault();
    if (!valeurs.email.trim() && !valeurs.telephone.trim() && !valeurs.adresse.trim()) {
      setErreurFormulaire('Renseignez au moins un champ.');
      return;
    }
    setEnvoi(true);
    setErreurFormulaire('');
    try {
      const enregistre = formulaire === 'ajout' ? await creerCoordonnees(valeurs) : await modifierCoordonnees(valeurs);
      setContact(enregistre);
      setFormulaire(null);
      succes({
        titre: formulaire === 'ajout' ? 'Contact ajouté' : 'Contact modifié',
        texte: 'Le site affiche désormais ces informations.',
      });
    } catch (err) {
      setErreurFormulaire(messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  }

  async function supprimer() {
    const ok = await confirmer({
      titre: 'Supprimer les informations de contact ?',
      texte: 'Le téléphone, l’e-mail et l’adresse ne seront plus affichés sur le site tant que vous n’en aurez pas ajouté de nouveaux.',
      confirmButtonText: 'Supprimer',
    });
    if (!ok) return;
    try {
      await supprimerCoordonnees();
      setContact(null);
      succes({ titre: 'Contact supprimé', texte: 'Vous pouvez en ajouter un nouveau à tout moment.' });
    } catch (err) {
      afficherErreur({ titre: 'Échec de la suppression', texte: messageErreur(err) });
    }
  }

  return (
    <>
      <header className="adm-entete">
        <div>
          <h1>Info Contact</h1>
          <p>Téléphone, e-mail et adresse affichés sur le site vitrine.</p>
        </div>
        {!chargement && !contact && (
          <button type="button" className="adm-bouton adm-bouton--plein" onClick={() => ouvrir('ajout')}>
            <IconeAdmin nom="ajouter" /> Ajouter
          </button>
        )}
      </header>

      <section className="adm-carte" aria-label="Informations de contact">
        {chargement ? (
          <div className="adm-carte-corps">
            <div className="adm-squelette" style={{ height: 96 }} />
          </div>
        ) : (
          <div className="adm-tableau-conteneur">
            <table className="adm-tableau">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Adresse</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contact ? (
                  <tr>
                    <td className="adm-cellule-forte">{contact.email || <span className="adm-cellule-douce">—</span>}</td>
                    <td>{contact.telephone || <span className="adm-cellule-douce">—</span>}</td>
                    <td className="adm-cellule-douce">{contact.adresse || '—'}</td>
                    <td>
                      <div className="adm-actions">
                        <button type="button" className="adm-bouton-icone" onClick={() => ouvrir('modification')} aria-label="Modifier" title="Modifier">
                          <IconeAdmin nom="modifier" />
                        </button>
                        <button type="button" className="adm-bouton-icone adm-bouton-icone--danger" onClick={supprimer} aria-label="Supprimer" title="Supprimer">
                          <IconeAdmin nom="supprimer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <div className="adm-vide">
                        <span className="adm-vide-icone"><IconeAdmin nom="contact" taille={26} /></span>
                        <strong>Aucune information de contact</strong>
                        <p>Ajoutez l'e-mail, le téléphone et l'adresse de l'entreprise pour les afficher sur le site.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Modal
        ouvert={formulaire !== null}
        onFermer={() => setFormulaire(null)}
        titre={formulaire === 'ajout' ? 'Ajouter le contact' : 'Modifier le contact'}
      >
        <form onSubmit={soumettre} className="adm-formulaire">
          <div className="adm-champ">
            <label htmlFor="contact-email">Email</label>
            <div className="adm-champ-saisie">
              <IconeAdmin nom="email" />
              <input id="contact-email" type="email" maxLength={255} placeholder="contact@groupe-nanei.fr" {...champ('email')} />
            </div>
          </div>
          <div className="adm-champ">
            <label htmlFor="contact-telephone">Téléphone</label>
            <div className="adm-champ-saisie">
              <IconeAdmin nom="telephone" />
              <input id="contact-telephone" type="tel" maxLength={30} placeholder="01 23 45 67 89" {...champ('telephone')} />
            </div>
          </div>
          <div className="adm-champ">
            <label htmlFor="contact-adresse">Adresse</label>
            <div className="adm-champ-saisie">
              <IconeAdmin nom="lieu" />
              <input id="contact-adresse" maxLength={500} placeholder="12 rue de l'Exemple, 75000 Paris" {...champ('adresse')} />
            </div>
            <p className="adm-champ-aide">Affichée dans le hero, la section À propos, la section Contact et le pied de page.</p>
          </div>

          {erreurFormulaire && <p className="adm-erreur" role="alert">{erreurFormulaire}</p>}

          <div className="adm-formulaire-actions">
            <button type="button" className="adm-bouton adm-bouton--contour" onClick={() => setFormulaire(null)}>
              Annuler
            </button>
            <button type="submit" className="adm-bouton adm-bouton--plein" disabled={envoi}>
              {envoi ? 'Enregistrement…' : formulaire === 'ajout' ? 'Ajouter' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
