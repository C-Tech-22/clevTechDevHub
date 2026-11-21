import { EmptyState } from '../EmptyErrorStates.jsx';
import { SkeletonCard } from '../Skeleton.jsx';

/**
 * columns: [{ key, label, render?(row) }]
 * actions: (row) => ReactNode — rendered in the last cell / bottom of card
 */
const DataTable = ({ columns, rows, loading, actions, emptyMessage = 'No records found.' }) => {
  if (loading) {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!rows?.length) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <>
      <div className="admin-table-wrap card" style={{ overflowX: 'auto' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              {columns.map((col) => (
                <th key={col.key} style={{ textAlign: 'left', padding: '14px 18px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  {col.label}
                </th>
              ))}
              {actions && <th style={{ padding: '14px 18px' }} />}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id || row.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && <td style={{ padding: '14px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card fallback */}
      <div className="admin-table-cards" style={{ display: 'none', flexDirection: 'column', gap: 12 }}>
        {rows.map((row) => (
          <div key={row._id || row.id} className="card" style={{ padding: 16 }}>
            {columns.map((col) => (
              <div key={col.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{col.label}</span>
                <span style={{ textAlign: 'right' }}>{col.render ? col.render(row) : row[col.key]}</span>
              </div>
            ))}
            {actions && <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{actions(row)}</div>}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .admin-table-wrap { display: none !important; }
          .admin-table-cards { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default DataTable;
