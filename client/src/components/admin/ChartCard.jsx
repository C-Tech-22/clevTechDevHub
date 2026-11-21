const ChartCard = ({ title, children, height = 280 }) => (
  <div className="card" style={{ padding: 22 }}>
    <h4 style={{ fontSize: '0.95rem', marginBottom: 18 }}>{title}</h4>
    <div style={{ height }}>{children}</div>
  </div>
);

export default ChartCard;
