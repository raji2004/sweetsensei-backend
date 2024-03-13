const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');

router.route('/categories')
.get( CategoryController.getCategories)
.post(CategoryController.createCategory)
.put(CategoryController.updateCategory)
.delete(CategoryController.deleteCategory)

module.exports = router;