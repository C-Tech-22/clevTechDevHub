// Keeps every controller returning the exact same envelope shape.
const success = (res, statusCode, message, data = null, extra = {}) => {
  return res.status(statusCode).json({ success: true, message, data, ...extra });
};

module.exports = { success };
