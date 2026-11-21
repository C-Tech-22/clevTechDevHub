import ProjectCard from './ProjectCard.jsx';
import { SkeletonCard } from './Skeleton.jsx';
import { EmptyState } from './EmptyErrorStates.jsx';

const ProjectGrid = ({ projects, loading, columns = 3 }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`,
    gap: 24,
  };

  if (loading) {
    return (
      <div style={gridStyle}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!projects?.length) {
    return <EmptyState title="No projects found" message="Try a different category or search term." />;
  }

  return (
    <div style={gridStyle}>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
