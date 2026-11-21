const FilterBar = ({ options, active, onChange }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="group" aria-label="Filter">
    {options.map((opt) => (
      <button
        key={opt}
        className="btn btn-sm"
        onClick={() => onChange(opt)}
        aria-pressed={active === opt}
        style={{
          background: active === opt ? 'var(--gradient-brand)' : 'var(--bg-elevated)',
          color: active === opt ? '#fff' : 'var(--text-secondary)',
          border: active === opt ? 'none' : '1px solid var(--border-subtle)',
        }}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default FilterBar;
