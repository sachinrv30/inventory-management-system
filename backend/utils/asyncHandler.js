// Wraps an async route handler so thrown/rejected errors are forwarded
// to Express's error middleware instead of crashing the process or
// requiring a try/catch in every controller.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
