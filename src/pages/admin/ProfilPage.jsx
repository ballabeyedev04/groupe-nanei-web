import { useState } from 'react';
import IconeAdmin from '../../components/admin/IconeAdmin';
import { useAuth } from '../../context/AuthContext';
import { modifierProfil, changerMotDePasse } from '../../service/authService';
import { succes } from '../../utils/swal';
import { formatDate, initiales } from '../../utils/format';
import messageErreur from '../../utils/messageErreur';

const MDP_VIDE = { motDePasseActuel: '', nouveauMotDePasse: '', confirmation: '' };

function ChampMotDePasse({ id, label, visible, ...props }) {
  return (
    <div className="adm-champ">
      <label htmlFor={id}>{label}</label>
      <div className="adm-champ-saisie">
        <IconeAdmin nom="cadenas" />
        <input id={id} type={visible ? 'text' : 'password'} required {...props} />
      </div>
    </div>
  );
}

export default function ProfilPage() {
  const { admin, mettreAJourAdmin } = useAuth();

  const [profil, setProfil] = useState({ nom: admin?.nom || '', email: admin?.email || '' });
  const [envoiProfil, setEnvoiProfil] = useState(false);
  const [erreurProfil, setErreurProfil] = useState('');

  const [mdp, setMdp] = useState(MDP_VIDE);
  const [mdpVisible, setMdpVisible] = useState(false);
  const [envoiMdp, setEnvoiMdp] = useState(false);
  const [erreurMdp, setErreurMdp] = useState('');

  const profilModifie = profil.nom.trim() !== (admin?.nom || '') || profil.email.trim().toLowerCase() !== (admin?.email || '');

  async function enregistrerProfil(e) {
    e.preventDefault();
    setEnvoiProfil(true);
    setErreurProfil('');
    try {
      const misAJour = await modifierProfil({ nom: profil.nom.trim(), email: profil.email.trim() });
      mettreAJourAdmin(misAJour);
      setProfil({ nom: misAJour.nom, email: misAJour.email });
      succes({ titre: 'Profil mis à jour', texte: 'Vos informations ont bien été enregistrées.' });
    } catch (err) {
      setErreurProfil(messageErreur(err));
    } finally {
      setEnvoiProfil(false);
    }
  }

  async function enregistrerMdp(e) {
    e.preventDefault();
    setErreurMdp('');
    if (mdp.nouveauMotDePasse !== mdp.confirmation) {
      setErreurMdp('La confirmation ne correspond pas au nouveau mot de passe.');
      return;
    }
    setEnvoiMdp(true);
    try {
      await changerMotDePasse({ motDePasseActuel: mdp.motDePasseActuel, nouveauMotDePasse: mdp.nouveauMotDePasse });
      setMdp(MDP_VIDE);
      setMdpVisible(false);
      succes({ titre: 'Mot de passe modifié', texte: 'Utilisez-le dès votre prochaine connexion.' });
    } catch (err) {
      setErreurMdp(messageErreur(err));
    } finally {
      setEnvoiMdp(false);
    }
  }

  const champMdp = (nom) => ({ value: mdp[nom], onChange: (e) => setMdp((v) => ({ ...v, [nom]: e.target.value })) });

  return (
    <>
      <header className="adm-entete">
        <div>
          <h1>Profil</h1>
          <p>Gérez les informations et la sécurité de votre compte administrateur.</p>
        </div>
      </header>

      <div className="adm-profil">
        <aside className="adm-carte adm-profil-carte">
          <span className="adm-avatar adm-avatar--grand">{initiales(admin?.nom, admin?.email)}</span>
          <h2>{admin?.nom}</h2>
          <p>{admin?.email}</p>
          <ul className="adm-profil-infos">
            <li>Rôle <strong>Administrateur</strong></li>
            <li>Dernière connexion <strong>{formatDate(admin?.derniereConnexionLe)}</strong></li>
          </ul>
        </aside>

        <div className="adm-profil-formulaires">
          <section className="adm-carte" aria-labelledby="titre-infos">
            <div className="adm-carte-entete">
              <div>
                <h2 id="titre-infos">Informations personnelles</h2>
                <p>Votre nom est affiché dans le menu ; l'e-mail sert d'identifiant de connexion.</p>
              </div>
            </div>
            <form onSubmit={enregistrerProfil} className="adm-carte-corps adm-formulaire">
              <div className="adm-grille-2">
                <div className="adm-champ">
                  <label htmlFor="profil-nom">Nom</label>
                  <div className="adm-champ-saisie">
                    <IconeAdmin nom="profil" />
                    <input
                      id="profil-nom"
                      required
                      minLength={2}
                      maxLength={120}
                      value={profil.nom}
                      onChange={(e) => setProfil((p) => ({ ...p, nom: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="adm-champ">
                  <label htmlFor="profil-email">E-mail</label>
                  <div className="adm-champ-saisie">
                    <IconeAdmin nom="email" />
                    <input
                      id="profil-email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="username"
                      value={profil.email}
                      onChange={(e) => setProfil((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {erreurProfil && <p className="adm-erreur" role="alert">{erreurProfil}</p>}

              <div className="adm-formulaire-actions">
                <button type="submit" className="adm-bouton adm-bouton--plein" disabled={envoiProfil || !profilModifie}>
                  {envoiProfil ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </section>

          <section className="adm-carte" aria-labelledby="titre-mdp">
            <div className="adm-carte-entete">
              <div>
                <h2 id="titre-mdp">Mot de passe</h2>
                <p>Choisissez un mot de passe d'au moins 8 caractères, différent de l'actuel.</p>
              </div>
              <button type="button" className="adm-bouton adm-bouton--contour adm-bouton--petit" onClick={() => setMdpVisible((v) => !v)} aria-pressed={mdpVisible}>
                <IconeAdmin nom={mdpVisible ? 'cacher' : 'voir'} taille={16} /> {mdpVisible ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <form onSubmit={enregistrerMdp} className="adm-carte-corps adm-formulaire">
              <ChampMotDePasse id="mdp-actuel" label="Mot de passe actuel" autoComplete="current-password" visible={mdpVisible} {...champMdp('motDePasseActuel')} />
              <div className="adm-grille-2">
                <ChampMotDePasse id="mdp-nouveau" label="Nouveau mot de passe" autoComplete="new-password" minLength={8} maxLength={128} visible={mdpVisible} {...champMdp('nouveauMotDePasse')} />
                <ChampMotDePasse id="mdp-confirmation" label="Confirmation" autoComplete="new-password" minLength={8} maxLength={128} visible={mdpVisible} {...champMdp('confirmation')} />
              </div>

              {erreurMdp && <p className="adm-erreur" role="alert">{erreurMdp}</p>}

              <div className="adm-formulaire-actions">
                <button type="submit" className="adm-bouton adm-bouton--plein" disabled={envoiMdp}>
                  {envoiMdp ? 'Modification…' : 'Modifier le mot de passe'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
