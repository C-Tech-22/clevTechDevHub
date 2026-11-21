import { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  getProjects, createProject, updateProject, deleteProject,
} from '../../services/projectService.js';
import { uploadImage } from '../../services/miscService.js';

const CATEGORIES = ['Web Development', 'Full Stack', 'Frontend', 'Backend', 'Dashboard', 'E-commerce', 'UI/UX'];
const STATUSES = ['Planning', 'In Development', 'Completed', 'Maintenance', 'Archived'];

const emptyForm = {
  title: '', shortDescription: '', description: '', category: CATEGORIES[0], status: 'Completed',
  technologies: '', features: '', problem: '', solution: '', architecture: '', challenges: '', results: '',
  image: '', githubUrl: '', liveUrl: '', featured: false, published: true,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProjects({ search: search || undefined, limit: 50 });
      setProjects(res.data);
    } catch {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      ...emptyForm,
      ...project,
      technologies: (project.technologies || []).join(', '),
      features: (project.features || []).join(', '),
    });
    setModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      features: form.features.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await updateProject(editing._id, payload);
        showToast('Project updated successfully', 'success');
      } else {
        await createProject(payload);
        showToast('Project created successfully', 'success');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save project', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteTarget._id);
      showToast('Project deleted', 'success');
      setDeleteTarget(null);
      fetchProjects();
    } catch {
      showToast('Failed to delete project', 'error');
    }
  };

  const togglePublish = async (project) => {
    try {
      await updateProject(project._id, { published: !project.published });
      fetchProjects();
    } catch {
      showToast('Failed to update project', 'error');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (r) => <span className="badge">{r.status}</span> },
    { key: 'published', label: 'Visibility', render: (r) => <span className={`badge ${r.published ? 'badge-success' : ''}`}>{r.published ? 'Published' : 'Draft'}</span> },
    { key: 'featured', label: 'Featured', render: (r) => (r.featured ? '⭐' : '—') },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h2>Projects</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}><FaPlus /> New Project</button>
      </div>

      <div style={{ marginBottom: 20, maxWidth: 320 }}>
        <SearchBar placeholder="Search projects…" onSearch={setSearch} />
      </div>

      <DataTable
        columns={columns}
        rows={projects}
        loading={loading}
        emptyMessage="No projects yet. Create your first one."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => togglePublish(row)} aria-label="Toggle visibility">
              {row.published ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => openEdit(row)} aria-label="Edit"><FaEdit /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      {modalOpen && (
        <Modal title={editing ? 'Edit Project' : 'New Project'} onClose={() => setModalOpen(false)} width={680}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Short Description *</label>
              <input className="form-control" required maxLength={200} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Full Description *</label>
              <textarea className="form-control" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image *</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
              {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploading…</p>}
              {form.image && <img src={form.image} alt="" style={{ marginTop: 8, height: 80, borderRadius: 8 }} />}
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
                <label className="form-label">GitHub URL</label>
                <input className="form-control" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Live URL</label>
                <input className="form-control" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
              </div>
            </div>
            {['problem', 'solution', 'architecture', 'challenges', 'results'].map((field) => (
              <div className="form-group" key={field}>
                <label className="form-label" style={{ textTransform: 'capitalize' }}>{field}</label>
                <textarea className="form-control" rows={2} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
              </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Saving…' : editing ? 'Update Project' : 'Create Project'}
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

export default AdminProjects;
