import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import { ErrorState } from '../../components/EmptyErrorStates.jsx';
import { getPostBySlug } from '../../services/blogService.js';

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [slug]);

  if (loading) return <Loader label="Loading article…" />;
  if (error || !post) return <ErrorState title="Article not found" message="This post may have been unpublished or moved." onRetry={load} />;

  return (
    <article>
      <section style={{ paddingTop: 110, paddingBottom: 30 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
            <FaArrowLeft /> Back to Blog
          </Link>
          <span className="badge" style={{ marginBottom: 14, display: 'inline-block' }}>{post.category}</span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 14 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>By {post.author?.name || 'ClevTech DevHub'}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <FaClock /> {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 760 }}>
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: '100%', borderRadius: 16, border: '1px solid var(--border-subtle)', marginBottom: 32 }}
          onError={(e) => (e.target.style.display = 'none')}
        />
        <div style={{ fontSize: '1.02rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
          {post.content}
        </div>

        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 36 }}>
            {post.tags.map((tag) => (
              <span key={tag} className="badge mono">#{tag}</span>
            ))}
          </div>
        )}

        {post.author?.bio && (
          <div className="card" style={{ padding: 22, marginTop: 40, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
              {post.author.name?.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{post.author.name}</div>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>{post.author.bio}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost;
