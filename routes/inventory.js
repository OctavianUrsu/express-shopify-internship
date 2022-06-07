const express = require('express');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

router.get('/', inventoryController.getIndex);

module.exports = router;
