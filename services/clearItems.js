const Warehouse = require('../models/warehouse');

// service that finds to be deleted items in any warehouse
const clearItems = async (id) => {
  // search for item in warehouses
  const warehouses = await Warehouse.find({ itemId: id });

  // if found, loop through warehouses
  warehouses.forEach(async (wh) => {
    // get the mongoose model of the warehouse
    const warehouse = await Warehouse.findById(wh._id);

    // update the inventory and delete the item
    const updatedInventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() !== id.toString()
    );

    // update the warehouse inventory
    warehouse.inventory = updatedInventory;

    // save updated warehouse to database
    await warehouse.save();
  });
};

module.exports = clearItems;
