const express = require('express');
const { login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { loginValidator } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/login', authLimiter, loginValidator, validateRequest, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
