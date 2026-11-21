const SectionHeader = ({ eyebrow, title, description, align = 'center' }) => (
  <div
    className="slide-up"
    style={{
      maxWidth: 640,
      margin: align === 'center' ? '0 auto 48px' : '0 0 48px',
      textAlign: align,
    }}
  >
    {eyebrow && (
      <span
        className="mono"
        style={{
          display: 'inline-block',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-blue)',
          letterSpacing: '0.05em',
          marginBottom: 10,
        }}
      >
        // {eyebrow}
      </span>
    )}
    <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>{title}</h2>
    {description && <p style={{ fontSize: '1.02rem' }}>{description}</p>}
  </div>
);

export default SectionHeader;
