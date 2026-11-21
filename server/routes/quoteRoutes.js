const express = require('express');
const {
  submitQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  addNote,
  deleteQuote,
} = require('../controllers/quoteController');
const { protect } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');
const { quoteValidator, statusValidator } = require('../validators/quoteValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/', formLimiter, quoteValidator, validateRequest, submitQuote);
router.get('/', protect, getQuotes);
router.get('/:id', protect, getQuoteById);
router.put('/:id/status', protect, statusValidator, validateRequest, updateQuoteStatus);
router.post('/:id/notes', protect, addNote);
router.delete('/:id', protect, deleteQuote);

module.exports = router;
