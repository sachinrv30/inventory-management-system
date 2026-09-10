const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/stockpilot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.error(err));

// Product Schema matching assignment requirements
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  minStock: { type: Number, required: true, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// 1. Add product
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Map _id to id for frontend compatibility
    const formatted = products.map(p => ({
      id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      quantity: p.quantity,
      minStock: p.minStock,
      createdAt: p.createdAt
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Low stock products endpoint
app.get('/products/low-stock', async (req, res) => {
  try {
    const products = await Product.find({ $expr: { $lte: ["$quantity", "$minStock"] } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update product
app.put('/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Delete product
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5050, () => console.log('Server running on port 5050'));