import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

const BlogCard = ({ post }) => (
  <article className="card slide-up" style={{ overflow: 'hidden' }}>
    <Link to={`/blog/${post.slug}`}>
      <div style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </Link>
    <div style={{ padding: 20 }}>
      <span className="badge" style={{ marginBottom: 10 }}>
        {post.category}
      </span>
      <h3 style={{ fontSize: '1.05rem', margin: '10px 0 8px' }}>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p style={{ fontSize: '0.88rem' }}>{post.excerpt}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginTop: 12,
        }}
      >
        <span>{formatDate(post.publishedAt)}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FaClock /> {post.readingTime} min read
        </span>
      </div>
    </div>
  </article>
);

export default BlogCard;
