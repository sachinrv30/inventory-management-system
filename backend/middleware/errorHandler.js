const { error } = require('../utils/ApiResponse');

// Central error handler. Every thrown/rejected error in the app ends up
// here (via asyncHandler or Express's default sync error handling).
// Known error shapes are translated into clean, user-safe messages;
// anything unrecognized becomes a generic 500 so internals never leak.
function errorHandler(err, req, res, _next) {
  console.error(err); // server-side log only, never sent to the client

  // Our own AppError instances already carry a safe message + status.
  if (err.isOperational) {
    return error(res, { statusCode: err.statusCode, message: err.message });
  }

  // Mongoose validation error (e.g. schema `required`/`min` checks failed).
  if (err.name === 'ValidationError') {
    const first = Object.values(err.errors)[0];
    return error(res, { statusCode: 400, message: first ? first.message : 'Invalid product data' });
  }

  // Malformed MongoDB ObjectId in a route param (e.g. /products/not-an-id).
  if (err.name === 'CastError') {
    return error(res, { statusCode: 400, message: 'Invalid product ID' });
  }

  // Duplicate key errors, if a unique index is ever added later.
  if (err.code === 11000) {
    return error(res, { statusCode: 409, message: 'A product with these details already exists' });
  }

  return error(res, { statusCode: 500, message: 'Something went wrong. Please try again.' });
}

module.exports = errorHandler;
