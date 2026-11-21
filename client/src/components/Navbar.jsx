import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCode } from 'react-icons/fa';
import { useSite } from '../context/SiteContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSite();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(10,14,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.1rem' }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <FaCode />
          </span>
          {settings?.companyName || 'ClevTech DevHub'}
        </Link>

        <nav aria-label="Primary" className="nav-desktop" style={{ display: 'flex', gap: 28 }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                fontSize: '0.92rem',
                fontWeight: 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--color-blue)' : '2px solid transparent',
                paddingBottom: 4,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link to="/request-a-quote" className="btn btn-primary btn-sm">
            Request a Quote
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: 22 }}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-panel" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)' }}>
          <nav aria-label="Mobile" className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 24px' }}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  padding: '12px 4px',
                  borderBottom: '1px solid var(--border-subtle)',
                  color: isActive ? 'var(--color-blue)' : 'var(--text-secondary)',
                  fontWeight: 500,
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/request-a-quote" className="btn btn-primary" style={{ marginTop: 14 }}>
              Request a Quote
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop, .nav-cta { display: none !important; }
          .nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
