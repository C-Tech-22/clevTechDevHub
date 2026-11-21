import { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getPosts, createPost, updatePost, deletePost } from '../../services/blogService.js';
import { uploadImage } from '../../services/miscService.js';

const CATEGORIES = ['Web Development', 'React', 'JavaScript', 'Node.js', 'MongoDB', 'APIs', 'Software Engineering', 'Career', 'ClevTech News'];

const emptyForm = {
  title: '', excerpt: '', content: '', coverImage: '', category: CATEGORIES[0],
  tags: '', status: 'draft', seoTitle: '', seoDescription: '',
};

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts({ search: search || undefined, limit: 50 });
      setPosts(res.data);
    } catch {
      showToast('Failed to load blog posts', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (post) => {
    setEditing(post);
    setForm({ ...emptyForm, ...post, tags: (post.tags || []).join(', ') });
    setModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean) };
    try {
      if (editing) {
        await updatePost(editing._id, payload);
        showToast('Post updated successfully', 'success');
      } else {
        await createPost(payload);
        showToast('Post created successfully', 'success');
      }
      setModalOpen(false);
      fetchPosts();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save post', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(deleteTarget._id);
      showToast('Post deleted', 'success');
      setDeleteTarget(null);
      fetchPosts();
    } catch {
      showToast('Failed to delete post', 'error');
    }
  };

  const togglePublish = async (post) => {
    try {
      await updatePost(post._id, { status: post.status === 'published' ? 'draft' : 'published' });
      fetchPosts();
    } catch {
      showToast('Failed to update post', 'error');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (r) => (
      <button className={`badge ${r.status === 'published' ? 'badge-success' : ''}`} style={{ cursor: 'pointer', border: 'none' }} onClick={() => togglePublish(r)}>
        {r.status}
      </button>
    ) },
    { key: 'views', label: 'Views' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h2>Blog Posts</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}><FaPlus /> New Post</button>
      </div>

      <div style={{ marginBottom: 20, maxWidth: 320 }}>
        <SearchBar placeholder="Search posts…" onSearch={setSearch} />
      </div>

      <DataTable
        columns={columns}
        rows={posts}
        loading={loading}
        emptyMessage="No blog posts yet. Write your first one."
        actions={(row) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => openEdit(row)} aria-label="Edit"><FaEdit /></button>
            <button className="btn btn-sm" style={{ background: 'var(--color-danger)', color: '#fff' }} onClick={() => setDeleteTarget(row)} aria-label="Delete"><FaTrash /></button>
          </div>
        )}
      />

      {modalOpen && (
        <Modal title={editing ? 'Edit Post' : 'New Post'} onClose={() => setModalOpen(false)} width={680}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Excerpt *</label>
              <textarea className="form-control" rows={2} required maxLength={300} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea className="form-control" rows={8} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image *</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
              {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploading…</p>}
              {form.coverImage && <img src={form.coverImage} alt="" style={{ marginTop: 8, height: 80, borderRadius: 8 }} />}
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
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Tags (comma-separated)</label>
              <input className="form-control" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">SEO Title</label>
              <input className="form-control" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">SEO Description</label>
              <textarea className="form-control" rows={2} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}
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

export default AdminBlog;
