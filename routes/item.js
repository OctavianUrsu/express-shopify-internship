const express = require('express');

const inventoryController = require('../controllers/item');

const router = express.Router();

// GET request => get index page with products list
router.get('/', inventoryController.getIndex);

// GET form and POST new items in inventory
router.get('/item/add', inventoryController.getAddItem);
router.post('/item/add', inventoryController.postAddItem);

// GET form and POST edit items in inventory
router.get('/item/edit/:itemId', inventoryController.getEditItem);
router.post('/item/edit', inventoryController.postEditItem);

// POST delete item in inventory
router.post('/item/delete', inventoryController.postDeleteItem);

// GET form and POST add items to a warehouse
router.get('/inventory/add/:itemId', inventoryController.getAddToWarehouse)
router.post('/inventory/add', inventoryController.postAddToWarehouse)

module.exports = router;
