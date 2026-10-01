// Besoins d'une demande de devis, en pastilles. `max` limite le nombre
// affiché (tableau de la liste) : le reste est résumé par « +N », avec la
// liste complète au survol.
export default function PastillesBesoins({ besoins = [], max }) {
  if (besoins.length === 0) return <span className="adm-cellule-douce">—</span>;

  const visibles = max ? besoins.slice(0, max) : besoins;
  const restants = besoins.length - visibles.length;

  return (
    <ul className="adm-besoins" aria-label="Besoins">
      {visibles.map((b) => (
        <li key={b} className="adm-besoin">{b}</li>
      ))}
      {restants > 0 && (
        <li className="adm-besoin adm-besoin--plus" title={besoins.slice(max).join(', ')}>
          +{restants}
          <span className="adm-masque"> autre{restants > 1 ? 's' : ''} : {besoins.slice(max).join(', ')}</span>
        </li>
      )}
    </ul>
  );
}
