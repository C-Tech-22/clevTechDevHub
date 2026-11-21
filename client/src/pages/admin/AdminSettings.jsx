import { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext.jsx';
import { getSettings, updateSettings } from '../../services/miscService.js';
import Loader from '../../components/Loader.jsx';
import { ErrorState } from '../../components/EmptyErrorStates.jsx';

const socialFields = ['github', 'linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'whatsapp'];

const AdminSettings = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    setError(false);
    getSettings()
      .then(setForm)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <Loader label="Loading settings…" />;
  if (error || !form) {
    return <ErrorState title="Couldn't load settings" message="Check that the API server is running, then try again." onRetry={load} />;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateSettings(form);
      setForm(updated);
      showToast('Settings updated successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setSocial = (key, value) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [key]: value } }));

  return (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ marginBottom: 24 }}>Site Settings</h2>

      <form onSubmit={handleSave}>
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h4 style={{ marginBottom: 16 }}>Company Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-control" value={form.companyName} onChange={(e) => set('companyName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input className="form-control" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">About Text</label>
            <textarea className="form-control" rows={3} value={form.aboutText} onChange={(e) => set('aboutText', e.target.value)} />
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h4 style={{ marginBottom: 16 }}>Contact Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-control" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">WhatsApp Number (with country code, digits only)</label>
              <input className="form-control" placeholder="2348012345678" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-control" value={form.address} onChange={(e) => set('address', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h4 style={{ marginBottom: 16 }}>Social Links</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {socialFields.map((key) => (
              <div className="form-group" key={key}>
                <label className="form-label" style={{ textTransform: 'capitalize' }}>{key}</label>
                <input className="form-control" value={form.socialLinks?.[key] || ''} onChange={(e) => setSocial(key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h4 style={{ marginBottom: 16 }}>SEO Defaults</h4>
          <div className="form-group">
            <label className="form-label">SEO Title</label>
            <input className="form-control" value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">SEO Description</label>
            <textarea className="form-control" rows={2} value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h4 style={{ marginBottom: 16 }}>Maintenance Mode</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
            <input type="checkbox" checked={form.maintenanceMode} onChange={(e) => set('maintenanceMode', e.target.checked)} />
            Put the public site into maintenance mode
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
