const Loader = ({ label = 'Loading…', fullHeight = true }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '60px 0',
      minHeight: fullHeight ? '40vh' : 'auto',
    }}
    role="status"
    aria-live="polite"
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '3px solid var(--border-subtle)',
        borderTopColor: 'var(--color-blue)',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;
