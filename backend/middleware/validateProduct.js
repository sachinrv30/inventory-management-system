const { body, query, validationResult } = require('express-validator');
const { CATEGORIES } = require('../models/Product');
const { error } = require('../utils/ApiResponse');

// Shared field rules, reused by create (all required) and update (all optional).
function fieldRules({ requireAll }) {
  const maybeRequired = (chain) => (requireAll ? chain.exists({ checkFalsy: true }) : chain.optional());

  return [
    maybeRequired(body('name'))
      .isString().withMessage('Name must be text')
      .trim()
      .isLength({ min: 1, max: 120 }).withMessage('Name must be between 1 and 120 characters'),

    maybeRequired(body('category'))
      .isIn(CATEGORIES).withMessage(`Category must be one of: ${CATEGORIES.join(', ')}`),

    maybeRequired(body('price'))
      .isFloat({ min: 0 }).withMessage('Price must be a number greater than or equal to 0'),

    maybeRequired(body('quantity'))
      .isInt({ min: 0 }).withMessage('Quantity must be a whole number greater than or equal to 0'),

    maybeRequired(body('minStock'))
      .isInt({ min: 0 }).withMessage('Minimum stock must be a whole number greater than or equal to 0'),
  ];
}

const validateCreateProduct = fieldRules({ requireAll: true });
const validateUpdateProduct = fieldRules({ requireAll: false });

const validateListQuery = [
  query('search').optional().isString().trim(),
  query('category').optional().isIn([...CATEGORIES, 'All']),
  query('status').optional().isIn(['healthy', 'low-stock', 'out-of-stock', 'All']),
  query('sort').optional().isIn([
    'newest', 'oldest', 'price-asc', 'price-desc',
    'quantity-asc', 'quantity-desc', 'name-asc',
  ]),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
];

// Runs after any of the rule sets above; short-circuits with a 400 on the
// first validation problem instead of letting a bad request reach Mongo.
function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const first = result.array()[0];
    return error(res, { statusCode: 400, message: first.msg });
  }
  next();
}

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validateListQuery,
  handleValidationErrors,
};
