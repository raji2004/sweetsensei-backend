const {Category} = require('../models');
exports.updateCategory = async (req, res) => {
    const { id,name } = req.body;
  
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
  
        category.name = name;
        await category.save();
  
        res.status(200).json({ category });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.body.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
  
        await category.remove();
  
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.createCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
        const category = new Category({ name });
        await category.save();
  
        res.status(201).json({ category });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.body.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
  
        res.status(200).json({ category });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}