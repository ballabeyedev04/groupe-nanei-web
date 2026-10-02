import { useId, useRef } from 'react';
import { formatTaille } from '../../utils/format';
import { EXTENSIONS, MAX_FICHIERS, ajouterFichiers } from '../../utils/piecesJointes';

export default function ChampPiecesJointes({ fichiers, onChange, onRefus, desactive }) {
  const id = useId();
  const input = useRef(null);
  const total = fichiers.reduce((s, f) => s + f.size, 0);

  function choisir(e) {
    const { retenus, refus } = ajouterFichiers(fichiers, e.target.files);
    onChange(retenus);
    onRefus(refus.length ? `Fichier(s) non ajouté(s) — ${refus.join(' ; ')}.` : '');
    // Permet de re-choisir le même fichier après l'avoir retiré.
    e.target.value = '';
  }

  function retirer(f) {
    onChange(fichiers.filter((x) => x !== f));
    onRefus('');
  }

  return (
    <div>
      <div className="adm-pj-entete">
        <span className="adm-pj-libelle" id={`${id}-libelle`}>Pièces jointes</span>
        <small>
          {fichiers.length > 0
            ? `${fichiers.length}/${MAX_FICHIERS} fichiers · ${formatTaille(total)}`
            : `Facultatif · ${MAX_FICHIERS} fichiers max.`}
        </small>
      </div>

      {fichiers.length > 0 && (
        <ul className="adm-pj-liste" aria-labelledby={`${id}-libelle`}>
          {fichiers.map((f) => (
            <li key={`${f.name}-${f.size}`} className="adm-pj-fichier">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <span className="adm-pj-nom" title={f.name}>{f.name}</span>
              <span className="adm-pj-taille">{formatTaille(f.size)}</span>
              <button type="button" className="adm-pj-retirer" onClick={() => retirer(f)} disabled={desactive} aria-label={`Retirer ${f.name}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {fichiers.length < MAX_FICHIERS && (
        <>
          <input
            ref={input}
            id={id}
            type="file"
            multiple
            accept={EXTENSIONS.join(',')}
            onChange={choisir}
            disabled={desactive}
            className="adm-pj-input"
          />
          <label htmlFor={id} className={`adm-pj-ajouter ${desactive ? 'adm-pj-ajouter--inactif' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ajouter des fichiers
          </label>
          <small className="adm-pj-aide">PDF, images, Word, Excel, PowerPoint, OpenOffice, TXT, CSV — 3 Mo max. par fichier.</small>
        </>
      )}
    </div>
  );
}
