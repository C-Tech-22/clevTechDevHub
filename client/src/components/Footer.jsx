import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaCode } from 'react-icons/fa';
import { useSite } from '../context/SiteContext.jsx';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

const Footer = () => {
  const { settings } = useSite();
  const year = new Date().getFullYear();
  const social = settings?.socialLinks || {};

  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', marginTop: 80 }}>
      <div className="container" style={{ padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, marginBottom: 12 }}>
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 14,
              }}
            >
              <FaCode />
            </span>
            {settings?.companyName || 'ClevTech DevHub'}
          </div>
          <p style={{ fontSize: '0.88rem' }}>
            {settings?.tagline || 'Building digital products that move businesses forward.'}
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Navigation</h4>
          {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((label) => (
            <Link
              key={label}
              to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
              style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '4px 0' }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Services</h4>
          {['Website Development', 'Full-Stack Web Apps', 'API Development', 'Admin Dashboards'].map((label) => (
            <Link key={label} to="/services" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '4px 0' }}>
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Contact</h4>
          <p style={{ fontSize: '0.85rem', marginBottom: 6 }}>{settings?.email}</p>
          {settings?.phone && <p style={{ fontSize: '0.85rem', marginBottom: 14 }}>{settings.phone}</p>}
          <div style={{ display: 'flex', gap: 12 }}>
            {Object.entries(social)
              .filter(([key, url]) => socialIcons[key] && url)
              .map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key} style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
                    <Icon />
                  </a>
                );
              })}
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        <span>© {year} {settings?.companyName || 'ClevTech DevHub'}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 18 }}>
          <Link to="/privacy-policy" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: 'var(--text-muted)' }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
