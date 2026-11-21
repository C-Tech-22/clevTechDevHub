const express = require('express');
const { trackEvent, getDashboardOverview } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/track', trackEvent); // public, fire-and-forget page view tracking
router.get('/overview', protect, getDashboardOverview);

module.exports = router;
