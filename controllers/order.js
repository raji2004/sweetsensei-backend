const {Orders} = require("../models");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find().populate("user items.product_id");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get pending orders
exports.getPendingOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ "items.status": "pending" }).populate("user items.product_id");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get completed orders
exports.getCompletedOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ "items.status": "completed" }).populate("user items.product_id");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit an order item status
exports.editOrderItemStatus = async (req, res) => {
  const { orderId, itemId } = req.params;
  const { status } = req.body;

  try {
    const order = await Orders.findOneAndUpdate(
      { _id: orderId, "items._id": itemId },
      { $set: { "items.$.status": status } },
      { new: true }
    ).populate("user items.product_id");

    if (!order) {
      return res.status(404).json({ message: "Order or item not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
