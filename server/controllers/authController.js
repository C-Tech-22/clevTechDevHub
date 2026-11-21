const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const { NODE_ENV } = require('../config/env');

const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login(email, password);
  res.cookie('token', token, cookieOptions);
  success(res, 200, 'Login successful', { user, token });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  success(res, 200, 'Logged out successfully');
});

const getMe = asyncHandler(async (req, res) => {
  success(res, 200, 'Current user fetched', req.user.toSafeObject());
});

module.exports = { login, logout, getMe };
