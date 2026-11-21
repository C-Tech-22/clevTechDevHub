import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 40 }}>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>
      {pages.map((p, i) => (
        <span key={p} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && pages[i - 1] !== p - 1 && <span style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>}
          <button
            className="btn btn-sm"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            style={{
              background: p === page ? 'var(--gradient-brand)' : 'transparent',
              color: p === page ? '#fff' : 'var(--text-secondary)',
              border: p === page ? 'none' : '1px solid var(--border-subtle)',
              minWidth: 38,
            }}
          >
            {p}
          </button>
        </span>
      ))}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
