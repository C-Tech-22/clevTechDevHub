import { FaBars, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-base)', position: 'sticky', top: 0, zIndex: 50,
      }}
    >
      <button
        onClick={onMenuClick}
        className="admin-menu-toggle"
        aria-label="Toggle sidebar"
        style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: 20, display: 'none' }}
      >
        <FaBars />
      </button>
      <div />
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button
          aria-label="Notifications"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: 18, position: 'relative', cursor: 'pointer' }}
        >
          <FaBell />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34, height: 34, borderRadius: '50%', background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem',
            }}
          >
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 600 }}>{user?.name || 'Admin'}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{user?.role}</div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .admin-menu-toggle { display: block !important; } }`}</style>
    </header>
  );
};

export default AdminNavbar;
