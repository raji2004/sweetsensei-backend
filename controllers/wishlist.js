const { Wishlist, Product, Orders } = require('../models'); // Replace with the actual path to your Wishlist model

exports.createOrAddToWishlist = async (req, res) => {
  const { product_id, quantity, size, colour } = req.body;
  const userId = req.params.userId;
  try {
    let userWishlist = await Wishlist.findOne({ user: userId });

    if (!userWishlist) {
      // If the user doesn't have a Wishlist, create one
      userWishlist = new Wishlist({ user: userId, items: [] });

    }

    // Find the product
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the product to the user's Wishlist
    userWishlist.items.push({
      product_id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      size: size,
      colour: colour,
      quantity
    });
    await userWishlist.save();

    res.status(201).json({ Wishlist: userWishlist });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.updateWishlist = async (req, res) => {

  const { items } = req.body;
  const userId = req.params.userId;

  try {
    // Find the user's Wishlist and update the items
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found for the user.' });
    }

    res.status(200).json({ Wishlist: updatedWishlist });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteFromWishlist = async (req, res) => {
  const { _id } = req.body;
  const userId = req.params.userId;

  try {
    // Find the user's Wishlist and remove the item
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: _id } } },
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found for the user.' });
    }

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getWishlist = async (req, res) => {
  const { userId } = req.params.userId;

  try {
    const userWishlist = await Wishlist.findOne({ user: userId });

    if (!userWishlist) {
      return res.status(404).json({ message: 'Wishlist not found for the user.' });
    }

    res.status(200).json({ Wishlist: userWishlist });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const userOrders = await Orders.find({ user: userId });

    if (!userOrders) {
      return res.status(404).json({ message: 'Orders not found for the user.' });
    }

    res.status(200).json({ Orders: userOrders });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


