const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/ApiResponse');
const productService = require('../services/productService');

// Thin controllers: parse the request, call the service, shape the
// response. No business logic lives here — that's in productService.

const getProducts = asyncHandler(async (req, res) => {
  const { search, category, status, sort, page, limit } = req.query;
  const { items, pagination } = await productService.listProducts({ search, category, status, sort, page, limit });
  success(res, { message: 'Products retrieved successfully', data: { products: items, pagination } });
});

const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await productService.getLowStockProducts();
  success(res, { message: 'Low stock products retrieved successfully', data: { products } });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await productService.getStats();
  success(res, { message: 'Stats retrieved successfully', data: stats });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  success(res, { message: 'Product retrieved successfully', data: { product } });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  success(res, { statusCode: 201, message: 'Product created successfully', data: { product } });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  success(res, { message: 'Product updated successfully', data: { product } });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  success(res, { message: 'Product deleted successfully', data: null });
});

module.exports = {
  getProducts,
  getLowStockProducts,
  getStats,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
