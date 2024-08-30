const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmerInfoSchema = new Schema({
  aadhaarNumber: { type: String, required: true },
  famerName: {
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
    ref: 'Profile',  // Reference to the Profile schema
    required: true
  }
});

module.exports = mongoose.model("Farmer", FarmerInfoSchema);
