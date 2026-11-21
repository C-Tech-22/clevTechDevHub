import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="section" style={{ paddingTop: 140, textAlign: 'center' }}>
    <div className="container">
      <span className="text-gradient mono" style={{ fontSize: '4rem', fontWeight: 800 }}>404</span>
      <h1 style={{ fontSize: '1.6rem', marginTop: 10, marginBottom: 10 }}>Page not found</h1>
      <p style={{ maxWidth: 400, margin: '0 auto 24px' }}>The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  </section>
);

export default NotFound;
