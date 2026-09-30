import { useEffect, useState } from 'react';
import Apparition from '../ui/Apparition';
import EnTeteSection from '../ui/EnTeteSection';
import { listerActualitesPubliques } from '../../service/actualiteService';
import { formatDateCourte } from '../../utils/format';

// Les actualités publiées depuis l'admin s'affichent en liste éditoriale
// (date | titre + texte). Tant que rien n'est publié, la section reste
// honnête sur l'absence de contenu plutôt que d'inventer de fausses
// actualités.
export default function Actualites() {
  const [actualites, setActualites] = useState(null); // null = chargement

  useEffect(() => {
    listerActualitesPubliques({ page: 1, limite: 6 })
      .then((data) => setActualites(data.items))
      .catch(() => setActualites([]));
  }, []);

  return (
    <section id="actualites" className="section" aria-labelledby="titre-actualites">
      <div className="conteneur">
        <EnTeteSection id="titre-actualites" etiquette="Actualités" titre="La vie de Groupe Nanei" />

        {actualites?.length > 0 && (
          <ul className="liste-actualites">
            {actualites.map((a, i) => (
              <Apparition as="li" key={a.id} delai={(i % 3) * 80}>
                <article className="actualite">
                  <time dateTime={a.publieLe}>{formatDateCourte(a.publieLe)}</time>
                  <div>
                    <h3>{a.titre}</h3>
                    <p>{a.contenu}</p>
                  </div>
                </article>
              </Apparition>
            ))}
          </ul>
        )}

        {actualites?.length === 0 && (
          <Apparition className="actualites-vide">
            <strong>Prochainement</strong>
            <p>
              Retrouvez bientôt ici l'actualité de Groupe Nanei : nouveaux chantiers accompagnés, retours
              d'expérience et vie de l'équipe. Pour toute question dès maintenant, contactez-nous directement.
            </p>
          </Apparition>
        )}
      </div>
    </section>
  );
}
