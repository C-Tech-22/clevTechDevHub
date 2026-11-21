import SectionHeader from '../../components/SectionHeader.jsx';
import ContactForm from '../../components/ContactForm.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const { settings } = useSite();

  return (
    <section className="section" style={{ paddingTop: 100 }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 48 }} id="contact-grid">
        <div>
          <SectionHeader align="left" eyebrow="Contact" title="Let's Talk" description="Send us a message and we'll get back to you within one business day." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <FaEnvelope style={{ color: 'var(--color-blue)' }} />
              <span>{settings?.email || 'hello@clevtechdevhub.com'}</span>
            </div>
            {settings?.phone && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <FaPhone style={{ color: 'var(--color-blue)' }} />
                <span>{settings.phone}</span>
              </div>
            )}
            {settings?.address && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <FaMapMarkerAlt style={{ color: 'var(--color-blue)' }} />
                <span>{settings.address}</span>
              </div>
            )}
          </div>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <ContactForm />
        </div>
      </div>
      <style>{`@media (max-width: 800px) { #contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export default Contact;
