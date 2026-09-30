import Apparition from './Apparition';

// Étiquette + titre H2 + introduction, communs à toutes les sections.
// `scinde` place l'introduction à droite du titre sur grand écran, pour
// casser la répétition "tout aligné à gauche" d'une section à l'autre.
export default function EnTeteSection({ etiquette, titre, intro, scinde = false, id }) {
  return (
    <Apparition className={`entete-section ${scinde ? 'entete-section--scindee' : ''}`}>
      <div>
        <span className="etiquette-section">{etiquette}</span>
        <h2 id={id} className="titre-section" style={scinde ? { marginBottom: 0 } : undefined}>{titre}</h2>
      </div>
      {intro && <p className="intro-section">{intro}</p>}
    </Apparition>
  );
}
