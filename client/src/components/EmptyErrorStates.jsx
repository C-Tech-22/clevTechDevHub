import { FaInbox, FaExclamationTriangle } from 'react-icons/fa';

export const EmptyState = ({ title = 'Nothing here yet', message = '', icon }) => (
  <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--text-muted)' }}>
    <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.6 }}>{icon || <FaInbox />}</div>
    <h4 style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>{title}</h4>
    {message && <p style={{ maxWidth: 400, margin: '0 auto' }}>{message}</p>}
  </div>
);

export const ErrorState = ({ title = 'Something went wrong', message = 'Please try again in a moment.', onRetry }) => (
  <div style={{ textAlign: 'center', padding: '64px 20px' }}>
    <div style={{ fontSize: 32, marginBottom: 12, color: 'var(--color-danger)' }}>
      <FaExclamationTriangle />
    </div>
    <h4 style={{ marginBottom: 6 }}>{title}</h4>
    <p style={{ maxWidth: 400, margin: '0 auto 16px' }}>{message}</p>
    {onRetry && (
      <button className="btn btn-outline btn-sm" onClick={onRetry}>
        Try again
      </button>
    )}
  </div>
);
