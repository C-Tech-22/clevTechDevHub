const quoteService = require('../services/quoteService');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const submitQuote = asyncHandler(async (req, res) => {
  const quote = await quoteService.createQuote(req.body);
  AnalyticsEvent.create({ type: 'quote_request', path: '/request-a-quote' }).catch(() => {});
  success(res, 201, 'Your quote request has been received. Our team will reach out soon.', quote);
});

const getQuotes = asyncHandler(async (req, res) => {
  const { items, meta } = await quoteService.listQuotes(req.query);
  success(res, 200, 'Quote requests fetched successfully', items, { meta });
});

const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await quoteService.getQuoteById(req.params.id);
  success(res, 200, 'Quote request fetched successfully', quote);
});

const updateQuoteStatus = asyncHandler(async (req, res) => {
  const quote = await quoteService.updateQuoteStatus(req.params.id, req.body.status);
  success(res, 200, 'Quote status updated successfully', quote);
});

const addNote = asyncHandler(async (req, res) => {
  const quote = await quoteService.addNote(req.params.id, req.body.note, req.user._id);
  success(res, 200, 'Note added successfully', quote);
});

const deleteQuote = asyncHandler(async (req, res) => {
  await quoteService.deleteQuote(req.params.id);
  success(res, 200, 'Quote request deleted successfully');
});

module.exports = { submitQuote, getQuotes, getQuoteById, updateQuoteStatus, addNote, deleteQuote };
