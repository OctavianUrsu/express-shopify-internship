const Warehouse = require('../models/warehouse');
const Item = require('../models/item');

// Get the warehouses and render them on warehouse page
exports.getWarehouse = async (req, res) => {
  try {
    // Find all warehouses
    const warehouses = await Warehouse.find();

    // Render warehouse page with all warehouses
    res.render('warehouse', {
      pageTitle: 'Warehouses',
      path: '/warehouse',
      warehouse: warehouses,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render the add warehouse page
exports.getAddWarehouse = (req, res) => {
  res.render('edit-warehouse', {
    pageTitle: 'Add Warehouse',
    path: '/warehouse/add',
    editing: false,
  });
};

// Add warehouse to database
exports.postAddWarehouse = async (req, res) => {
  // Get warehouse information from request body
  const city = req.body.city;
  const postCode = req.body.postCode;
  const country = req.body.country;

  try {
    // Validate if warehouse information exists
    if (city && postCode && country) {
      // If exists, create new warehouse from model
      const warehouse = new Warehouse({
        city: city,
        postCode: postCode,
        country: country,
        items: [],
      });

      // Save the warehouse to database and redirect to warehouse page
      await warehouse.save();
      res.redirect('/warehouse');
    } else {
      // If doesn't exist, redirect to an error page
      res.status(400);
      res.render('404', {
        pageTitle: 'Error',
        path: '/error',
        error: 'error: fill all fields',
      });
    }
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render the edit warehouse page
exports.getEditWarehouse = async (req, res) => {
  const warehouseId = req.params.warehouseId;

  try {
    // Find warehouse by id in database
    const warehouse = await Warehouse.findById(warehouseId);

    // Render the edit warehouse with filled warehouse information
    res.render('edit-warehouse', {
      pageTitle: 'Edit Warehouse',
      path: '/edit-warehouse',
      warehouse: warehouse,
      editing: true,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Update edited warehouse to database
exports.postEditWarehouse = async (req, res) => {
  // Get edited warehouse information from request body
  const warehouseId = req.body.warehouseId;
  const updatedCity = req.body.city;
  const updatedPostCode = req.body.postCode;
  const updatedCountry = req.body.country;

  try {
    // Validate if edited warehouse information exists
    if (updatedCity && updatedPostCode && updatedCountry) {
      // If exists, find warehouse by id in database
      const warehouse = await Warehouse.findById(warehouseId);

      // Update the warehouse with edited information
      warehouse.city = updatedCity;
      warehouse.postCode = updatedPostCode;
      warehouse.country = updatedCountry;

      // Updated the warehouse in database and redirect to warehouse page
      await warehouse.save();
      res.redirect('/warehouse');
    } else {
      // If doesn't exist, redirect to an error page
      res.status(400);
      res.render('404', {
        pageTitle: 'Error',
        path: '/error',
        error: 'error: fill all fields',
      });
    }
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Delete warehouse from database
exports.postDeleteWarehouse = async (req, res) => {
  // Get warehouse id from request body
  const warehouseId = req.body.warehouseId;

  try {
    // Delete warehouse from database and redirect to warehouse page
    await Warehouse.findByIdAndRemove(warehouseId);
    res.redirect('/warehouse');
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render the inventory from selected warehouse
exports.getWarehouseInventory = async (req, res) => {
  // Get warehouse id from URL param
  const warehouseId = req.params.warehouseId;

  try {
    // Find the warehouse by id in database
    // and populate the item ref with item information
    const warehouse = await Warehouse.findById(warehouseId).populate(
      'inventory.itemId'
    );

    // Attribute the inventory to a variable
    const items = warehouse.inventory;

    // Render the page with inventory and warehouse information
    res.render('inventory', {
      pageTitle: 'Warehouses',
      path: '/inventory',
      items: items,
      warehouse: warehouse,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Delete inventory item from selected warehouse
exports.postDeleteWarehouseItem = async (req, res) => {
  // Get item, warehouse ids from request body
  const itemId = req.body.itemId;
  const warehouseId = req.body.warehouseId;

  try {
    // Find warehouse by id in database
    const warehouse = await Warehouse.findById(warehouseId);

    // Update the inventory with deleted item
    const updatedInventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() !== itemId.toString()
    );

    // Update the warehouse inventory with the updated inventory
    warehouse.inventory = updatedInventory;

    // Save the changes
    await warehouse.save();

    // Redirect to the warehouse inventory page
    res.redirect(`/warehouse/${warehouseId}`);
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render the edit item inventory page
exports.getEditWarehouseItem = async (req, res) => {
  // Get item, warehouse ids from URL params
  const warehouseId = req.params.warehouseId;
  const itemId = req.params.itemId;

  try {
    // Find item and warehouse by id in database
    const warehouse = await Warehouse.findById(warehouseId);
    const item = await Item.findById(itemId);

    // Get the selected item from inventory
    const inventory = warehouse.inventory.filter(
      (data) => data.itemId.toString() === itemId.toString()
    );

    // Get the current quantity of item
    const quantity = inventory[0].quantity;

    // Render the edit item inventory page with all information
    res.render('edit-inventory', {
      pageTitle: 'Edit inventory',
      path: '/warehouse',
      warehouse: warehouse,
      item: item,
      quantity: quantity,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

exports.postEditWarehouseItem = async (req, res) => {
  // Get item, warehouse ids from request body
  const warehouseId = req.body.warehouseId;
  const itemId = req.body.itemId;

  // Get the updated quantity from request body
  const updatedQuantity = req.body.quantity;

  try {
    // Validate if quantity was updated
    if (updatedQuantity) {
      // If yes, find warehouse by id
      const warehouse = await Warehouse.findById(warehouseId);

      // Get the selected item from inventory
      const inventory = warehouse.inventory.filter(
        (data) => data.itemId.toString() === itemId.toString()
      );

      // Update the quantity of selected item
      inventory[0].quantity = updatedQuantity;

      // Save the changes and redirect to warehouse inventory page
      await warehouse.save();
      res.redirect(`/warehouse/${warehouseId}`);
    } else {
      // If no, redirect to an error page
      res.status(400);
      res.render('404', {
        pageTitle: 'Error',
        path: '/error',
        error: 'error: fill all fields',
      });
    }
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};
