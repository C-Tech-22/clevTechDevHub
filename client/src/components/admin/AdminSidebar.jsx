import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaFolderOpen, FaBlog, FaConciergeBell, FaStar,
  FaEnvelope, FaFileInvoiceDollar, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaCode,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/admin/projects', label: 'Projects', icon: FaFolderOpen },
  { to: '/admin/blog', label: 'Blog', icon: FaBlog },
  { to: '/admin/services', label: 'Services', icon: FaConciergeBell },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaStar },
  { to: '/admin/messages', label: 'Messages', icon: FaEnvelope },
  { to: '/admin/quotes', label: 'Quote Requests', icon: FaFileInvoiceDollar },
  { to: '/admin/analytics', label: 'Analytics', icon: FaChartBar },
  { to: '/admin/settings', label: 'Settings', icon: FaCog },
];

const AdminSidebar = ({ open, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="sidebar-backdrop"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150, display: 'none' }}
        />
      )}
      <aside
        className={`admin-sidebar ${open ? 'open' : ''}`}
        style={{
          width: 240,
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '22px 20px', fontWeight: 800 }}>
          <span
            style={{
              width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}
          >
            <FaCode />
          </span>
          ClevTech Admin
        </div>

        <nav style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8,
                fontSize: '0.88rem', fontWeight: 500,
                color: isActive ? '#fff' : 'var(--text-secondary)',
                background: isActive ? 'var(--gradient-brand)' : 'transparent',
              })}
            >
              <item.icon /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: 12, borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 12px', borderRadius: 8,
              background: 'transparent', border: 'none', color: 'var(--color-danger)', fontSize: '0.88rem', cursor: 'pointer',
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar { position: fixed !important; left: -260px; z-index: 200; transition: left 0.2s ease; }
          .admin-sidebar.open { left: 0; }
          .sidebar-backdrop { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
