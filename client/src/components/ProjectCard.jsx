import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const statusColors = {
  Completed: 'badge-success',
  'In Development': 'badge-warning',
  Maintenance: 'badge-warning',
  Planning: '',
  Archived: 'badge-danger',
};

const ProjectCard = ({ project }) => (
  <article className="card slide-up" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ aspectRatio: '16/10', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
      <img
        src={project.image}
        alt={`${project.title} cover screenshot`}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span className="badge">{project.category}</span>
        <span className={`badge ${statusColors[project.status] || ''}`}>{project.status}</span>
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>{project.title}</h3>
      <p style={{ fontSize: '0.9rem', flex: 1 }}>{project.shortDescription}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '10px 0' }}>
        {project.technologies?.slice(0, 4).map((tech) => (
          <span key={tech} className="badge mono" style={{ fontSize: '0.7rem' }}>
            {tech}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
        <Link to={`/portfolio/${project.slug}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          View Project
        </Link>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository" className="btn btn-outline btn-sm">
            <FaGithub />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live demo" className="btn btn-outline btn-sm">
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
