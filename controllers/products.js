const {Product} = require('../models');


const createProduct = async (req, res) => {
  try {
   
    const { title, price, imageUrl, categoryId,size,colour } = req.body;
    console.log(colour)
    const newProduct = new Product({ title, price, imageUrl, categoryId,size,colour });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, categoryId,productId,size,color } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title, price, imageUrl, categoryId,size,color },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const {productId} = req.body;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).end(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct };
