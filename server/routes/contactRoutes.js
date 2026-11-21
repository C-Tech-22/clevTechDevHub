const express = require('express');
const { submitMessage, getMessages, updateMessageStatus, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');
const { contactValidator } = require('../validators/contactValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/', formLimiter, contactValidator, validateRequest, submitMessage);
router.get('/', protect, getMessages);
router.put('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
