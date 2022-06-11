const express = require('express');
const { get } = require('express/lib/response');

const warehouseController = require('../controllers/warehouse');

const router = express.Router();

// GET request => get warehouse page with warehouses list
router.get('/warehouse', warehouseController.getWarehouse);

// GET form and POST new warehouses
router.get('/warehouse/add', warehouseController.getAddWarehouse);
router.post('/warehouse/add', warehouseController.postAddWarehouse);

// GET form and POST edit warehouses
router.get(
  '/warehouse/edit/:warehouseId',
  warehouseController.getEditWarehouse
);
router.post('/warehouse/edit', warehouseController.postEditWarehouse);

// POST delete a warehouse
router.post('/warehouse/delete', warehouseController.postDeleteWarehouse);

// GET inventory in a warehouse
router.get('/warehouse/:warehouseId', warehouseController.getWarehouseInventory)

// GET inventory item from warehouse
router.get('/warehouse/:warehouseId/item/:itemId', warehouseController.getEditWarehouseItem)

// POST edit an item from warehouse
router.post('/warehouse/item/edit', warehouseController.postEditWarehouseItem);

// POST delete an item from warehouse
router.post('/warehouse/delete-item', warehouseController.postDeleteWarehouseItem);

module.exports = router;
