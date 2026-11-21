// Wraps an async route/controller so rejected promises reach the error middleware
// instead of crashing the process or requiring a try/catch in every function.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
