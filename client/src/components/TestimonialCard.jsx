import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => (
  <div className="card slide-up" style={{ padding: 26 }}>
    <FaQuoteLeft style={{ color: 'var(--color-purple)', opacity: 0.5, fontSize: 22, marginBottom: 12 }} />
    <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>&ldquo;{testimonial.testimonial}&rdquo;</p>
    <div style={{ display: 'flex', gap: 2, margin: '10px 0 14px' }} aria-label={`${testimonial.rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} color={i < testimonial.rating ? '#f59e0b' : 'var(--border-strong)'} size={13} />
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {testimonial.avatar ? (
          <img src={testimonial.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.target.style.display = 'none')} />
        ) : (
          testimonial.clientName?.charAt(0)
        )}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{testimonial.clientName}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {testimonial.position}
          {testimonial.company ? `, ${testimonial.company}` : ''}
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
