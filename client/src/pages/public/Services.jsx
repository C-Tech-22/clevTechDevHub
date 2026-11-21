import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader.jsx';
import { ServiceCard } from '../../components/ServiceTechCards.jsx';
import { SkeletonCard } from '../../components/Skeleton.jsx';
import { EmptyState } from '../../components/EmptyErrorStates.jsx';
import { getServices } from '../../services/miscService.js';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="What We Offer"
            description="From a single landing page to a complete full-stack platform — services built around what your business actually needs."
          />
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : services.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {services.map((s) => <ServiceCard key={s._id} service={s} showLearnMore={false} />)}
            </div>
          ) : (
            <EmptyState title="Services coming soon" />
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-surface)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 10 }}>Not sure which service fits?</h2>
          <p style={{ maxWidth: 460, margin: '0 auto 24px' }}>Tell us about your project and we'll recommend the right approach.</p>
          <Link to="/request-a-quote" className="btn btn-primary">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
