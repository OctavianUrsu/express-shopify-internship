const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: {type: String, required: false},
  description: { type: String, required: false },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Beverages'],
    required: true,
  },
  costPerItem: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalValue: {type: Number, required: false}
});

module.exports = mongoose.model('Item', itemSchema);
