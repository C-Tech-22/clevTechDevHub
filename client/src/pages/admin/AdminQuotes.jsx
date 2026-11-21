import { useEffect, useState, useCallback } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import FilterBar from '../../components/FilterBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getQuotes, getQuoteById, updateQuoteStatus, addQuoteNote, deleteQuote } from '../../services/miscService.js';

const STATUSES = ['All', 'New', 'Contacted', 'In Discussion', 'Approved', 'In Progress', 'Completed', 'Rejected'];
const statusColor = { New: 'badge-danger', Approved: 'badge-success', Completed: 'badge-success', Rejected: 'badge-danger' };

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getQuotes({ status: status === 'All' ? undefined : status, page, limit: 10 });
      setQuotes(res.data);
      setMeta(res.meta);
    } catch {
      showToast('Failed to load quote requests', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]);
  useEffect(() => setPage(1), [status]);

  const openQuote = async (row) => {
    const full = await getQuoteById(row._id);
    setSelected(full);
  };

  const changeStatus = async (newStatus) => {
    try {
      const updated = await updateQuoteStatus(selected._id, newStatus);
      setSelected(updated);
      showToast('Status updated', 'success');
      fetchQuotes();
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;
    try {
      const updated = await addQuoteNote(selected._id, note.trim());
      setSelected(updated);
      setNote('');
    } catch {
      showToast('Failed to add note', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuote(deleteTarget._id);
      showToast('Quote request deleted', 'success');
      setDeleteTarget(null);
      setSelected(null);
      fetchQuotes();
    } catch {
      showToast('Failed to delete quote request', 'error');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'projectType', label: 'Project Type' },
    { key: 'budget', label: 'Budget' },
    { key: 'status', label: 'Status', render: (r) => <span className={`badge ${statusColor[r.status] || ''}`}>{r.status}</span> },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Quote Requests</h2>

      <div style={{ marginBottom: 20 }}>
        <FilterBar options={STATUSES} active={status} onChange={setStatus} />
      </div>

      <DataTable
        columns={columns}
        rows={quotes}
        loading={loading}
        emptyMessage="No quote requests found."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => openQuote(row)} aria-label="View"><FaEye /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      {selected && (
        <Modal title={`Quote Request — ${selected.name}`} onClose={() => setSelected(null)} width={640}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selected.email} {selected.phone && `· ${selected.phone}`} {selected.company && `· ${selected.company}`}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            {selected.projectType} · {selected.budget} {selected.deadline && `· Deadline: ${selected.deadline}`}
          </p>
          <div className="card" style={{ padding: 16, marginBottom: 12, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{selected.description}</div>
          {selected.referenceWebsite && <p style={{ fontSize: '0.85rem' }}>Reference: <a href={selected.referenceWebsite} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue)' }}>{selected.referenceWebsite}</a></p>}
          {selected.additionalRequirements && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Additional requirements</p>
              <p style={{ fontSize: '0.88rem' }}>{selected.additionalRequirements}</p>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>Status</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {STATUSES.filter((s) => s !== 'All').map((s) => (
                <button
                  key={s}
                  className="btn btn-sm"
                  onClick={() => changeStatus(s)}
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
          </div>

          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>Internal Notes</p>
            {selected.internalNotes?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {selected.internalNotes.map((n, i) => (
                  <div key={i} className="card" style={{ padding: 10, fontSize: '0.85rem' }}>{n.note}</div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', marginBottom: 12 }}>No internal notes yet.</p>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-control" placeholder="Add an internal note…" value={note} onChange={(e) => setNote(e.target.value)} />
              <button className="btn btn-outline btn-sm" onClick={handleAddNote}>Add</button>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete quote request from "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminQuotes;
