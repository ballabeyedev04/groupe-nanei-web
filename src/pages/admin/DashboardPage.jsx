import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconeAdmin from '../../components/admin/IconeAdmin';
import GraphiqueDevis from '../../components/admin/GraphiqueDevis';
import { useAuth } from '../../context/AuthContext';
import { obtenirStats } from '../../service/dashboardService';

const PERIODES = [
  { cle: 'jour', libelle: 'Par jour', serie: 'parJour', description: '30 derniers jours' },
  { cle: 'semaine', libelle: 'Par semaine', serie: 'parSemaine', description: '12 dernières semaines' },
  { cle: 'mois', libelle: 'Par mois', serie: 'parMois', description: '12 derniers mois' },
];

function Stat({ icone, variante, valeur, libelle }) {
  return (
    <div className="adm-carte adm-stat">
      <span className={`adm-stat-icone${variante ? ` adm-stat-icone--${variante}` : ''}`}>
        <IconeAdmin nom={icone} taille={22} />
      </span>
      <div>
        <span className="adm-stat-valeur">{valeur}</span>
        <span className="adm-stat-libelle">{libelle}</span>
      </div>
    </div>
  );
}

// Anneau "traités / en attente" dessiné avec deux cercles et stroke-dasharray.
function RepartitionStatuts({ traites, enAttente }) {
  const total = traites + enAttente;
  const rayon = 70;
  const circonference = 2 * Math.PI * rayon;
  const part = total ? traites / total : 0;
  const taux = Math.round(part * 100);

  return (
    <div className="adm-carte">
      <div className="adm-carte-entete">
        <div>
          <h2>Traitement des demandes</h2>
          <p>Réponses envoyées depuis l'admin</p>
        </div>
      </div>
      <div className="adm-carte-corps adm-anneau">
        <svg viewBox="0 0 180 180" role="img" aria-label={`${taux} % des demandes traitées`}>
          <circle cx="90" cy="90" r={rayon} fill="none" stroke={total ? 'var(--adm-attente-fond)' : 'var(--ligne)'} strokeWidth="18" />
          {total > 0 && (
            <circle
              cx="90"
              cy="90"
              r={rayon}
              fill="none"
              stroke="var(--succes)"
              strokeWidth="18"
              strokeLinecap={part > 0 && part < 1 ? 'round' : 'butt'}
              strokeDasharray={`${circonference * part} ${circonference}`}
              transform="rotate(-90 90 90)"
            />
          )}
          <text x="90" y="88" textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--bleu-marine)">{taux}%</text>
          <text x="90" y="110" textAnchor="middle" fontSize="12" fill="var(--texte-doux)">traitées</text>
        </svg>
        <ul className="adm-legende">
          <li>
            <span className="adm-pastille" style={{ background: 'var(--succes)' }} /> Traitées <strong>{traites}</strong>
          </li>
          <li>
            <span className="adm-pastille" style={{ background: '#e8b75a' }} /> En attente <strong>{enAttente}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function salutation() {
  const h = new Date().getHours();
  return h < 18 ? 'Bonjour' : 'Bonsoir';
}

export default function DashboardPage() {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [erreur, setErreur] = useState('');
  const [periode, setPeriode] = useState('mois');

  useEffect(() => {
    obtenirStats()
      .then(setStats)
      .catch(() => setErreur('Impossible de charger les statistiques pour le moment.'));
  }, []);

  const choix = PERIODES.find((p) => p.cle === periode);
  const serie = stats?.[choix.serie] || [];
  const totalPeriode = serie.reduce((s, d) => s + d.total, 0);
  const moyenne = serie.length ? (totalPeriode / serie.length).toFixed(1).replace('.', ',') : '0';
  const record = serie.reduce((m, d) => Math.max(m, d.total), 0);

  return (
    <>
      <header className="adm-entete">
        <div>
          <h1>{salutation()}{admin?.nom ? `, ${admin.nom}` : ''} 👋</h1>
          <p>Voici l'activité des demandes de devis reçues via le site.</p>
        </div>
        <Link to="/admin/devis" className="adm-bouton adm-bouton--contour" style={{ textDecoration: 'none' }}>
          <IconeAdmin nom="devis" /> Voir les devis
        </Link>
      </header>

      {erreur && <p className="adm-erreur" role="alert">{erreur}</p>}

      {!stats && !erreur && (
        <>
          <div className="adm-stats">
            {[0, 1, 2, 3].map((i) => <div key={i} className="adm-squelette" style={{ height: 86 }} />)}
          </div>
          <div className="adm-squelette" style={{ height: 360 }} />
        </>
      )}

      {stats && (
        <>
          <div className="adm-stats">
            <Stat icone="devis" valeur={stats.total} libelle="Devis reçus au total" />
            <Stat icone="calendrier" variante="or" valeur={stats.ceMois} libelle="Ce mois-ci" />
            <Stat icone="tendance" valeur={stats.cetteSemaine} libelle="Cette semaine" />
            <Stat icone="horloge" variante="attente" valeur={stats.totalEnAttente} libelle="En attente de réponse" />
          </div>

          <div className="adm-grille-graphes">
            <section className="adm-carte" aria-labelledby="titre-graphe">
              <div className="adm-carte-entete">
                <div>
                  <h2 id="titre-graphe">Demandes de devis</h2>
                  <p>{choix.description}</p>
                </div>
                <div className="adm-onglets" role="tablist" aria-label="Période du graphique">
                  {PERIODES.map((p) => (
                    <button
                      key={p.cle}
                      type="button"
                      role="tab"
                      aria-selected={p.cle === periode}
                      className="adm-onglet"
                      onClick={() => setPeriode(p.cle)}
                    >
                      {p.libelle}
                    </button>
                  ))}
                </div>
              </div>
              <div className="adm-carte-corps">
                <GraphiqueDevis key={periode} donnees={serie} granularite={periode} />
                <div className="adm-graphe-resume">
                  <span><strong>{totalPeriode}</strong> demande{totalPeriode > 1 ? 's' : ''} sur la période</span>
                  <span><strong>{moyenne}</strong> en moyenne par {periode}</span>
                  <span><strong>{record}</strong> au maximum</span>
                  <span><strong>{stats.aujourdhui}</strong> aujourd'hui</span>
                </div>
              </div>
            </section>

            <RepartitionStatuts traites={stats.totalTraites} enAttente={stats.totalEnAttente} />
          </div>
        </>
      )}
    </>
  );
}
