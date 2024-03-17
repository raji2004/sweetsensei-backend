const {Wishlist,Product} = require('../models'); // Replace with the actual path to your Wishlist model

exports.createOrAddToWishlist = async (req, res) => {
  const { product_id, quantity,size,colour,userId } = req.body;

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

  const { items ,userId} = req.body;

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
  const { userId, _id } = req.body;

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


