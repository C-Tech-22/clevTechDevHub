const SiteSettings = require('../models/SiteSettings');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSettings();
  success(res, 200, 'Settings fetched successfully', settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSettings();
  Object.assign(settings, req.body);
  await settings.save();
  success(res, 200, 'Settings updated successfully', settings);
});

module.exports = { getSettings, updateSettings };
