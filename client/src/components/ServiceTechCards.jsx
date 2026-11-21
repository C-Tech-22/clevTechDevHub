import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';

export const ServiceCard = ({ service, showLearnMore = true }) => {
  const Icon = Icons[service.icon] || Icons.FaCode;
  return (
    <div className="card slide-up" style={{ padding: 28 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'var(--color-blue-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-blue)',
          fontSize: 20,
          marginBottom: 18,
        }}
      >
        <Icon />
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>{service.title}</h3>
      <p style={{ fontSize: '0.9rem' }}>{service.shortDescription || service.description}</p>
      {service.technologies?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' }}>
          {service.technologies.slice(0, 4).map((t) => (
            <span key={t} className="badge mono" style={{ fontSize: '0.7rem' }}>
              {t}
            </span>
          ))}
        </div>
      )}
      {showLearnMore && (
        <Link to="/services" style={{ color: 'var(--color-blue)', fontSize: '0.88rem', fontWeight: 600 }}>
          Learn more →
        </Link>
      )}
    </div>
  );
};

export const TechnologyCard = ({ name, icon: Icon }) => (
  <div
    className="card"
    style={{
      padding: '18px 14px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <span style={{ fontSize: 26, color: 'var(--color-purple)' }}>
      <Icon />
    </span>
    <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
      {name}
    </span>
  </div>
);
