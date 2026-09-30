// Bandeau défilant sous le hero : rappelle d'un coup d'œil les 8 services
// (mêmes intitulés que la section Services). La liste est dupliquée pour que
// la boucle CSS soit continue ; la copie est masquée aux lecteurs d'écran.
const SERVICES = [
  'Gestion des bennes',
  'Gestion du trafic chantier',
  'Réception des livraisons',
  'Ouverture et fermeture des portes',
  'Sécurité logistique',
  'Nettoyage et entretien',
  'Gestion des flux piétons',
  'Gestion des zones de stockage',
];

export default function BandeauServices() {
  return (
    <div className="bandeau">
      <div className="bandeau-piste">
        {[0, 1].map((copie) => (
          <ul
            key={copie}
            aria-hidden={copie === 1 || undefined}
            style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}
          >
            {SERVICES.map((s) => (
              <li key={s} className="bandeau-element">{s}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
