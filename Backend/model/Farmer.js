const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmerInfoSchema = new Schema({
  aadhaarNumber: { type: String, required: true },
  farmerName: {
    type: String,
    required: true
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: 'Farm',  // Reference to the Farm schema
    required: true
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  }
});

module.exports = mongoose.model("Farmer", FarmerInfoSchema);
