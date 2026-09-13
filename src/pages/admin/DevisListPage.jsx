import { useCallback, useEffect, useState } from 'react';
import { listerDevis, obtenirDevis } from '../../service/devisService';
import { formatDate } from '../../utils/format';
import DevisDetailModal from '../../components/admin/DevisDetailModal';

const styleBadge = (statut) => ({
  display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700,
  background: statut === 'traite' ? '#EAF7EE' : '#FFF4E0',
  color: statut === 'traite' ? 'var(--succes)' : '#B8860B',
});

export default function DevisListPage() {
  const [page, setPage] = useState(1);
  const [statut, setStatut] = useState('');
  const [recherche, setRecherche] = useState('');
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [devisSelectionne, setDevisSelectionne] = useState(null);

  const charger = useCallback(() => {
    setChargement(true);
    listerDevis({ page, limite: 15, statut, recherche })
      .then(setResultat)
      .finally(() => setChargement(false));
  }, [page, statut, recherche]);

  useEffect(() => {
    // Rechargement classique "on mount + à chaque changement de filtre" :
    // `charger` positionne l'indicateur de chargement de façon synchrone
    // avant l'appel réseau, ce que la règle react-hooks/set-state-in-effect
    // signale par prudence — le rendu en cascade qu'elle évite habituellement
    // (une boucle de mises à jour) ne peut pas se produire ici, `charger` ne
    // dépendant que de page/statut/recherche, jamais de son propre résultat.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    charger();
  }, [charger]);

  async function voirPlus(id) {
    const devis = await obtenirDevis(id);
    setDevisSelectionne(devis);
  }

  function surReponduAvecSucces(devisMisAJour) {
    setDevisSelectionne(devisMisAJour);
    charger();
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--bleu-marine)', marginBottom: 20 }}>Demandes de devis</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <input
          placeholder="Rechercher (nom, e-mail, société)…"
          value={recherche}
          onChange={(e) => { setPage(1); setRecherche(e.target.value); }}
          style={{ flex: '1 1 240px', padding: '10px 13px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14 }}
        />
        <select
          value={statut}
          onChange={(e) => { setPage(1); setStatut(e.target.value); }}
          style={{ padding: '10px 13px', borderRadius: 10, border: '1px solid var(--bordure)', fontSize: 14 }}
        >
          <option value="">Tous les statuts</option>
          <option value="nouveau">En attente</option>
          <option value="traite">Traité</option>
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--ombre)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bleu-ciel-clair)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Nom</th>
                <th style={{ padding: '12px 16px' }}>Société</th>
                <th style={{ padding: '12px 16px' }}>Contact</th>
                <th style={{ padding: '12px 16px' }}>Reçu le</th>
                <th style={{ padding: '12px 16px' }}>Statut</th>
                <th style={{ padding: '12px 16px' }} />
              </tr>
            </thead>
            <tbody>
              {resultat?.items.map((d) => (
                <tr key={d.id} style={{ borderTop: '1px solid var(--bordure)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{d.nom}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--texte-doux)' }}>{d.societe || '—'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--texte-doux)' }}>{d.email}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--texte-doux)' }}>{formatDate(d.createdAt)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={styleBadge(d.statut)}>{d.statut === 'traite' ? 'Traité' : 'En attente'}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => voirPlus(d.id)}
                      className="bouton bouton--contour-bleu"
                      style={{ padding: '7px 16px', fontSize: 13 }}
                    >
                      Voir plus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!chargement && resultat?.items.length === 0 && (
          <p style={{ padding: 24, textAlign: 'center', color: 'var(--texte-doux)' }}>Aucune demande pour le moment.</p>
        )}
      </div>

      {resultat && resultat.totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18 }}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="bouton bouton--contour-bleu"
            style={{ padding: '7px 16px', fontSize: 13 }}
          >
            ← Précédent
          </button>
          <span style={{ alignSelf: 'center', fontSize: 13.5, color: 'var(--texte-doux)' }}>
            Page {resultat.page} / {resultat.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= resultat.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bouton bouton--contour-bleu"
            style={{ padding: '7px 16px', fontSize: 13 }}
          >
            Suivant →
          </button>
        </div>
      )}

      <DevisDetailModal
        devis={devisSelectionne}
        onFermer={() => setDevisSelectionne(null)}
        onReponduAvecSucces={surReponduAvecSucces}
      />
    </div>
  );
}
