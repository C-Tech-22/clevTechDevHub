import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getServices, createService, updateService, deleteService } from '../../services/miscService.js';

const emptyForm = {
  title: '', shortDescription: '', description: '', icon: 'FaCode', technologies: '', features: '', order: 0, published: true,
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchServices = async () => {
    setLoading(true);
    try {
      setServices(await getServices());
    } catch {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (service) => {
    setEditing(service);
    setForm({ ...emptyForm, ...service, technologies: (service.technologies || []).join(', '), features: (service.features || []).join(', ') });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      features: form.features.split(',').map((t) => t.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editing) {
        await updateService(editing._id, payload);
        showToast('Service updated successfully', 'success');
      } else {
        await createService(payload);
        showToast('Service created successfully', 'success');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save service', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(deleteTarget._id);
      showToast('Service deleted', 'success');
      setDeleteTarget(null);
      fetchServices();
    } catch {
      showToast('Failed to delete service', 'error');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
    { key: 'published', label: 'Visibility', render: (r) => <span className={`badge ${r.published ? 'badge-success' : ''}`}>{r.published ? 'Published' : 'Hidden'}</span> },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h2>Services</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}><FaPlus /> New Service</button>
      </div>

      <DataTable
        columns={columns}
        rows={services}
        loading={loading}
        emptyMessage="No services yet."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => openEdit(row)} aria-label="Edit"><FaEdit /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      {modalOpen && (
        <Modal title={editing ? 'Edit Service' : 'New Service'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Short Description</label>
              <input className="form-control" maxLength={160} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Full Description *</label>
              <textarea className="form-control" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Icon (react-icons/fa component name)</label>
              <input className="form-control" placeholder="FaGlobe" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies (comma-separated)</label>
              <input className="form-control" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Features (comma-separated)</label>
              <input className="form-control" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input type="number" className="form-control" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Saving…' : editing ? 'Update Service' : 'Create Service'}
            </button>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminServices;
