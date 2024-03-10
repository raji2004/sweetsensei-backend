const {Cart} = require('../models'); // Replace with the actual path to your Cart model

exports. createOrAddToCart = async (req, res) => {
    const { product_id, title, imageUrl, price,userId } = req.body;
  
    try {
      let userCart = await Cart.findOne({ user: userId });
  
      if (!userCart) {
        // If the user doesn't have a cart, create one
        userCart = new Cart({ user: userId, items: [] });
        await userCart.save();
      }
  
      // Add the item to the user's cart
      userCart.items.push({ product_id, title, imageUrl, price });
      await userCart.save();
  
      res.status(201).json({ cart: userCart });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

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

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { product_id, title, imageUrl, price } = req.body;

  try {
    // Find the user's cart and add the item
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: { product_id, title, imageUrl, price } } },
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
  const { userId, itemId } = req.params;

  try {
    // Find the user's cart and remove the item
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: itemId } } },
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


