const Item = require('../models/item');
const Warehouse = require('../models/warehouse');

exports.getIndex = async (req, res) => {
  try {
    const items = await Item.find();

    res.render('index', {
      items: items,
      pageTitle: 'Index',
      path: '/',
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddItem = (req, res) => {
  res.render('edit-item', {
    pageTitle: 'Add Item',
    path: '/item/add',
    editing: false,
  });
};

exports.postAddItem = async (req, res) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const category = req.body.category;
  const costPerItem = req.body.costPerItem;
  const quantity = req.body.quantity;

  const item = new Item({
    name: name,
    imageUrl: imageUrl,
    description: description,
    category: category,
    costPerItem: costPerItem,
    quantity: quantity,
  });

  try {
    await item.save();

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.getEditItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.redirect('/');
    }

    res.render('edit-item', {
      pageTitle: 'Edit Item',
      path: '/item/edit',
      item: item,
      editing: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditItem = async (req, res) => {
  const itemId = req.body.itemId;
  const updatedName = req.body.name;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;
  const updatedCostPerItem = req.body.costPerItem;
  const updatedQuantity = req.body.quantity;

  try {
    const item = await Item.findById(itemId);
    item.name = updatedName;
    item.imageUrl = updatedImageUrl;
    item.description = updatedDescription;
    item.category = updatedCategory;
    item.costPerItem = updatedCostPerItem;
    item.quantity = updatedQuantity;

    await item.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteItem = async (req, res) => {
  const itemId = req.body.itemId;

  try {
    await Item.deleteOne({ _id: itemId });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.getAddToWarehouse = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // get item
    const item = await Item.findById(itemId);
    if (!item) {
      return res.redirect('/');
    }

    // get warehouses
    const warehouses = await Warehouse.find();
    res.render('add-to-warehouse', {
      pageTitle: 'Add Item to Warehouse',
      path: '/inventory/add',
      item: item,
      warehouses: warehouses,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postAddToWarehouse = async (req, res) => {
  const warehouseId = req.body.warehouseId;
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    const item = await Item.findById(itemId);
    await warehouse.addToInventory(item, quantity);
    res.redirect(`/warehouse/${warehouseId}`);
  } catch (error) {
    console.log(error);
  }
};
