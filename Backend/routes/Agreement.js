const express = require('express');
const mongoose = require('mongoose');
const Agreement = require('../model/Agreement');  // Adjust the path according to your project structure
const User = require('../model/User');  // Adjust the path according to your project structure
const Farm = require('../model/Farm')
const Farmer = require('../model/Farmer')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Company = require('../model/Company');

const upload = require('../utils/uploadFile')

// Route to handle POST requests for creating a new agreement
router.post('/new', fetchuser, upload.single('cropImage'), async (req, res) => {
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
      const user = await User.findById(req.user.id);

      // Convert comma-separated strings to arrays
      const cropTypeArray = cropType.split(',');
      const quantityRequiredArray = quantityRequired.split(',').map(Number);
      const pricePerUnitArray = pricePerUnit.split(',').map(Number);
      const paymentTermsArray = paymentTerms.split(',');
      const supportServicesProvidedArray = supportServicesProvided.split(',');
      const riskMitigationClausesArray = riskMitigationClauses.split(',');
      const contactInformationArray = contactInformation.split(',');

      const newAgreement = new Agreement({
          companyId: user.buyerId,
          userId: req.user.id,
          contractDescription,
          cropType: cropTypeArray,
          quantityRequired: quantityRequiredArray,
          pricePerUnit: pricePerUnitArray,
          totalprice,
          paymentTerms: paymentTermsArray,
          contractDuration,
          deliverySchedule,
          deliveryLocation,
          qualityStandards,
          supportServicesProvided: supportServicesProvidedArray,
          riskMitigationClauses: riskMitigationClausesArray,
          contactInformation: contactInformationArray,
          applicationDeadline,
          cropImage: req.file ? req.file.filename : null // Save image filename
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
    const contracts = await Agreement.find().populate("companyId");
    
    res.json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contracts.' });
  }
});

// Endpoint to handle applying for a contract 
router.post('/:contractId/apply', fetchuser, async (req, res) => {
  const { contractId } = req.params;
  const userId = req.user.id;

  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
      const contract = await Agreement.findById(contractId);

      if (!contract) {
          return res.status(404).json({ message: 'Contract not found' });
      }

      // Check if the application deadline has passed
      if (new Date() > contract.applicationDeadline) {
          return res.status(400).json({ message: 'Application deadline has passed' });
      }

      if (contract.applicants.includes(userId)) {
          return res.status(400).json({ message: 'User already applied for this contract' });
      }

      contract.applicants.push(userId);
      await contract.save();

      res.status(200).json({ message: 'Application successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all contracts for a specific company
router.get('/company/contracts', fetchuser, async (req, res) => {
  try {
      const companyId = req.user.id;
      
      const agreements = await Agreement.find({ userId: companyId });
      res.json(agreements);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Route to get applicants for a specific contract
router.get('/:contractId/applicants', async (req, res) => {
  const contractId = req.params.contractId;

  try {
    // Find the contract by ID and populate the applicants
    const contract = await Agreement.findById(contractId).populate('applicants');
    
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Get the user IDs (applicants) from the contract
    const applicantIds = contract.applicants;
    console.log(applicantIds);
    

    // Find user details (for farmers only) and populate farmer information
    const applicants = await User.find({ _id: { $in: applicantIds }, role: 'farmer' }).populate({
      path: 'farmerId',  // Populate farmer information from Farmer schema
      populate: { path: 'farmId' } // Further populate farm information
    });

    // Map the result to return necessary applicant info
    const applicantDetails = applicants.map(applicant => ({
      _id: applicant._id,
      name: applicant.farmerId.farmerName, // Farmer's name
      email: applicant.email,  // Applicant's email
      farmInfo: applicant.farmerId.farmId || '' // Farm information
    }));

    // Send the applicant details as a response
    res.json(applicantDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
