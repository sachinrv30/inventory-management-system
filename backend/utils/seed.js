const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product'); // Adjust path to your Product model

// Load env vars
dotenv.config({ path: '../.env' }); // Adjust path to your .env file

const realisticProducts = [
  { name: 'Quantum Core Processor X9', sku: 'CPU-QC-X9-001', category: 'Hardware', price: 849.99, quantity: 42 },
  { name: 'Neural Engine Accelerator', sku: 'AI-NPU-500', category: 'Hardware', price: 1299.50, quantity: 15 },
  { name: 'Cloud Vector Database License', sku: 'SW-VDB-ENTERPRISE', category: 'Software', price: 499.00, quantity: 120 },
  { name: 'Ergonomic Developer Keyboard', sku: 'PER-KEY-09', category: 'Peripherals', price: 145.00, quantity: 8 },
  { name: 'High-Fidelity Server Rack', sku: 'HW-RACK-42U', category: 'Infrastructure', price: 1100.00, quantity: 3 },
  { name: 'Proximity Security Token', sku: 'SEC-TOK-00A', category: 'Security', price: 45.00, quantity: 350 },
  { name: 'AI Reasoning API Credits (1M)', sku: 'API-CRED-1M', category: 'Software', price: 20.00, quantity: 5000 },
  { name: 'Glassmorphic UI Template', sku: 'ASSET-UI-GLS', category: 'Digital Assets', price: 49.99, quantity: 999 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stockpilot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Wipe existing data to ensure a clean slate
    await Product.deleteMany();
    console.log('Previous data cleared.');

    // Insert new realistic data
    await Product.insertMany(realisticProducts);
    console.log('Stockpilot Database Seeded Successfully! 🚀');

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedDB();