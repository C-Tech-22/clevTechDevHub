import { useEffect, useState, useCallback } from 'react';
import SectionHeader from '../../components/SectionHeader.jsx';
import ProjectGrid from '../../components/ProjectGrid.jsx';
import FilterBar from '../../components/FilterBar.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { getProjects } from '../../services/projectService.js';

const categories = ['All', 'Web Development', 'Full Stack', 'Frontend', 'Backend', 'Dashboard', 'E-commerce', 'UI/UX'];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProjects({ category, search: search || undefined, page, limit: 9 });
      setProjects(res.data);
      setMeta(res.meta);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => setPage(1), [category, search]);

  return (
    <section className="section" style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHeader eyebrow="Portfolio" title="Our Work" description="Real projects built end-to-end — frontend, backend, and database." />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', marginBottom: 32 }}>
          <FilterBar options={categories} active={category} onChange={setCategory} />
          <SearchBar placeholder="Search by name, tech, or category…" onSearch={setSearch} />
        </div>

        <ProjectGrid projects={projects} loading={loading} />
        <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />
      </div>
    </section>
  );
};

export default Portfolio;
