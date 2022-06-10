const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

warehouseSchema.methods.addToInventory = function (item, quantity) {
  const invetoryItemIndex = this.inventory.findIndex(
    (inventoryItem) => inventoryItem.itemId.toString() === item._id.toString()
  );

  let intQuantity = parseInt(quantity);
  let newQuantity;
  const updatedInventory = [...this.inventory];

  if (invetoryItemIndex >= 0) {
    newQuantity = this.inventory[invetoryItemIndex].quantity + intQuantity;
    updatedInventory[invetoryItemIndex].quantity = newQuantity;
  } else {
    updatedInventory.push({
      itemId: item._id,
      quantity: intQuantity,
    });
  }

  this.inventory = updatedInventory;
  return this.save();
};

module.exports = mongoose.model('Warehouse', warehouseSchema);
