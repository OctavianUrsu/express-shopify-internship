const Item = require('../models/item');
const Warehouse = require('../models/warehouse');

// Get the items and render them on index page
exports.getIndex = async (req, res) => {
  try {
    // Find all items
    const items = await Item.find();

    // Render index page with all items
    res.render('index', {
      items: items,
      pageTitle: 'Index',
      path: '/',
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render the add item page
exports.getAddItem = (req, res) => {
  res.render('edit-item', {
    pageTitle: 'Add Item',
    path: '/item/add',
    editing: false,
  });
};

// Add item to database
exports.postAddItem = async (req, res) => {
  // Get item information from request body
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const category = req.body.category;

  try {
    // Validate if item information exists
    if (name && imageUrl && description && category) {
      // If exists, create new item from model
      const item = new Item({
        name: name,
        imageUrl: imageUrl,
        description: description,
        category: category,
      });

      // Save the item to database and redirect to index page
      await item.save();
      res.redirect('/');
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

// Render the edit item page
exports.getEditItem = async (req, res) => {
  // Get item id from URL param
  const itemId = req.params.itemId;

  try {
    // Find item by id in database
    const item = await Item.findById(itemId);

    // Render the edit item with filled item information
    res.render('edit-item', {
      pageTitle: 'Edit Item',
      path: '/item/edit',
      item: item,
      editing: true,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Update edited item to database
exports.postEditItem = async (req, res) => {
  // Get edited item information from request body
  const itemId = req.body.itemId;
  const updatedName = req.body.name;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;

  try {
    // Validate if edited item information exists
    if (
      updatedName &&
      updatedImageUrl &&
      updatedDescription &&
      updatedCategory
    ) {
      // If exists, find item by id in database
      const item = await Item.findById(itemId);

      // Update the item with edited information
      item.name = updatedName;
      item.imageUrl = updatedImageUrl;
      item.description = updatedDescription;
      item.category = updatedCategory;

      // Updated the item in database and redirect to index page
      await item.save();
      res.redirect('/');
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

// Delete item from database
exports.postDeleteItem = async (req, res) => {
  // Get item id from request body
  const itemId = req.body.itemId;

  try {
    // Delete item from database and redirect to index page
    await Item.deleteOne({ _id: itemId });
    res.redirect('/');
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Render add item to a warehouse page
exports.getAddToWarehouse = async (req, res) => {
  // Get item id from URL param
  const itemId = req.params.itemId;

  try {
    // Find item by id in database
    const item = await Item.findById(itemId);

    // Find all warehouses in database
    const warehouses = await Warehouse.find();

    // Render the add item to warehouse page with information about
    // the item and about warehouses
    res.render('add-to-warehouse', {
      pageTitle: 'Add Item to Warehouse',
      path: '/inventory/add',
      item: item,
      warehouses: warehouses,
    });
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};

// Add item and quantity to a warehouse to database
exports.postAddToWarehouse = async (req, res) => {
  // Get item, warehouse ids from request body
  const warehouseId = req.body.warehouseId;
  const itemId = req.body.itemId;

  // Get item quantity from request body
  const quantity = req.body.quantity;

  try {
    // Find item and warehouse by id in database
    const warehouse = await Warehouse.findById(warehouseId);
    const item = await Item.findById(itemId);

    // Use add to inventory method from Warehouse model
    await warehouse.addToInventory(item, quantity);

    // Redirect to the warehouse inventory
    res.redirect(`/warehouse/${warehouseId}`);
  } catch (error) {
    // In case of error render a page with the error
    res.status(400);
    res.render('404', { pageTitle: 'Error', path: '/error', error: error });
    console.log(error);
  }
};
