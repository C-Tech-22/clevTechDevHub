import { useEffect, useState, useCallback } from 'react';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import FilterBar from '../../components/FilterBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getMessages, updateMessageStatus, deleteMessage } from '../../services/miscService.js';

const STATUSES = ['All', 'Unread', 'Read', 'Replied', 'Archived'];
const statusBadge = { Unread: 'badge-danger', Read: '', Replied: 'badge-success', Archived: '' };

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMessages({ status: status === 'All' ? undefined : status, page, limit: 10 });
      setMessages(res.data);
      setMeta(res.meta);
    } catch {
      showToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);
  useEffect(() => setPage(1), [status]);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (msg.status === 'Unread') {
      await updateMessageStatus(msg._id, 'Read');
      fetchMessages();
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      await updateMessageStatus(id, newStatus);
      showToast('Status updated', 'success');
      setSelected((s) => (s ? { ...s, status: newStatus } : s));
      fetchMessages();
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage(deleteTarget._id);
      showToast('Message deleted', 'success');
      setDeleteTarget(null);
      setSelected(null);
      fetchMessages();
    } catch {
      showToast('Failed to delete message', 'error');
    }
  };

  const columns = [
    { key: 'name', label: 'From', render: (r) => (
      <button onClick={() => openMessage(r)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: r.status === 'Unread' ? 700 : 400, textAlign: 'left', padding: 0 }}>
        {r.name}
      </button>
    ) },
    { key: 'email', label: 'Email' },
    { key: 'service', label: 'Service', render: (r) => r.service || '—' },
    { key: 'status', label: 'Status', render: (r) => <span className={`badge ${statusBadge[r.status]}`}>{r.status}</span> },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Messages</h2>

      <div style={{ marginBottom: 20 }}>
        <FilterBar options={STATUSES} active={status} onChange={setStatus} />
      </div>

      <DataTable
        columns={columns}
        rows={messages}
        loading={loading}
        emptyMessage="No messages found."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => openMessage(row)} aria-label="Open"><FaEnvelopeOpen /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      {selected && (
        <Modal title={`Message from ${selected.name}`} onClose={() => setSelected(null)}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>{selected.email} {selected.phone && `· ${selected.phone}`}</p>
          {selected.company && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>{selected.company}</p>}
          {(selected.service || selected.budget) && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              {selected.service} {selected.budget && `· ${selected.budget}`}
            </p>
          )}
          <div className="card" style={{ padding: 16, margin: '14px 0', fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{selected.message}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STATUSES.filter((s) => s !== 'All').map((s) => (
              <button
                key={s}
                className="btn btn-sm"
                onClick={() => changeStatus(selected._id, s)}
                style={{
                  background: selected.status === s ? 'var(--gradient-brand)' : 'var(--bg-elevated)',
                  color: selected.status === s ? '#fff' : 'var(--text-secondary)',
                  border: selected.status === s ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete message from "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminMessages;
