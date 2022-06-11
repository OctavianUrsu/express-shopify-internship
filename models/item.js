const mongoose = require('mongoose');
const clearItems = require('../services/clearItems');

const Schema = mongoose.Schema;

// Create a mongoose schema for the 'Item' object
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

// Middleware: delete items from all warehouses, if item is deleted from products
itemSchema.pre('deleteOne', async function (next) {
  const id = this.getQuery()['_id']; // get id of item

  try {
    await clearItems(id); // if found, delete items from warehouses
    next();
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model('Item', itemSchema);
