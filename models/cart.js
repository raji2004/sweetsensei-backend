const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    items: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          title: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
          },
        },
      ],
});

module.exports = mongoose.model("Cart", cartSchema);