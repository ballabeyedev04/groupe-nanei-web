export default function StatCard({ icone, label, valeur, couleur = 'var(--bleu-action)' }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: 'var(--ombre)', display: 'flex', gap: 16, alignItems: 'center' }}>
      <span style={{ fontSize: 26, width: 48, height: 48, borderRadius: 12, background: 'var(--bleu-ciel-clair)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icone}
      </span>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: couleur, lineHeight: 1.1 }}>{valeur}</div>
        <div style={{ fontSize: 13, color: 'var(--texte-doux)', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}
