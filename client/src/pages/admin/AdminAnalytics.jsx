import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Loader from '../../components/Loader.jsx';
import { ErrorState } from '../../components/EmptyErrorStates.jsx';
import ChartCard from '../../components/admin/ChartCard.jsx';
import { getDashboardOverview } from '../../services/miscService.js';

const typeLabels = {
  page_view: 'Page Views',
  project_view: 'Project Views',
  blog_view: 'Blog Views',
  quote_request: 'Quote Requests',
  contact_submission: 'Contact Submissions',
};

const AdminAnalytics = () => {
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

  if (loading) return <Loader label="Loading analytics…" />;
  if (error || !data) {
    return <ErrorState title="Couldn't load analytics" message="Check that the API server is running, then try again." onRetry={load} />;
  }

  const activity = data.charts.activityByType;
  const barData = {
    labels: activity.map((a) => typeLabels[a._id] || a._id),
    datasets: [{ label: 'Events (last 6 months)', data: activity.map((a) => a.count), backgroundColor: '#8b5cf6', borderRadius: 6 }],
  };

  const options = {
    plugins: { legend: { labels: { color: '#9aa4b8' } } },
    scales: { x: { ticks: { color: '#6b7488' }, grid: { color: '#232a38' } }, y: { ticks: { color: '#6b7488' }, grid: { color: '#232a38' } } },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Analytics</h2>
      <p style={{ marginBottom: 20 }}>Internal, non-invasive tracking — no cookies or personal identifiers stored.</p>
      <ChartCard title="Website Activity (last 6 months)">
        {activity.length ? <Bar data={barData} options={options} /> : <p>No analytics data recorded yet.</p>}
      </ChartCard>
    </div>
  );
};

export default AdminAnalytics;
