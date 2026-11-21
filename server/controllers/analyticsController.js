const AnalyticsEvent = require('../models/AnalyticsEvent');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const QuoteRequest = require('../models/QuoteRequest');
const ContactMessage = require('../models/ContactMessage');
const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

// Records a lightweight, anonymous page view. No cookies, no IP storage, no fingerprinting.
const trackEvent = asyncHandler(async (req, res) => {
  const { type, path } = req.body;
  await AnalyticsEvent.create({ type, path });
  success(res, 201, 'Event recorded');
});

// Powers the admin dashboard overview cards.
const getDashboardOverview = asyncHandler(async (req, res) => {
  const [totalProjects, publishedProjects, blogPosts, quoteRequests, unreadMessages, testimonials] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      BlogPost.countDocuments(),
      QuoteRequest.countDocuments(),
      ContactMessage.countDocuments({ status: 'Unread' }),
      Testimonial.countDocuments(),
    ]);

  const projectsByCategory = await Project.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const quotesByMonth = await QuoteRequest.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const activityByType = await AnalyticsEvent.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    { $group: { _id: '$type', count: { $sum: 1 } } },
  ]);

  const [recentProjects, recentQuotes, recentMessages] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).limit(5).select('title category status createdAt'),
    QuoteRequest.find().sort({ createdAt: -1 }).limit(5).select('name projectType status createdAt'),
    ContactMessage.find().sort({ createdAt: -1 }).limit(5).select('name subject status createdAt'),
  ]);

  success(res, 200, 'Dashboard overview fetched successfully', {
    cards: { totalProjects, publishedProjects, blogPosts, quoteRequests, unreadMessages, testimonials },
    charts: { projectsByCategory, quotesByMonth, activityByType },
    recent: { recentProjects, recentQuotes, recentMessages },
  });
});

module.exports = { trackEvent, getDashboardOverview };
