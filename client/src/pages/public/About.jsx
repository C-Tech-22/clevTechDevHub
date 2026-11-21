import SectionHeader from '../../components/SectionHeader.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { FaBullseye, FaEye, FaHandshake, FaCode } from 'react-icons/fa';

const values = [
  { icon: FaCode, title: 'Craftsmanship', desc: 'Clean, maintainable code — not just code that happens to work today.' },
  { icon: FaHandshake, title: 'Transparency', desc: 'Clear communication about scope, timelines, and trade-offs at every stage.' },
  { icon: FaBullseye, title: 'Outcomes First', desc: 'Every technical decision is judged by whether it actually serves the business goal.' },
  { icon: FaEye, title: 'Long-Term Thinking', desc: 'Building systems that can grow, not just launch.' },
];

const About = () => {
  const { settings } = useSite();

  return (
    <div>
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeader
            eyebrow="About Us"
            title={`About ${settings?.companyName || 'ClevTech DevHub'}`}
            description={
              settings?.aboutText ||
              'ClevTech DevHub is the software development arm of ClevTech Global Ventures, building modern, reliable web platforms for businesses that need more than a static website.'
            }
          />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} id="mission-vision">
          <div className="card" style={{ padding: 28 }}>
            <FaBullseye style={{ color: 'var(--color-blue)', fontSize: 24, marginBottom: 14 }} />
            <h3 style={{ marginBottom: 10 }}>Our Mission</h3>
            <p>To give growing businesses access to the same quality of engineering that large tech companies rely on — full-stack, secure, and built to last.</p>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <FaEye style={{ color: 'var(--color-purple)', fontSize: 24, marginBottom: 14 }} />
            <h3 style={{ marginBottom: 10 }}>Our Vision</h3>
            <p>To become a trusted long-term technology partner for businesses across West Africa and beyond, not just a one-time contractor.</p>
          </div>
        </div>
        <style>{`@media (max-width: 700px) { #mission-vision { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Values" title="What Guides Our Work" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {values.map((v) => (
              <div key={v.title} className="card" style={{ padding: 24 }}>
                <v.icon style={{ color: 'var(--color-blue)', fontSize: 20, marginBottom: 12 }} />
                <h4 style={{ marginBottom: 6, fontSize: '1rem' }}>{v.title}</h4>
                <p style={{ fontSize: '0.88rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28, alignItems: 'start' }} id="dev-section">
          <div
            style={{
              width: 140, height: 140, borderRadius: 20, background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 42, fontWeight: 800,
            }}
            aria-hidden="true"
          >
            CT
          </div>
          <div>
            <SectionHeader align="left" eyebrow="The Developer" title="About the Developer" />
            <p>
              ClevTech DevHub is led by a full-stack developer focused on building production-grade web applications
              using React, Node.js, Express, and MongoDB. The approach favors clear architecture and maintainable
              code over quick, disposable builds — every project is treated as software that has to keep working
              long after launch.
            </p>
            <p>Available for full-stack builds, API development, dashboard systems, and ongoing website maintenance.</p>
          </div>
        </div>
        <style>{`@media (max-width: 640px) { #dev-section { grid-template-columns: 1fr !important; text-align: center; } #dev-section > div:first-child { margin: 0 auto; } }`}</style>
      </section>
    </div>
  );
};

export default About;
