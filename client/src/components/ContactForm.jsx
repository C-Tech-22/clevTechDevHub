import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { submitContactMessage } from '../services/miscService.js';
import { useToast } from '../context/ToastContext.jsx';

const budgetOptions = ['₦50,000 - ₦100,000', '₦100,000 - ₦250,000', '₦250,000 - ₦500,000', '₦500,000+'];
const serviceOptions = ['Website Development', 'Full-Stack Web Application', 'E-commerce', 'API Development', 'Admin Dashboard', 'Other'];

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (values) => {
    try {
      await submitContactMessage(values);
      showToast('Message sent successfully. We will get back to you shortly.', 'success');
      setSubmitted(true);
      reset();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  if (submitted) {
    return (
      <div className="card fade-in" style={{ padding: 32, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 8 }}>Thanks for reaching out!</h3>
        <p>We've received your message and will respond within one business day.</p>
        <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name *</label>
          <input id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: 'Name is required', maxLength: 100 })} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email *</label>
          <input id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input id="phone" className="form-control" {...register('phone')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="company">Company</label>
          <input id="company" className="form-control" {...register('company')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="service">Service</label>
          <select id="service" className="form-control" {...register('service')}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="budget">Budget</label>
          <select id="budget" className="form-control" {...register('budget')}>
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message *</label>
        <textarea id="message" className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows={5} {...register('message', { required: 'Message is required', maxLength: 2000 })} />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>

      <style>{`@media (max-width: 600px) { .form-row-2 { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
};

export default ContactForm;
