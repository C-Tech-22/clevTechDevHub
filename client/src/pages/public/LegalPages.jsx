import SectionHeader from '../../components/SectionHeader.jsx';

export const PrivacyPolicy = () => (
  <section className="section" style={{ paddingTop: 100 }}>
    <div className="container" style={{ maxWidth: 760 }}>
      <SectionHeader align="left" eyebrow="Legal" title="Privacy Policy" />
      <p>
        ClevTech DevHub collects only the information you provide through our contact and quote request forms —
        name, email, phone, company, and project details — to respond to your inquiry. We also record anonymous,
        non-identifying analytics events (such as page views) to understand how the site is used. We do not sell
        or share your personal information with third parties.
      </p>
      <p>
        Contact {`hello@clevtechdevhub.com`} if you'd like your data removed from our records.
      </p>
    </div>
  </section>
);

export const Terms = () => (
  <section className="section" style={{ paddingTop: 100 }}>
    <div className="container" style={{ maxWidth: 760 }}>
      <SectionHeader align="left" eyebrow="Legal" title="Terms of Service" />
      <p>
        By using this website, you agree to use it only for lawful purposes. Content on this site, including
        project case studies and blog articles, is the property of ClevTech DevHub and may not be reproduced
        without permission. Quote requests and contact submissions do not constitute a binding agreement until
        confirmed in writing by both parties.
      </p>
    </div>
  </section>
);
