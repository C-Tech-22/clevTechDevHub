import Modal from './Modal.jsx';

const ConfirmDialog = ({ title = 'Are you sure?', message, confirmLabel = 'Delete', onConfirm, onCancel, danger = true }) => (
  <Modal title={title} onClose={onCancel} width={420}>
    <p style={{ marginBottom: 20 }}>{message}</p>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
      <button className="btn btn-outline btn-sm" onClick={onCancel}>Cancel</button>
      <button
        className="btn btn-sm"
        onClick={onConfirm}
        style={{ background: danger ? 'var(--color-danger)' : 'var(--gradient-brand)', color: '#fff' }}
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
