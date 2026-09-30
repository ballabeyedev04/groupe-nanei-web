import { useCallback, useEffect, useState } from 'react';
import { listerActualites, supprimerActualite } from '../../service/actualiteService';
import { formatDate } from '../../utils/format';
import { succes, erreur as afficherErreur, confirmer } from '../../utils/swal';
import ActualiteFormModal from '../../components/admin/ActualiteFormModal';
import IconeAdmin from '../../components/admin/IconeAdmin';
import messageErreur from '../../utils/messageErreur';

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
      afficherErreur({ titre: 'Échec de la suppression', texte: messageErreur(err) });
    }
  }

  return (
    <>
      <header className="adm-entete">
        <div>
          <h1>Actualités</h1>
          <p>Articles affichés dans la section Actualités du site. Une date future programme la publication.</p>
        </div>
        <button type="button" onClick={ouvrirCreation} className="adm-bouton adm-bouton--plein">
          <IconeAdmin nom="ajouter" /> Ajouter une actualité
        </button>
      </header>

      <section className="adm-carte" aria-label="Liste des actualités">
        {!resultat ? (
          <div className="adm-carte-corps">
            <div className="adm-squelette" style={{ height: 120 }} />
          </div>
        ) : (
          <div className="adm-tableau-conteneur">
            <table className="adm-tableau">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                  <th scope="col">Publication</th>
                  <th scope="col">Statut</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resultat.items.map((a) => {
                  const programmee = new Date(a.publieLe) > new Date();
                  return (
                    <tr key={a.id}>
                      <td className="adm-cellule-forte" style={{ whiteSpace: 'normal' }}>{a.titre}</td>
                      <td className="adm-cellule-douce" style={{ whiteSpace: 'nowrap' }}>{formatDate(a.publieLe)}</td>
                      <td>
                        <span className={`adm-badge ${programmee ? 'adm-badge--attente' : 'adm-badge--succes'}`}>
                          {programmee ? 'Programmée' : 'En ligne'}
                        </span>
                      </td>
                      <td>
                        <div className="adm-actions">
                          <button type="button" className="adm-bouton-icone" onClick={() => ouvrirEdition(a)} aria-label={`Modifier « ${a.titre} »`} title="Modifier">
                            <IconeAdmin nom="modifier" />
                          </button>
                          <button type="button" className="adm-bouton-icone adm-bouton-icone--danger" onClick={() => supprimer(a)} aria-label={`Supprimer « ${a.titre} »`} title="Supprimer">
                            <IconeAdmin nom="supprimer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {resultat?.items.length === 0 && (
          <div className="adm-vide">
            <span className="adm-vide-icone"><IconeAdmin nom="actualites" taille={26} /></span>
            <strong>Aucune actualité pour le moment</strong>
            <p>Publiez une première actualité : elle apparaîtra dans la section Actualités du site.</p>
          </div>
        )}

        {resultat && resultat.totalPages > 1 && (
          <div className="adm-pagination">
            <span>Page {resultat.page} sur {resultat.totalPages}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="adm-bouton adm-bouton--contour adm-bouton--petit">
                <IconeAdmin nom="precedent" taille={16} /> Précédent
              </button>
              <button type="button" disabled={page >= resultat.totalPages} onClick={() => setPage((p) => p + 1)} className="adm-bouton adm-bouton--contour adm-bouton--petit">
                Suivant <IconeAdmin nom="suivant" taille={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      <ActualiteFormModal
        actualite={actualiteEditee}
        ouvert={modaleOuverte}
        onFermer={() => setModaleOuverte(false)}
        onEnregistree={surEnregistree}
      />
    </>
  );
}
