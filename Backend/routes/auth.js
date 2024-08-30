const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const FarmerInfo = require('../model/Farmer');
const Farm = require('../model/Farm');
const Company = require('../model/Company');
const { findFarmAndFarmerByRegistrationNo } = require('../utils/fetchInfo');
const { findCompanyByRegistrationNo } = require('../utils/fetchCompanyInfo');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Register Farmer route
router.post('/register/farmer', async (req, res) => {
    const { email, password, farmRegisterationNo } = req.body;

    try {
        // Step 1: Find the farm and farmer information based on farmRegisterationNo from the CSV
        const farmData = await findFarmAndFarmerByRegistrationNo(farmRegisterationNo);
        console.log("Data Received>> " + farmData.farmAddress);

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

router.post('/register/company', async (req, res) => {
    const { companyRegistrationNo, email, password } = req.body;

    try {
        // Fetch company information from the Excel file
        const companyInfo = await findCompanyByRegistrationNo(companyRegistrationNo);
        
        // Check if company already exists
        const existingCompany = await Company.findOne({ companyRegistrationNo });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company already registered with this registration number.' });
        }

        // Create and save new company
        const newCompany = new Company({
            companyRegistrationNo,
            companyName: companyInfo.companyName,
            companyInfo: companyInfo.companyInfo
        });
        console.log(newCompany);
        
        await newCompany.save();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered with this email.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user linked to the company
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'buyer',
            buyerId: newCompany._id
        });

        await newUser.save();
        res.status(201).json({ message: 'Company and user registered successfully.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    let success = false;

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const comparePass = bcrypt.compareSync(req.body.password, user.password);

            if (comparePass) {
                const data = {
                    user: {
                        id: user._id
                    }
                }
                success = true;

                const authtoken = jwt.sign(data, JWT_SECRET);

                res.json({ success, authtoken });
            }
            else {
                return res.status(400).json({
                    error: "User does not Exists / Invalid Credentials"
                })
            }
        } else {
            return res.status(400).json({ error: "User does not Exists / Invalid Credentials" })
        }
    } catch (err) {
        res.status(500).send("Internal Server Error occured while Authennticating")
    }


})

module.exports = router;
