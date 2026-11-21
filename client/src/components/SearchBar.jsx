import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ placeholder = 'Search…', onSearch, delay = 400 }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => onSearch(value.trim()), delay);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
      <FaSearch
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
      />
      <input
        type="search"
        className="form-control"
        style={{ paddingLeft: 38 }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchBar;
