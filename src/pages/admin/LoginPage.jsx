import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../../components/public/Logo';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { admin, verifie, seConnecter } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  if (verifie && admin) return <Navigate to="/admin" replace />;

  async function soumettre(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur('');
    try {
      await seConnecter(email, motDePasse);
      navigate('/admin', { replace: true });
    } catch (err) {
      setErreur(err?.response?.data?.message || 'Identifiants incorrects.');
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, var(--bleu-marine), var(--bleu-action))', padding: 20,
      }}
    >
      <div style={{ background: '#fff', borderRadius: 18, padding: '38px 34px', width: '100%', maxWidth: 400, boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Logo taille={40} />
        </div>
        <h1 style={{ textAlign: 'center', fontSize: 18, color: 'var(--bleu-marine)', marginBottom: 24 }}>Espace administration</h1>

        <form onSubmit={soumettre} style={{ display: 'grid', gap: 16 }}>
          <div>
            <label htmlFor="login-email" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 }}>
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '11px 13px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14.5 }}
            />
          </div>
          <div>
            <label htmlFor="login-mdp" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--bleu-marine)', marginBottom: 6 }}>
              Mot de passe
            </label>
            <input
              id="login-mdp"
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              style={{ width: '100%', padding: '11px 13px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14.5 }}
            />
          </div>

          {erreur && <p style={{ margin: 0, color: 'var(--erreur)', fontSize: 13.5 }}>{erreur}</p>}

          <button type="submit" disabled={envoi} className="bouton bouton--plein" style={{ justifyContent: 'center', marginTop: 4 }}>
            {envoi ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
