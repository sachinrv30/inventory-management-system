const mongoose = require('mongoose');

const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Stationery', 'Other'];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: 'Category must be one of: ' + CATEGORIES.join(', '),
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    minStock: {
      type: Number,
      required: [true, 'Minimum stock is required'],
      min: [0, 'Minimum stock cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

productSchema.index({ name: 'text' });

// Virtual: derived stock status, not stored, always in sync with quantity/minStock.
productSchema.virtual('status').get(function status() {
  if (this.quantity <= 0) return 'out-of-stock';
  if (this.quantity <= this.minStock) return 'low-stock';
  return 'healthy';
});

productSchema.virtual('inventoryValue').get(function inventoryValue() {
  return this.price * this.quantity;
});

module.exports = mongoose.model('Product', productSchema);
module.exports.CATEGORIES = CATEGORIES;
