const {Cart,Product} = require('../models'); // Replace with the actual path to your Cart model

exports.createOrAddToCart = async (req, res) => {
  const { product_id, quantity,size,colour,userId } = req.body;

  try {
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      // If the user doesn't have a cart, create one
      userCart = new Cart({ user: userId, items: [] });
     
    }

    // Find the product
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the product to the user's cart
    userCart.items.push({
      product_id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      size: size,
      colour: colour,
      quantity
    });
    await userCart.save();

    res.status(201).json({ cart: userCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.updateCart = async (req, res) => {

  const { items ,userId} = req.body;

  try {
    // Find the user's cart and update the items
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found for the user.' });
    }

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteFromCart = async (req, res) => {
  const { userId, _id } = req.body;

  try {
    // Find the user's cart and remove the item
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: _id } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found for the user.' });
    }

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params.userId;

  try {
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for the user.' });
    }

    res.status(200).json({ cart: userCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


