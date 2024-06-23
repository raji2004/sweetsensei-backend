const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/order");

// Route to get all orders
router.get("/all", ordersController.getAllOrders);

// Route to get pending orders
router.get("/pending", ordersController.getPendingOrders);

// Route to get completed orders
router.get("/completed", ordersController.getCompletedOrders);

// Route to edit an order item's status
router.put("/edit/:orderId/item/:itemId", ordersController.editOrderItemStatus);

module.exports = router;
