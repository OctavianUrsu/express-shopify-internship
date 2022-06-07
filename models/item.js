const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Beverages'],
    required: true,
  },
  costPerItem: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
