import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { submitQuote } from '../services/miscService.js';
import { useToast } from '../context/ToastContext.jsx';

const budgetOptions = ['₦50,000 - ₦100,000', '₦100,000 - ₦250,000', '₦250,000 - ₦500,000', '₦500,000+'];
const projectTypes = ['Website Development', 'Full-Stack Web Application', 'E-commerce', 'API Development', 'Admin Dashboard', 'Other'];

const QuoteForm = () => {
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
      await submitQuote(values);
      showToast('Quote request received. Our team will reach out soon.', 'success');
      setSubmitted(true);
      reset();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  if (submitted) {
    return (
      <div className="card fade-in" style={{ padding: 32, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 8 }}>Request received!</h3>
        <p>Thanks for the details — our team will review your project and follow up shortly.</p>
        <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="q-name">Name *</label>
          <input id="q-name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="q-email">Email *</label>
          <input id="q-email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="q-phone">Phone</label>
          <input id="q-phone" className="form-control" {...register('phone')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="q-company">Company</label>
          <input id="q-company" className="form-control" {...register('company')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="q-type">Project Type *</label>
          <select id="q-type" className={`form-control ${errors.projectType ? 'is-invalid' : ''}`} {...register('projectType', { required: 'Project type is required' })}>
            <option value="">Select a type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.projectType && <p className="form-error">{errors.projectType.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="q-budget">Budget *</label>
          <select id="q-budget" className={`form-control ${errors.budget ? 'is-invalid' : ''}`} {...register('budget', { required: 'Budget is required' })}>
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="form-error">{errors.budget.message}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row-2">
        <div className="form-group">
          <label className="form-label" htmlFor="q-deadline">Deadline</label>
          <input id="q-deadline" className="form-control" placeholder="e.g. Within 6 weeks" {...register('deadline')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="q-reference">Reference Website</label>
          <input id="q-reference" className={`form-control ${errors.referenceWebsite ? 'is-invalid' : ''}`} placeholder="https://" {...register('referenceWebsite')} />
          {errors.referenceWebsite && <p className="form-error">{errors.referenceWebsite.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="q-description">Project Description *</label>
        <textarea id="q-description" className={`form-control ${errors.description ? 'is-invalid' : ''}`} rows={5} {...register('description', { required: 'Project description is required', maxLength: 3000 })} />
        {errors.description && <p className="form-error">{errors.description.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="q-extra">Additional Requirements</label>
        <textarea id="q-extra" className="form-control" rows={3} {...register('additionalRequirements')} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
        {isSubmitting ? 'Submitting…' : 'Request a Quote'}
      </button>

      <style>{`@media (max-width: 600px) { .form-row-2 { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
};

export default QuoteForm;
