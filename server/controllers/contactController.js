const contactService = require('../services/contactService');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const submitMessage = asyncHandler(async (req, res) => {
  const message = await contactService.createMessage(req.body);
  AnalyticsEvent.create({ type: 'contact_submission', path: '/contact' }).catch(() => {});
  success(res, 201, 'Your message has been sent. We will get back to you shortly.', message);
});

const getMessages = asyncHandler(async (req, res) => {
  const { items, meta } = await contactService.listMessages(req.query);
  success(res, 200, 'Messages fetched successfully', items, { meta });
});

const updateMessageStatus = asyncHandler(async (req, res) => {
  const message = await contactService.updateMessageStatus(req.params.id, req.body.status);
  success(res, 200, 'Message status updated successfully', message);
});

const deleteMessage = asyncHandler(async (req, res) => {
  await contactService.deleteMessage(req.params.id);
  success(res, 200, 'Message deleted successfully');
});

module.exports = { submitMessage, getMessages, updateMessageStatus, deleteMessage };
