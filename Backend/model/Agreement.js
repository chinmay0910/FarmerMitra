const mongoose = require('mongoose');
const { Schema } = mongoose;

const AgreementSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',  // Reference to the Company schema
  },
  contractDescription: {
    type: String,
    required: true
  },
  cropType: {
    type: [String],
    required: true
  },
  quantityRequired: {
    type: [Number],
    required: true
  },
  pricePerUnit: {
    type: [Number],
    required: true
  },
  totalprice:{
    type: Number,
    required: true
  },
  paymentTerms: {
    type: [String],
    required: true
  },
  contractDuration: {
    type: String,
    required: true
  },
  deliverySchedule: {
    type: String,
    required: true
  },
  deliveryLocation: {
    type: String,
    required: true
  },
  qualityStandards: {
    type: String,
    required: true
  },
  supportServicesProvided: {
    type: [String]
  },
  riskMitigationClauses: {
    type: [String]
  },
  contactInformation: {
    type: [String],
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Agreement", AgreementSchema);
