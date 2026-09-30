import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icone from './Icone';

export default function Modal({ ouvert, onFermer, titre, children, largeur = 520 }) {
  const idTitre = useId();
  const refBoite = useRef(null);
  // Dernière version de `onFermer` : l'effet ci-dessous ne dépend ainsi que
  // de `ouvert`, et ne relance pas le focus si le parent passe une fonction
  // recréée à chaque rendu.
  const refFermer = useRef(onFermer);
  useEffect(() => {
    refFermer.current = onFermer;
  });

  useEffect(() => {
    if (!ouvert) return undefined;
    const focusPrecedent = document.activeElement;
    function surEchap(e) {
      if (e.key === 'Escape') refFermer.current();
    }
    document.addEventListener('keydown', surEchap);
    document.body.style.overflow = 'hidden';
    // Le focus passe dans la modale à l'ouverture et revient sur le bouton
    // d'origine à la fermeture (navigation clavier).
    refBoite.current?.querySelector('input, select, textarea, button')?.focus();
    return () => {
      document.removeEventListener('keydown', surEchap);
      document.body.style.overflow = '';
      focusPrecedent?.focus?.();
    };
  }, [ouvert]);

  if (!ouvert) return null;

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onFermer(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(4, 38, 72, 0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, zIndex: 100,
      }}
    >
      <div
        ref={refBoite}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitre}
        style={{
          background: '#fff', borderRadius: 'var(--rayon)', width: '100%', maxWidth: largeur,
          maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(4, 38, 72, 0.35)',
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            padding: '24px 32px', borderBottom: '1px solid var(--ligne)',
          }}
        >
          <h2 id={idTitre} style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>{titre}</h2>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            style={{
              width: 40, height: 40, borderRadius: 'var(--rayon)', border: '1px solid var(--ligne)',
              background: '#fff', cursor: 'pointer', color: 'var(--bleu-marine)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <Icone nom="fermer" />
          </button>
        </div>
        <div style={{ padding: '24px 32px 32px' }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
