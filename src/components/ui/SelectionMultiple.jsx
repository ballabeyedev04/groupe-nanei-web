import { useEffect, useId, useRef, useState } from 'react';

// Liste déroulante à choix multiple : chaque option choisie quitte la liste
// et s'affiche en pastille sous le champ ; la croix de la pastille la retire
// et la remet dans la liste, à sa place d'origine.
// Accessibilité : motif "combobox select-only" (WAI-ARIA APG) — le focus
// reste sur le bouton, l'option active est signalée par aria-activedescendant.
export default function SelectionMultiple({
  id,
  options,
  valeurs,
  onChange,
  placeholder = 'Sélectionner…',
  placeholderSuite = 'Ajouter…',
  libelleComplet = 'Toutes les options sont sélectionnées',
  libellePastilles = 'Éléments sélectionnés',
}) {
  const idListe = useId();
  const racine = useRef(null);
  const declencheur = useRef(null);
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(0);

  const disponibles = options.filter((o) => !valeurs.includes(o));
  const complet = disponibles.length === 0;
  const indexActif = Math.min(actif, disponibles.length - 1);

  // Fermeture au clic en dehors du composant.
  useEffect(() => {
    if (!ouvert) return undefined;
    function auClic(e) {
      if (!racine.current?.contains(e.target)) setOuvert(false);
    }
    document.addEventListener('mousedown', auClic);
    return () => document.removeEventListener('mousedown', auClic);
  }, [ouvert]);

  // Garde l'option active visible quand on navigue au clavier dans une liste
  // plus haute que la zone affichée.
  useEffect(() => {
    if (!ouvert) return;
    document.getElementById(`${idListe}-${indexActif}`)?.scrollIntoView({ block: 'nearest' });
  }, [ouvert, indexActif, idListe]);

  function ouvrir() {
    if (complet) return;
    setActif(0);
    setOuvert(true);
  }

  function ajouter(option) {
    // Ordre des pastilles = ordre des options, quel que soit l'ordre des clics.
    onChange(options.filter((o) => o === option || valeurs.includes(o)));
    setOuvert(false);
    declencheur.current?.focus();
  }

  function retirer(option) {
    onChange(valeurs.filter((v) => v !== option));
    declencheur.current?.focus();
  }

  function auClavier(e) {
    if (!ouvert) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        ouvrir();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActif(Math.min(indexActif + 1, disponibles.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActif(Math.max(indexActif - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setActif(0);
        break;
      case 'End':
        e.preventDefault();
        setActif(disponibles.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (disponibles[indexActif]) ajouter(disponibles[indexActif]);
        break;
      case 'Escape':
        e.preventDefault();
        setOuvert(false);
        break;
      case 'Tab':
        setOuvert(false);
        break;
      default:
    }
  }

  let libelle = placeholder;
  if (complet) libelle = libelleComplet;
  else if (valeurs.length > 0) libelle = placeholderSuite;

  return (
    <div ref={racine} className={`multi ${ouvert ? 'multi--ouvert' : ''}`}>
      <div className="multi-champ">
        <button
          ref={declencheur}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={ouvert}
          aria-controls={idListe}
          aria-activedescendant={ouvert && !complet ? `${idListe}-${indexActif}` : undefined}
          aria-disabled={complet || undefined}
          className="multi-declencheur"
          onClick={() => (ouvert ? setOuvert(false) : ouvrir())}
          onKeyDown={auClavier}
        >
          <span className={valeurs.length === 0 ? 'multi-indication' : 'multi-indication multi-indication--suite'}>
            {libelle}
          </span>
          <svg className="multi-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul id={idListe} role="listbox" aria-multiselectable="true" className="multi-liste" hidden={!ouvert}>
          {disponibles.map((option, i) => (
            <li
              key={option}
              id={`${idListe}-${i}`}
              role="option"
              aria-selected="false"
              className={`multi-option ${i === indexActif ? 'multi-option--active' : ''}`}
              // mousedown empêché : le bouton garde le focus pendant le clic.
              onMouseDown={(e) => e.preventDefault()}
              onMouseMove={() => i !== indexActif && setActif(i)}
              onClick={() => ajouter(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {valeurs.length > 0 && (
        <ul className="multi-pastilles" aria-label={libellePastilles}>
          {valeurs.map((v) => (
            <li key={v} className="multi-pastille">
              <span>{v}</span>
              <button type="button" className="multi-retirer" onClick={() => retirer(v)} aria-label={`Retirer ${v}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
