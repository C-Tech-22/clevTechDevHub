const Skeleton = ({ width = '100%', height = 16, radius = 6, style = {} }) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />
);

export const SkeletonCard = () => (
  <div className="card" style={{ padding: 20 }}>
    <Skeleton height={160} radius={10} style={{ marginBottom: 16 }} />
    <Skeleton width="70%" height={18} style={{ marginBottom: 10 }} />
    <Skeleton width="90%" height={12} style={{ marginBottom: 8 }} />
    <Skeleton width="60%" height={12} />
  </div>
);

export default Skeleton;
