import SectionHeader from '../../components/SectionHeader.jsx';
import QuoteForm from '../../components/QuoteForm.jsx';

const RequestQuote = () => (
  <section className="section" style={{ paddingTop: 100 }}>
    <div className="container" style={{ maxWidth: 760 }}>
      <SectionHeader
        eyebrow="Get Started"
        title="Request a Quote"
        description="Tell us about your project and we'll follow up with a clear scope and estimate."
      />
      <div className="card" style={{ padding: 32 }}>
        <QuoteForm />
      </div>
    </div>
  </section>
);

export default RequestQuote;
