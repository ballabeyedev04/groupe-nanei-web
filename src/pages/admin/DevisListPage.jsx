import { useCallback, useEffect, useState } from 'react';
import { listerDevis, obtenirDevis } from '../../service/devisService';
import { formatDate } from '../../utils/format';
import DevisDetailModal from '../../components/admin/DevisDetailModal';
import IconeAdmin from '../../components/admin/IconeAdmin';

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
    <>
      <header className="adm-entete">
        <div>
          <h1>Les devis</h1>
          <p>Demandes reçues via le formulaire du site. Ouvrez-en une pour la consulter et y répondre.</p>
        </div>
      </header>

      <div className="adm-filtres">
        <div className="adm-champ" style={{ margin: 0 }}>
          <div className="adm-champ-saisie">
            <IconeAdmin nom="recherche" />
            <input
              type="search"
              aria-label="Rechercher une demande"
              placeholder="Rechercher (nom, e-mail, société)…"
              value={recherche}
              onChange={(e) => { setPage(1); setRecherche(e.target.value); }}
            />
          </div>
        </div>
        <select
          aria-label="Filtrer par statut"
          value={statut}
          onChange={(e) => { setPage(1); setStatut(e.target.value); }}
        >
          <option value="">Tous les statuts</option>
          <option value="nouveau">En attente</option>
          <option value="traite">Traité</option>
        </select>
      </div>

      <section className="adm-carte" aria-label="Liste des demandes de devis">
        <div className="adm-tableau-conteneur">
          <table className="adm-tableau">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Société</th>
                <th scope="col">Contact</th>
                <th scope="col">Reçu le</th>
                <th scope="col">Statut</th>
                <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resultat?.items.map((d) => (
                <tr key={d.id}>
                  <td className="adm-cellule-forte">{d.nom}</td>
                  <td className="adm-cellule-douce">{d.societe || '—'}</td>
                  <td className="adm-cellule-douce">
                    {d.email}
                    {d.telephone && <><br /><small>{d.telephone}</small></>}
                  </td>
                  <td className="adm-cellule-douce" style={{ whiteSpace: 'nowrap' }}>{formatDate(d.createdAt)}</td>
                  <td>
                    <span className={`adm-badge ${d.statut === 'traite' ? 'adm-badge--succes' : 'adm-badge--attente'}`}>
                      {d.statut === 'traite' ? 'Traité' : 'En attente'}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button type="button" onClick={() => voirPlus(d.id)} className="adm-bouton adm-bouton--contour adm-bouton--petit">
                        <IconeAdmin nom="voir" taille={16} /> Voir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!chargement && resultat?.items.length === 0 && (
          <div className="adm-vide">
            <span className="adm-vide-icone"><IconeAdmin nom="devis" taille={26} /></span>
            <strong>{recherche || statut ? 'Aucun résultat' : 'Aucune demande pour le moment'}</strong>
            <p>
              {recherche || statut
                ? 'Aucune demande ne correspond à ces filtres.'
                : 'Les demandes envoyées depuis le formulaire du site apparaîtront ici.'}
            </p>
          </div>
        )}

        {resultat && resultat.totalPages > 1 && (
          <div className="adm-pagination">
            <span>Page {resultat.page} sur {resultat.totalPages}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="adm-bouton adm-bouton--contour adm-bouton--petit"
              >
                <IconeAdmin nom="precedent" taille={16} /> Précédent
              </button>
              <button
                type="button"
                disabled={page >= resultat.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="adm-bouton adm-bouton--contour adm-bouton--petit"
              >
                Suivant <IconeAdmin nom="suivant" taille={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      <DevisDetailModal
        devis={devisSelectionne}
        onFermer={() => setDevisSelectionne(null)}
        onReponduAvecSucces={surReponduAvecSucces}
      />
    </>
  );
}
