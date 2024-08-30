const express = require('express');
const mongoose = require('mongoose');
const Agreement = require('../model/Agreement');  // Adjust the path according to your project structure
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

// Route to handle POST requests for creating a new agreement
router.post('/new', fetchuser, async (req, res) => {

  const {
    contractDescription,
    cropType,
    quantityRequired,
    pricePerUnit,
    totalprice,
    paymentTerms,
    contractDuration,
    deliverySchedule,
    deliveryLocation,
    qualityStandards,
    supportServicesProvided,
    riskMitigationClauses,
    contactInformation,
    applicationDeadline
  } = req.body;

  try {
    const newAgreement = new Agreement({
      companyId: req.user.id,
      contractDescription,
      cropType,
      quantityRequired,
      pricePerUnit,
      totalprice,
      paymentTerms,
      contractDuration,
      deliverySchedule,
      deliveryLocation,
      qualityStandards,
      supportServicesProvided,
      riskMitigationClauses,
      contactInformation,
      applicationDeadline
    });

    await newAgreement.save();
    res.status(201).json({ message: 'Agreement created successfully!' });
  } catch (error) {
    console.error('Error creating agreement:', error);
    res.status(500).json({ message: 'Failed to create agreement.' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id);
    if (!agreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.json(agreement);
  } catch (error) {
    console.error('Error fetching agreement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const contracts = await Agreement.find().populate('companyId');
    res.json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contracts.' });
  }
});

module.exports = router;
