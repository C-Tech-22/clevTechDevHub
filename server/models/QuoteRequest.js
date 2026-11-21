const mongoose = require('mongoose');

const internalNoteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    deadline: { type: String, default: '' },
    description: { type: String, required: true, maxlength: 3000 },
    referenceWebsite: { type: String, default: '' },
    additionalRequirements: { type: String, default: '' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'Approved', 'In Progress', 'Completed', 'Rejected'],
      default: 'New',
      index: true,
    },
    internalNotes: [internalNoteSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
