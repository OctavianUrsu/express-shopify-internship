const express = require('express');

const inventoryController = require('../controllers/item');

const router = express.Router();

// GET => get index page with products list
router.get('/', inventoryController.getIndex);

// GET, POST => get add item page & post item
router.get('/item/add', inventoryController.getAddItem);
router.post('/item/add', inventoryController.postAddItem);

// GET, POST => get edit item page & post edited item
router.get('/item/edit/:itemId', inventoryController.getEditItem);
router.post('/item/edit', inventoryController.postEditItem);

// POST => delete item from database
router.post('/item/delete', inventoryController.postDeleteItem);

// GET, POST => get add inventory to warehouse page & post inventory to warehouse
router.get('/inventory/add/:itemId', inventoryController.getAddToWarehouse)
router.post('/inventory/add', inventoryController.postAddToWarehouse)

module.exports = router;
