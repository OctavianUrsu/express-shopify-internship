const express = require('express');

const warehouseController = require('../controllers/warehouse');

const router = express.Router();

// GET => get warehouse page with warehouses list
router.get('/warehouse', warehouseController.getWarehouse);

// GET, POST => get add warehouse page & post warehouse to database
router.get('/warehouse/add', warehouseController.getAddWarehouse);
router.post('/warehouse/add', warehouseController.postAddWarehouse);

// GET, POST => get edit warehouse page & post edited warehouse
router.get(
  '/warehouse/edit/:warehouseId',
  warehouseController.getEditWarehouse
);
router.post('/warehouse/edit', warehouseController.postEditWarehouse);

// POST => delete warehouse
router.post('/warehouse/delete', warehouseController.postDeleteWarehouse);

// GET => get inventory from a warehouse
router.get(
  '/warehouse/:warehouseId',
  warehouseController.getWarehouseInventory
);

// GET, POST => get an inventory item from warehouse and edit it's quantity
router.get(
  '/warehouse/:warehouseId/item/:itemId',
  warehouseController.getEditWarehouseItem
);
router.post('/warehouse/item/edit', warehouseController.postEditWarehouseItem);

// POST => delete an inventory item from warehouse
router.post(
  '/warehouse/delete-item',
  warehouseController.postDeleteWarehouseItem
);

module.exports = router;
