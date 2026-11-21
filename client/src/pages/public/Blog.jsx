import { useCallback, useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader.jsx';
import BlogCard from '../../components/BlogCard.jsx';
import FilterBar from '../../components/FilterBar.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { SkeletonCard } from '../../components/Skeleton.jsx';
import { EmptyState } from '../../components/EmptyErrorStates.jsx';
import { getPosts } from '../../services/blogService.js';

const categories = [
  'All', 'Web Development', 'React', 'JavaScript', 'Node.js', 'MongoDB', 'APIs', 'Software Engineering', 'Career', 'ClevTech News',
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts({ category, search: search || undefined, page, limit: 9 });
      setPosts(res.data);
      setMeta(res.meta);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => setPage(1), [category, search]);

  return (
    <section className="section" style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHeader eyebrow="Blog" title="Insights & Engineering Notes" description="Writing on full-stack development, architecture decisions, and lessons from real client projects." />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', marginBottom: 32 }}>
          <FilterBar options={categories} active={category} onChange={setCategory} />
          <SearchBar placeholder="Search articles…" onSearch={setSearch} />
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : posts.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {posts.map((p) => <BlogCard key={p._id} post={p} />)}
          </div>
        ) : (
          <EmptyState title="No articles found" message="Try a different category or search term." />
        )}

        <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />
      </div>
    </section>
  );
};

export default Blog;
