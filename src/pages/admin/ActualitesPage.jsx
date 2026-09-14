import { useCallback, useEffect, useState } from 'react';
import { listerActualites, supprimerActualite } from '../../service/actualiteService';
import { formatDate } from '../../utils/format';
import { succes, erreur as afficherErreur, confirmer } from '../../utils/swal';
import ActualiteFormModal from '../../components/admin/ActualiteFormModal';

export default function ActualitesPage() {
  const [page, setPage] = useState(1);
  const [resultat, setResultat] = useState(null);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [actualiteEditee, setActualiteEditee] = useState(null);

  const charger = useCallback(() => {
    listerActualites({ page, limite: 15 }).then(setResultat);
  }, [page]);

  useEffect(() => {
    charger();
  }, [charger]);

  function ouvrirCreation() {
    setActualiteEditee(null);
    setModaleOuverte(true);
  }

  function ouvrirEdition(actualite) {
    setActualiteEditee(actualite);
    setModaleOuverte(true);
  }

  function surEnregistree() {
    setModaleOuverte(false);
    charger();
    succes({ titre: actualiteEditee ? 'Actualité modifiée' : 'Actualité publiée' });
  }

  async function supprimer(actualite) {
    const ok = await confirmer({
      titre: 'Supprimer cette actualité ?',
      texte: `« ${actualite.titre} » sera définitivement supprimée du site.`,
      confirmButtonText: 'Supprimer',
    });
    if (!ok) return;
    try {
      await supprimerActualite(actualite.id);
      charger();
      succes({ titre: 'Actualité supprimée' });
    } catch (err) {
      afficherErreur({ titre: 'Échec de la suppression', texte: err?.response?.data?.message || 'Merci de réessayer.' });
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--bleu-marine)', margin: 0 }}>Actualités</h1>
        <button type="button" onClick={ouvrirCreation} className="bouton bouton--plein">
          + Ajouter une actualité
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--ombre)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bleu-ciel-clair)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Titre</th>
                <th style={{ padding: '12px 16px' }}>Date de publication</th>
                <th style={{ padding: '12px 16px' }} />
              </tr>
            </thead>
            <tbody>
              {resultat?.items.map((a) => {
                const programmee = new Date(a.publieLe) > new Date();
                return (
                  <tr key={a.id} style={{ borderTop: '1px solid var(--bordure)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{a.titre}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--texte-doux)' }}>
                      {formatDate(a.publieLe)}
                      {programmee && (
                        <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: '#B8860B', background: '#FFF4E0', padding: '2px 8px', borderRadius: 999 }}>
                          programmée
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button type="button" onClick={() => ouvrirEdition(a)} className="bouton bouton--contour-bleu" style={{ padding: '7px 14px', fontSize: 13, marginRight: 8 }}>
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => supprimer(a)}
                        style={{ padding: '7px 14px', fontSize: 13, borderRadius: 999, border: '1px solid #F3C6C6', background: '#fff', color: '#C0392B', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {resultat?.items.length === 0 && (
          <p style={{ padding: 24, textAlign: 'center', color: 'var(--texte-doux)' }}>Aucune actualité pour le moment.</p>
        )}
      </div>

      {resultat && resultat.totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18 }}>
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="bouton bouton--contour-bleu" style={{ padding: '7px 16px', fontSize: 13 }}>
            ← Précédent
          </button>
          <span style={{ alignSelf: 'center', fontSize: 13.5, color: 'var(--texte-doux)' }}>
            Page {resultat.page} / {resultat.totalPages}
          </span>
          <button type="button" disabled={page >= resultat.totalPages} onClick={() => setPage((p) => p + 1)} className="bouton bouton--contour-bleu" style={{ padding: '7px 16px', fontSize: 13 }}>
            Suivant →
          </button>
        </div>
      )}

      <ActualiteFormModal
        actualite={actualiteEditee}
        ouvert={modaleOuverte}
        onFermer={() => setModaleOuverte(false)}
        onEnregistree={surEnregistree}
      />
    </div>
  );
}
