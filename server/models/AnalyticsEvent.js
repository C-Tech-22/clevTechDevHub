const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['page_view', 'project_view', 'blog_view', 'quote_request', 'contact_submission'],
      required: true,
      index: true,
    },
    path: { type: String, default: '' },
    refId: { type: mongoose.Schema.Types.ObjectId, default: null }, // project/blog id if relevant
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);
