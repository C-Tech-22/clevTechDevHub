import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import { ErrorState } from '../../components/EmptyErrorStates.jsx';
import ProjectCard from '../../components/ProjectCard.jsx';
import { getProjectBySlug } from '../../services/projectService.js';

const caseStudySections = [
  ['problem', 'The Problem'],
  ['solution', 'The Solution'],
  ['architecture', 'Architecture'],
  ['challenges', 'Challenges'],
  ['results', 'Results'],
];

const ProjectDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    getProjectBySlug(slug)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [slug]);

  if (loading) return <Loader label="Loading project…" />;
  if (error || !data) return <ErrorState title="Project not found" message="This project may have been unpublished or moved." onRetry={load} />;

  const { project, related } = data;

  return (
    <article>
      <section style={{ paddingTop: 110, paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
            <FaArrowLeft /> Back to Portfolio
          </Link>
          <span className="badge" style={{ marginBottom: 14, display: 'inline-block' }}>{project.category}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: 14 }}>{project.title}</h1>
          <p style={{ fontSize: '1.05rem' }}>{project.shortDescription}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                <FaGithub /> View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 900 }}>
        <img
          src={project.image}
          alt={`${project.title} hero screenshot`}
          style={{ width: '100%', borderRadius: 16, border: '1px solid var(--border-subtle)', marginBottom: 40 }}
          onError={(e) => (e.target.style.display = 'none')}
        />

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>Overview</h2>
          <p>{project.description}</p>
        </section>

        {project.features?.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Key Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {project.features.map((f) => (
                <div key={f} className="card" style={{ padding: '14px 16px', fontSize: '0.9rem' }}>{f}</div>
              ))}
            </div>
          </section>
        )}

        {caseStudySections.map(([key, label]) =>
          project[key] ? (
            <section key={key} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>{label}</h2>
              <p>{project[key]}</p>
            </section>
          ) : null
        )}

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Technologies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.technologies?.map((t) => (
              <span key={t} className="badge mono">{t}</span>
            ))}
          </div>
        </section>

        {project.screenshots?.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Screenshots</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              {project.screenshots.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" style={{ borderRadius: 10, border: '1px solid var(--border-subtle)' }} onError={(e) => (e.target.style.display = 'none')} />
              ))}
            </div>
          </section>
        )}
      </div>

      {related?.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.3rem', marginBottom: 20 }}>Related Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
              {related.map((p) => <ProjectCard key={p._id} project={p} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectDetail;
