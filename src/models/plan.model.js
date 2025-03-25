const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['semanal', 'quincenal', 'mensual'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);
