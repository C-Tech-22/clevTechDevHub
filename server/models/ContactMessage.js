const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    service: { type: String, default: '' },
    budget: { type: String, default: '' },
    message: { type: String, required: true, maxlength: 2000 },
    status: { type: String, enum: ['Unread', 'Read', 'Replied', 'Archived'], default: 'Unread', index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
