const { error } = require('../utils/ApiResponse');

// Catches any request that didn't match a route above it.
function notFound(req, res) {
  error(res, { statusCode: 404, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = notFound;
