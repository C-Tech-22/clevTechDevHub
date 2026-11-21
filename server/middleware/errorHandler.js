const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

// Translates known Mongo/Mongoose errors into consistent, client-safe messages.
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof AppError)) {
    let message = error.message || 'Something went wrong';
    let statusCode = error.statusCode || 500;

    if (error.name === 'CastError') {
      message = `Invalid value for ${error.path}`;
      statusCode = 400;
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      message = `Duplicate value for field: ${field}`;
      statusCode = 409;
    }
    if (error.name === 'ValidationError') {
      message = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
      statusCode = 400;
    }

    error = new AppError(message, statusCode);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
