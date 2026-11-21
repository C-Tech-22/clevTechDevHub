const QuoteRequest = require('../models/QuoteRequest');
const AppError = require('../utils/AppError');
const { paginate, buildMeta } = require('../utils/paginate');

const createQuote = async (data) => QuoteRequest.create(data);

const listQuotes = async (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    QuoteRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    QuoteRequest.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

const getQuoteById = async (id) => {
  const quote = await QuoteRequest.findById(id);
  if (!quote) throw new AppError('Quote request not found', 404);
  return quote;
};

const updateQuoteStatus = async (id, status) => {
  const quote = await QuoteRequest.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!quote) throw new AppError('Quote request not found', 404);
  return quote;
};

const addNote = async (id, note, userId) => {
  const quote = await QuoteRequest.findByIdAndUpdate(
    id,
    { $push: { internalNotes: { note, addedBy: userId } } },
    { new: true }
  );
  if (!quote) throw new AppError('Quote request not found', 404);
  return quote;
};

const deleteQuote = async (id) => {
  const quote = await QuoteRequest.findByIdAndDelete(id);
  if (!quote) throw new AppError('Quote request not found', 404);
  return quote;
};

module.exports = { createQuote, listQuotes, getQuoteById, updateQuoteStatus, addNote, deleteQuote };
