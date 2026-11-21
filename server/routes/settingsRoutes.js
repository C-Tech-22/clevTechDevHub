const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSettings); // public — powers footer, navbar, WhatsApp button, etc.
router.put('/', protect, updateSettings);

module.exports = router;
