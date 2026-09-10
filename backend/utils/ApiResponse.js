/**
 * Small helpers to keep every API response in the exact same shape:
 *   success: { success: true, message, data }
 *   error:   { success: false, message }
 */
function success(res, { statusCode = 200, message = 'Success', data = null } = {}) {
  return res.status(statusCode).json({ success: true, message, data });
}

function error(res, { statusCode = 500, message = 'Something went wrong' } = {}) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { success, error };
