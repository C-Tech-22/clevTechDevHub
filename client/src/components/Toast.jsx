import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle color="var(--color-success)" />,
  error: <FaExclamationCircle color="var(--color-danger)" />,
  info: <FaInfoCircle color="var(--color-blue)" />,
};

const Toast = ({ message, type = 'success' }) => (
  <div
    className="card slide-up"
    role="status"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      minWidth: 260,
      maxWidth: 360,
      boxShadow: 'var(--shadow-card)',
    }}
  >
    {icons[type]}
    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{message}</span>
  </div>
);

export default Toast;
