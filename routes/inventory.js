const express = require('express');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

router.get('/', inventoryController.getIndex);

router.get('/add-item', inventoryController.getAddItem);

router.post('/add-item', inventoryController.postAddItem);

router.get('/edit-item/:itemId', inventoryController.getEditItem);

router.post('/edit-item', inventoryController.postEditItem);

router.post('/delete-item', inventoryController.postDeleteItem);

module.exports = router;
