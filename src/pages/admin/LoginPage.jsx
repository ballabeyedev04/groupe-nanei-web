import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogoEntete } from '../../components/public/Logo';
import IconeAdmin from '../../components/admin/IconeAdmin';
import { useAuth } from '../../context/AuthContext';

const TABLEAU_DE_BORD = '/admin/dashboard';

export default function LoginPage() {
  const { admin, verifie, seConnecter } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [mdpVisible, setMdpVisible] = useState(false);
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  // Déjà connecté (cookie encore valide) : inutile de repasser par le formulaire.
  if (verifie && admin) return <Navigate to={TABLEAU_DE_BORD} replace />;

  async function soumettre(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur('');
    try {
      await seConnecter(email, motDePasse);
      navigate(TABLEAU_DE_BORD, { replace: true });
    } catch (err) {
      setErreur(
        err?.response?.status === 429
          ? 'Trop de tentatives. Merci de patienter quelques minutes avant de réessayer.'
          : err?.response?.data?.message || 'Connexion impossible pour le moment. Merci de réessayer.'
      );
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div className="adm">
      <div className="adm-connexion">
        <aside className="adm-connexion-visuel" aria-hidden="true">
          <LogoEntete variante="blanc" taille={52} />
          <div className="adm-connexion-accroche">
            <span>Espace administration</span>
            <h2>Pilotez votre activité en un coup d'œil</h2>
            <p>
              Suivez les demandes de devis, répondez à vos clients et tenez à jour les informations de contact
              affichées sur le site.
            </p>
          </div>
          <p className="adm-connexion-pied">© {new Date().getFullYear()} Groupe Nanei — BTP · Logistique · Services</p>
        </aside>

        <main className="adm-connexion-formulaire">
          <div className="adm-connexion-boite">
            <div className="adm-connexion-logo-mobile">
              <LogoEntete taille={48} />
            </div>

            <h1>Connexion</h1>
            <p>Identifiez-vous pour accéder au tableau de bord.</p>

            <form onSubmit={soumettre} className="adm-formulaire">
              <div className="adm-champ">
                <label htmlFor="login-email">Adresse e-mail</label>
                <div className="adm-champ-saisie">
                  <IconeAdmin nom="email" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="username"
                    required
                    autoFocus
                    placeholder="vous@groupe-nanei.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="adm-champ">
                <label htmlFor="login-mdp">Mot de passe</label>
                <div className="adm-champ-saisie">
                  <IconeAdmin nom="cadenas" />
                  <input
                    id="login-mdp"
                    type={mdpVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="adm-avec-bascule"
                    placeholder="••••••••"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                  <button
                    type="button"
                    className="adm-mdp-bascule"
                    onClick={() => setMdpVisible((v) => !v)}
                    aria-label={mdpVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={mdpVisible}
                  >
                    <IconeAdmin nom={mdpVisible ? 'cacher' : 'voir'} />
                  </button>
                </div>
              </div>

              {erreur && <p className="adm-erreur" role="alert">{erreur}</p>}

              <button type="submit" disabled={envoi} className="adm-bouton adm-bouton--plein" style={{ padding: '13px 18px', fontSize: 15 }}>
                {envoi ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>

            <Link to="/" className="adm-retour-site">
              <IconeAdmin nom="retour" taille={16} /> Retour au site
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
