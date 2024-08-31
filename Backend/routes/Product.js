const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// POST route to create a new product
router.post('/addProduct', async (req, res) => {
  const { productName, productCategory, productPrice } = req.body;

  try {
    // Validate required fields
    if (!productName || !productCategory || !productPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new product
    const newProduct = new Product({
      productName,
      productCategory,
      productPrice
    });

    // Save the product to the database
    await newProduct.save();

    res.json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
