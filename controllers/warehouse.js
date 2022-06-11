const Warehouse = require('../models/warehouse');
const Item = require('../models/item');

exports.getWarehouse = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();

    res.render('warehouse', {
      pageTitle: 'Warehouses',
      path: '/warehouse',
      warehouse: warehouses,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddWarehouse = (req, res) => {
  res.render('edit-warehouse', {
    pageTitle: 'Add Warehouse',
    path: '/warehouse/add',
    editing: false,
  });
};

exports.postAddWarehouse = async (req, res) => {
  const city = req.body.city;
  const postCode = req.body.postCode;
  const country = req.body.country;

  const warehouse = new Warehouse({
    city: city,
    postCode: postCode,
    country: country,
    items: [],
  });

  try {
    await warehouse.save();
    res.redirect('/warehouse');
  } catch (error) {
    console.log(error);
  }
};

exports.getEditWarehouse = async (req, res) => {
  const warehouseId = req.params.warehouseId;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      res.redirect('/warehouse');
    }

    res.render('edit-warehouse', {
      pageTitle: 'Edit Warehouse',
      path: '/edit-warehouse',
      warehouse: warehouse,
      editing: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditWarehouse = async (req, res) => {
  const warehouseId = req.body.warehouseId;
  const updatedCity = req.body.city;
  const updatedPostCode = req.body.postCode;
  const updatedCountry = req.body.country;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    warehouse.city = updatedCity;
    warehouse.postCode = updatedPostCode;
    warehouse.country = updatedCountry;

    await warehouse.save();
    res.redirect('/warehouse');
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteWarehouse = async (req, res) => {
  const warehouseId = req.body.warehouseId;

  try {
    await Warehouse.findByIdAndRemove(warehouseId);
    res.redirect('/warehouse');
  } catch (error) {
    console.log(error);
  }
};

exports.getWarehouseInventory = async (req, res) => {
  const warehouseId = req.params.warehouseId;

  try {
    const warehouse = await Warehouse.findById(warehouseId).populate(
      'inventory.itemId'
    );
    const items = warehouse.inventory;

    res.render('inventory', {
      pageTitle: 'Warehouses',
      path: '/inventory',
      items: items,
      warehouse: warehouse,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteWarehouseItem = async (req, res) => {
  const itemId = req.body.itemId;
  const warehouseId = req.body.warehouseId;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    const updatedInventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() !== itemId.toString()
    );

    warehouse.inventory = updatedInventory;

    await warehouse.save();

    res.redirect(`/warehouse/${warehouseId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getEditWarehouseItem = async (req, res) => {
  const warehouseId = req.params.warehouseId;
  const itemId = req.params.itemId;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    const item = await Item.findById(itemId);
    const inventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() === itemId.toString()
    ); 
    const quantity = inventory[0].quantity

    res.render('edit-inventory', {
      pageTitle: 'Edit inventory',
      path: '/warehouse',
      warehouse: warehouse,
      item: item,
      quantity: quantity
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditWarehouseItem = async (req, res) => {
  const warehouseId = req.body.warehouseId;
  const itemId = req.body.itemId;
  const updatedQuantity = req.body.quantity;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    const inventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() === itemId.toString()
    ); 
    inventory[0].quantity = updatedQuantity

    await warehouse.save();
    res.redirect(`/warehouse/${warehouseId}`)
  } catch (error) {
    console.log(error);
  }
}