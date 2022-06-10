const express = require('express');
const { get } = require('express/lib/response');

const warehouseController = require('../controllers/warehouse');

const router = express.Router();

// GET request => get warehouse page with warehouses list
router.get('/warehouse', warehouseController.getWarehouse);

// GET form and POST new warehouses
router.get('/add-warehouse', warehouseController.getAddWarehouse);
router.post('/add-warehouse', warehouseController.postAddWarehouse);

// GET form and POST edit warehouses
router.get(
  '/edit-warehouse/:warehouseId',
  warehouseController.getEditWarehouse
);
router.post('/edit-warehouse', warehouseController.postEditWarehouse);

// POST delete a warehouse
router.post('/delete-warehouse', warehouseController.postDeleteWarehouse);

// GET inventory in a warehouse
router.get('/warehouse/:warehouseId', warehouseController.getWarehouseInventory)

module.exports = router;
