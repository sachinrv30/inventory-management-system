const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and fill it in.');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);
  console.log(`MongoDB connected -> ${mongoose.connection.name}`);

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
}

module.exports = connectDatabase;
