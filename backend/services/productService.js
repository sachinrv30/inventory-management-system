const mongoose = require('mongoose');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

const SORT_MAP = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  'quantity-asc': { quantity: 1 },
  'quantity-desc': { quantity: -1 },
  'name-asc': { name: 1 },
};

// Status can't be filtered with a plain field match since it's a virtual
// derived from quantity/minStock — build the equivalent Mongo condition.
function statusFilter(status) {
  if (status === 'out-of-stock') return { quantity: { $lte: 0 } };
  if (status === 'low-stock') {
    return { $expr: { $and: [{ $gt: ['$quantity', 0] }, { $lte: ['$quantity', '$minStock'] }] } };
  }
  if (status === 'healthy') return { $expr: { $gt: ['$quantity', '$minStock'] } };
  return {};
}

async function listProducts({ search, category, status, sort, page = 1, limit = 20 }) {
  const filter = {};

  if (search) filter.name = { $regex: search, $options: 'i' };
  if (category && category !== 'All') filter.category = category;
  if (status && status !== 'All') Object.assign(filter, statusFilter(status));

  const sortSpec = SORT_MAP[sort] || SORT_MAP.newest;
  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sortSpec).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

async function getProductById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid product ID', 400);
  }
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
}

async function createProduct(payload) {
  return Product.create(payload);
}

async function updateProduct(id, payload) {
  const product = await getProductById(id);
  Object.assign(product, payload);
  await product.save(); // runs schema validation on update, not just create
  return product;
}

async function deleteProduct(id) {
  const product = await getProductById(id);
  await product.deleteOne();
  return product;
}

async function getLowStockProducts() {
  return Product.find({
    $expr: { $lte: ['$quantity', '$minStock'] },
  }).sort({ quantity: 1 });
}

// One aggregation pipeline computes every dashboard KPI + the category
// breakdown in a single round trip to MongoDB, instead of pulling every
// product to the client and summing in JavaScript.
async function getStats() {
  const [totals] = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        totalUnits: { $sum: '$quantity' },
        totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
        lowStock: {
          $sum: {
            $cond: [
              { $and: [{ $gt: ['$quantity', 0] }, { $lte: ['$quantity', '$minStock'] }] },
              1,
              0,
            ],
          },
        },
        outOfStock: { $sum: { $cond: [{ $lte: ['$quantity', 0] }, 1, 0] } },
      },
    },
  ]);

  const byCategory = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        products: { $sum: 1 },
        value: { $sum: { $multiply: ['$price', '$quantity'] } },
      },
    },
    { $sort: { value: -1 } },
  ]);

  const empty = { totalProducts: 0, totalUnits: 0, totalValue: 0, lowStock: 0, outOfStock: 0 };
  const result = totals || empty;

  return {
    totalProducts: result.totalProducts,
    totalUnits: result.totalUnits,
    totalValue: result.totalValue,
    lowStock: result.lowStock,
    outOfStock: result.outOfStock,
    byCategory: byCategory.map((c) => ({ category: c._id, products: c.products, value: c.value })),
  };
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getStats,
};
