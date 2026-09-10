const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Add product (POST /products)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Get all products (GET /products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Low stock products (GET /products/low-stock)
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ["$quantity", "$minStock"] }
    });
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Update product (PUT /products/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Delete product (DELETE /products/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;