import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaReact, FaNodeJs, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaBootstrap, FaArrowRight,
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiJavascript } from 'react-icons/si';
import SectionHeader from '../../components/SectionHeader.jsx';
import ProjectGrid from '../../components/ProjectGrid.jsx';
import { ServiceCard, TechnologyCard } from '../../components/ServiceTechCards.jsx';
import TestimonialCard from '../../components/TestimonialCard.jsx';
import { EmptyState } from '../../components/EmptyErrorStates.jsx';
import { getProjects } from '../../services/projectService.js';
import { getServices, getTestimonials } from '../../services/miscService.js';

const technologies = [
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
  { name: 'Bootstrap', icon: FaBootstrap },
  { name: 'Git', icon: FaGitAlt },
  { name: 'GitHub', icon: FaGithub },
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Understanding your goals, users, and constraints before writing a line of code.' },
  { step: '02', title: 'Planning', desc: 'Mapping features, data models, and timeline into a clear project plan.' },
  { step: '03', title: 'UI/UX Design', desc: 'Wireframing and designing an interface that is both usable and on-brand.' },
  { step: '04', title: 'Development', desc: 'Building the frontend and backend in parallel, with regular check-ins.' },
  { step: '05', title: 'Testing', desc: 'Manual and functional testing across devices before anything ships.' },
  { step: '06', title: 'Deployment', desc: 'Shipping to production with proper environment and security configuration.' },
  { step: '07', title: 'Maintenance', desc: 'Ongoing support, updates, and improvements after launch.' },
];

const skills = [
  { label: 'Frontend Development', value: 90 },
  { label: 'Backend Development', value: 85 },
  { label: 'Database Development', value: 85 },
  { label: 'API Development', value: 90 },
  { label: 'UI Implementation', value: 88 },
  { label: 'Responsive Design', value: 92 },
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProjects({ featured: 'true', limit: 6 }),
      getServices(),
      getTestimonials(),
    ])
      .then(([projectsRes, servicesRes, testimonialsRes]) => {
        setProjects(projectsRes.data);
        setServices(servicesRes.slice(0, 6));
        setTestimonials(testimonialsRes.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '110px 0 90px', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.14), transparent 40%), radial-gradient(circle at 80% 60%, rgba(139,92,246,0.12), transparent 45%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }} id="hero-grid">
          <div className="fade-in">
            <span className="badge mono" style={{ marginBottom: 20, display: 'inline-block' }}>ClevTech Global Ventures</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 18 }}>
              Building Digital Products That{' '}
              <span className="text-gradient">Move Businesses Forward.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 520, marginBottom: 28 }}>
              ClevTech DevHub designs and builds modern websites, full-stack web applications, APIs, dashboards,
              and custom software for growing businesses — end to end, from database to interface.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/request-a-quote" className="btn btn-primary">
                Start a Project <FaArrowRight />
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="slide-up" aria-hidden="true">
            <div className="card mono" style={{ padding: 22, fontSize: '0.82rem', lineHeight: 1.7, boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <div style={{ color: 'var(--color-purple)' }}>const <span style={{ color: 'var(--text-primary)' }}>project</span> = {'{'}</div>
              <div style={{ paddingLeft: 16 }}>client: <span style={{ color: 'var(--color-blue)' }}>'your-business'</span>,</div>
              <div style={{ paddingLeft: 16 }}>stack: [<span style={{ color: 'var(--color-blue)' }}>'React'</span>, <span style={{ color: 'var(--color-blue)' }}>'Node'</span>, <span style={{ color: 'var(--color-blue)' }}>'MongoDB'</span>],</div>
              <div style={{ paddingLeft: 16 }}>status: <span style={{ color: 'var(--color-success)' }}>'shipped'</span>,</div>
              <div>{'};'}</div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 860px) { #hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* TECH STACK */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <SectionHeader eyebrow="Stack" title="Technologies We Build With" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 16 }}>
            {technologies.map((t) => (
              <TechnologyCard key={t.name} name={t.name} icon={t.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Services" title="What We Build" description="Full-cycle software development, from a single landing page to complete business platforms." />
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="card skeleton" style={{ height: 220 }} />)}
            </div>
          ) : services.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {services.map((s) => <ServiceCard key={s._id} service={s} />)}
            </div>
          ) : (
            <EmptyState title="Services coming soon" />
          )}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <SectionHeader eyebrow="Portfolio" title="Featured Projects" description="A selection of platforms and applications built for real businesses." />
          <ProjectGrid projects={projects} loading={loading} />
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/portfolio" className="btn btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Process" title="How We Work" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {processSteps.map((p) => (
              <div key={p.step} className="card" style={{ padding: 22 }}>
                <span className="mono text-gradient" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{p.step}</span>
                <h4 style={{ margin: '10px 0 6px', fontSize: '1rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.85rem' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeader eyebrow="Expertise" title="Skills & Proficiency" />
          {skills.map((s) => (
            <div key={s.label} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.88rem' }}>
                <span>{s.label}</span>
                <span className="mono" style={{ color: 'var(--color-blue)' }}>{s.value}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                <div style={{ width: `${s.value}%`, height: '100%', background: 'var(--gradient-brand)', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Testimonials" title="What Clients Say" />
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="card skeleton" style={{ height: 200 }} />)}
            </div>
          ) : testimonials.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {testimonials.map((t) => <TestimonialCard key={t._id} testimonial={t} />)}
            </div>
          ) : (
            <EmptyState title="No testimonials yet" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: 12 }}>Have a project in mind? Let&rsquo;s build it.</h2>
          <p style={{ maxWidth: 480, margin: '0 auto 26px' }}>Tell us what you're trying to build and we'll get back to you with a clear plan and estimate.</p>
          <Link to="/request-a-quote" className="btn btn-primary">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
