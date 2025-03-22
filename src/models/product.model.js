const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    roastLevel: {
      type: String,
      enum: ['suave', 'medio', 'oscuro'],
      default: 'medio',
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
