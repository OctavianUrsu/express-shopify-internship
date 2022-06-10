const mongoose = require('mongoose');
const clearItems = require('../services/clearItems');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  description: { type: String, required: false },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Beverages'],
    required: true,
  },
});

// Middleware to delete items from all warehouses
itemSchema.pre('deleteOne', async function (next) {
  const id = this.getQuery()['_id'];

  try {
    await clearItems(id);
    next();
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model('Item', itemSchema);
