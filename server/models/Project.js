const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Web Development', 'Full Stack', 'Frontend', 'Backend', 'Dashboard', 'E-commerce', 'UI/UX'],
      index: true,
    },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    architecture: { type: String, default: '' },
    challenges: { type: String, default: '' },
    results: { type: String, default: '' },
    image: { type: String, required: true },
    screenshots: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Planning', 'In Development', 'Completed', 'Maintenance', 'Archived'],
      default: 'Completed',
    },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', technologies: 'text', category: 'text' });

module.exports = mongoose.model('Project', projectSchema);
