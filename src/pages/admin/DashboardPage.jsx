import { useEffect, useState } from 'react';
import StatCard from '../../components/admin/StatCard';
import GraphiqueDevisParMois from '../../components/admin/GraphiqueDevisParMois';
import { obtenirStats } from '../../service/dashboardService';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    obtenirStats()
      .then(setStats)
      .catch(() => setErreur('Impossible de charger les statistiques pour le moment.'));
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--bleu-marine)', marginBottom: 24 }}>Accueil</h1>

      {erreur && <p style={{ color: 'var(--erreur)' }}>{erreur}</p>}

      {stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 26 }}>
            <StatCard icone="📋" label="Devis reçus" valeur={stats.total} />
            <StatCard icone="✅" label="Réponses traitées" valeur={stats.totalTraites} couleur="var(--succes)" />
            <StatCard icone="⏳" label="En attente de réponse" valeur={stats.totalEnAttente} couleur="#B8860B" />
          </div>

          <GraphiqueDevisParMois donnees={stats.parMois} />
        </>
      )}
    </div>
  );
}
