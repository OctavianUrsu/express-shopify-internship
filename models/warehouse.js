const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a mongoose schema for the 'Warehouse' object
const warehouseSchema = new Schema({
  city: { type: String, required: true },
  postCode: { type: Number, required: true },
  country: { type: String, required: true },
  inventory: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

// Method: used to add inventory to a warehouse
warehouseSchema.methods.addToInventory = function (item, quantity) {
  // Find if item already exists in warehouse inventory
  const invetoryItemIndex = this.inventory.findIndex(
    (inventoryItem) => inventoryItem.itemId.toString() === item._id.toString()
  );

  // Parse the quantity from string -> number
  let intQuantity = parseInt(quantity);

  // Create a variable for the new quantity
  let newQuantity;

  // Create a variable for the updated inventory and add existing inventory to it
  const updatedInventory = [...this.inventory];

  // If item already exists in warehouse
  if (invetoryItemIndex >= 0) {
    // Update the quantity with old quantity + new quantity
    newQuantity = this.inventory[invetoryItemIndex].quantity + intQuantity;

    // Update the quantity in the updated inventory
    updatedInventory[invetoryItemIndex].quantity = newQuantity;
  } else {
    // If item does not exist in warehouse -> add it
    updatedInventory.push({
      itemId: item._id,
      quantity: intQuantity,
    });
  }

  // Add the updated inventory to the warehouse and save
  this.inventory = updatedInventory;
  return this.save();
};

module.exports = mongoose.model('Warehouse', warehouseSchema);
