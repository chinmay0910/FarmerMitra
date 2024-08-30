const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyRegistrationNo: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  companyInfo: { type: String, required: true },
});

const Company = mongoose.model('Buyer', companySchema);

module.exports = Company;