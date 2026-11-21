import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, uploadImage } from '../../services/miscService.js';

const emptyForm = { clientName: '', company: '', position: '', testimonial: '', rating: 5, avatar: '', published: true, order: 0 };

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      setTestimonials(await getTestimonials());
    } catch {
      showToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...emptyForm, ...t }); setModalOpen(true); };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, avatar: url }));
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, rating: Number(form.rating), order: Number(form.order) || 0 };
    try {
      if (editing) {
        await updateTestimonial(editing._id, payload);
        showToast('Testimonial updated successfully', 'success');
      } else {
        await createTestimonial(payload);
        showToast('Testimonial created successfully', 'success');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save testimonial', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestimonial(deleteTarget._id);
      showToast('Testimonial deleted', 'success');
      setDeleteTarget(null);
      fetchTestimonials();
    } catch {
      showToast('Failed to delete testimonial', 'error');
    }
  };

  const columns = [
    { key: 'clientName', label: 'Client' },
    { key: 'company', label: 'Company' },
    { key: 'rating', label: 'Rating', render: (r) => <span>{r.rating} <FaStar color="#f59e0b" size={12} /></span> },
    { key: 'published', label: 'Visibility', render: (r) => <span className={`badge ${r.published ? 'badge-success' : ''}`}>{r.published ? 'Published' : 'Hidden'}</span> },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h2>Testimonials</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}><FaPlus /> New Testimonial</button>
      </div>

      <DataTable
        columns={columns}
        rows={testimonials}
        loading={loading}
        emptyMessage="No testimonials yet."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => openEdit(row)} aria-label="Edit"><FaEdit /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      {modalOpen && (
        <Modal title={editing ? 'Edit Testimonial' : 'New Testimonial'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input className="form-control" required value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input className="form-control" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <input className="form-control" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Testimonial *</label>
              <textarea className="form-control" rows={4} required maxLength={600} value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Avatar</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
              {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploading…</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Rating (1-5)</label>
                <input type="number" min={1} max={5} className="form-control" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input type="number" className="form-control" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Saving…' : editing ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete testimonial from "${deleteTarget.clientName}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminTestimonials;
