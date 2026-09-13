import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ ouvert, onFermer, titre, children, largeur = 520 }) {
  useEffect(() => {
    if (!ouvert) return undefined;
    function surEchap(e) {
      if (e.key === 'Escape') onFermer();
    }
    document.addEventListener('keydown', surEchap);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', surEchap);
      document.body.style.overflow = '';
    };
  }, [ouvert, onFermer]);

  if (!ouvert) return null;

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onFermer(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(7,32,56,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, zIndex: 100,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        style={{
          background: '#fff', borderRadius: 18, width: '100%', maxWidth: largeur,
          maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(7,32,56,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: 'var(--bleu-marine)' }}>{titre}</h2>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            style={{
              width: 34, height: 34, borderRadius: 10, border: 'none', background: 'var(--bleu-ciel-clair)',
              cursor: 'pointer', fontSize: 16, color: 'var(--bleu-marine)',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
