const express = require('express');
const router = express.Router();
const Profile = require('../model/Profile');
const Product = require('../model/Product');
const User = require('../model/User');
const Buyer = require('../model/Company');

// POST route to add a new profile
router.post('/addProfile', async (req, res) => {
  const { farmerId, companyDeliveredTO, productsDelivered } = req.body;

  try {
    // Validate farmerId and companyDeliveredTO existence
    const farmerExists = await User.findById(farmerId);
    const companyExists = await Buyer.findById(companyDeliveredTO);

    if (!farmerExists || !companyExists) {
      return res.status(404).json({ message: 'Farmer or company not found' });
    }

    // Validate the product existence for each delivered product
    const productValidations = await Promise.all(
      productsDelivered.map(async (product) => {
        const productExists = await Product.findById(product.productId);
        return productExists ? true : false;
      })
    );

    if (productValidations.includes(false)) {
      return res.status(404).json({ message: 'One or more products not found' });
    }

    // Create a new Profile
    const newProfile = new Profile({
      farmerId,
      companyDeliveredTO,
      productsDelivered,
    });

    // Save the profile to the database
    await newProfile.save();

    res.json({ message: 'Profile added successfully', profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
