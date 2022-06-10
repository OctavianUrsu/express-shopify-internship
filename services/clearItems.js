const Warehouse = require('../models/warehouse');

const clearItems = async (id) => {
  const warehouses = await Warehouse.find({ itemId: id });
  warehouses.forEach(async (wh) => {
    const warehouse = await Warehouse.findById(wh._id);
    const updatedInventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() !== id.toString()
    );

    warehouse.inventory = updatedInventory;

    await warehouse.save();
  });
};

module.exports = clearItems;
