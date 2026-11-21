const StatCard = ({ label, value, icon: Icon, color = 'var(--color-blue)' }) => (
  <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
    <div
      style={{
        width: 46, height: 46, borderRadius: 12, background: `${color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 18, flexShrink: 0,
      }}
    >
      {Icon && <Icon />}
    </div>
    <div>
      <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  </div>
);

export default StatCard;
