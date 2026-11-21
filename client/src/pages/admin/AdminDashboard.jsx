import { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from 'chart.js';
import {
  FaFolderOpen, FaBlog, FaFileInvoiceDollar, FaEnvelopeOpenText, FaStar, FaCheckCircle,
} from 'react-icons/fa';
import StatCard from '../../components/admin/StatCard.jsx';
import ChartCard from '../../components/admin/ChartCard.jsx';
import Loader from '../../components/Loader.jsx';
import { ErrorState } from '../../components/EmptyErrorStates.jsx';
import { getDashboardOverview } from '../../services/miscService.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartColors = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    getDashboardOverview()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <Loader label="Loading dashboard…" />;
  if (error || !data) {
    return (
      <ErrorState
        title="Couldn't load the dashboard"
        message="Check that the API server is running and that you're still signed in, then try again."
        onRetry={load}
      />
    );
  }

  const { cards, charts, recent } = data;

  const doughnutData = {
    labels: charts.projectsByCategory.map((c) => c._id),
    datasets: [{ data: charts.projectsByCategory.map((c) => c.count), backgroundColor: chartColors, borderWidth: 0 }],
  };

  const barData = {
    labels: charts.quotesByMonth.map((q) => `${monthNames[q._id.month - 1]} ${q._id.year}`),
    datasets: [{ label: 'Quote Requests', data: charts.quotesByMonth.map((q) => q.count), backgroundColor: '#3b82f6', borderRadius: 6 }],
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: '#9aa4b8' } } },
    scales: { x: { ticks: { color: '#6b7488' }, grid: { color: '#232a38' } }, y: { ticks: { color: '#6b7488' }, grid: { color: '#232a38' } } },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Dashboard Overview</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Projects" value={cards.totalProjects} icon={FaFolderOpen} color="#3b82f6" />
        <StatCard label="Published Projects" value={cards.publishedProjects} icon={FaCheckCircle} color="#22c55e" />
        <StatCard label="Blog Posts" value={cards.blogPosts} icon={FaBlog} color="#8b5cf6" />
        <StatCard label="Quote Requests" value={cards.quoteRequests} icon={FaFileInvoiceDollar} color="#f59e0b" />
        <StatCard label="Unread Messages" value={cards.unreadMessages} icon={FaEnvelopeOpenText} color="#ef4444" />
        <StatCard label="Testimonials" value={cards.testimonials} icon={FaStar} color="#06b6d4" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }} id="chart-grid">
        <ChartCard title="Project Categories">
          {charts.projectsByCategory.length ? <Doughnut data={doughnutData} options={{ ...chartOptions, maintainAspectRatio: false }} /> : <p>No project data yet.</p>}
        </ChartCard>
        <ChartCard title="Monthly Quote Requests">
          {charts.quotesByMonth.length ? <Bar data={barData} options={chartOptions} /> : <p>No quote data yet.</p>}
        </ChartCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Recent Projects</h4>
          {recent.recentProjects.map((p) => (
            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span>{p.title}</span>
              <span className="badge">{p.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Recent Quote Requests</h4>
          {recent.recentQuotes.map((q) => (
            <div key={q._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span>{q.name}</span>
              <span className="badge">{q.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 14 }}>Recent Messages</h4>
          {recent.recentMessages.map((m) => (
            <div key={m._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span>{m.name}</span>
              <span className="badge">{m.status}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 800px) { #chart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default AdminDashboard;
