// A known, expected error with an HTTP status attached — thrown from
// services/controllers for things like "not found" or "bad input" so
// the central error handler can respond with the right status code.
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
