const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../model/User');
const FarmerInfo = require('../model/Farmer');
const Farm = require('../model/Farm');
const { findFarmAndFarmerByRegistrationNo } = require('../utils/fetchInfo');

const router = express.Router();

// Register Farmer route
router.post('/register/farmer', async (req, res) => {
  const { email, password, farmRegisterationNo } = req.body;

  try {
    // Step 1: Find the farm and farmer information based on farmRegisterationNo from the CSV
    const farmData = await findFarmAndFarmerByRegistrationNo(farmRegisterationNo);
    console.log("Data Received>> "+farmData.farmAddress);
    
    if (!farmData) {
      return res.status(404).json({ error: 'Farm not found with the given registration number.' });
    }

    // Step 2: Create FarmInfo entry in the database
    const newFarm = new Farm({
      farmInformation: farmData.farmInformation,
      farmLatitude: farmData.farmLatitude,
      farmLongitude: farmData.farmLongitude,
      farmAddress: farmData.farmAddress
    });
    const savedFarm = await newFarm.save();

    // Step 3: Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create FarmerInfo entry in the database with Aadhaar Number and Farmer Name
    const newFarmerInfo = new FarmerInfo({
      aadhaarNumber: farmData.aadhaarNumber,
      farmerName: farmData.farmerName,
      farmId: savedFarm._id,  // Linking the created Farm entry
      profileId: null  // You can add profile creation here if needed
    });
    const savedFarmerInfo = await newFarmerInfo.save();

    // Step 5: Create the User entry
    const newUser = new User({
      email,
      password: hashedPassword,
      role: 'farmer',
      farmerId: savedFarmerInfo._id  // Linking the created FarmerInfo
    });
    await newUser.save();

    // Step 6: Respond with success
    res.status(201).json({ message: 'Farmer registered successfully', farmerId: savedFarmerInfo._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering farmer' });
  }
});

module.exports = router;
