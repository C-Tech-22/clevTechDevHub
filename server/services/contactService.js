const ContactMessage = require('../models/ContactMessage');
const AppError = require('../utils/AppError');
const { paginate, buildMeta } = require('../utils/paginate');

const createMessage = async (data) => ContactMessage.create(data);

const listMessages = async (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactMessage.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

const updateMessageStatus = async (id, status) => {
  const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!message) throw new AppError('Message not found', 404);
  return message;
};

const deleteMessage = async (id) => {
  const message = await ContactMessage.findByIdAndDelete(id);
  if (!message) throw new AppError('Message not found', 404);
  return message;
};

const countUnread = () => ContactMessage.countDocuments({ status: 'Unread' });

module.exports = { createMessage, listMessages, updateMessageStatus, deleteMessage, countUnread };
