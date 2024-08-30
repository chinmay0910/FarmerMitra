const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmSchema = new Schema({
  farmInformation: { type: String },
  farmLatitude: { type: Number, required: true },
  farmLongitude: { type: Number, required: true },
  farmAddress: { type: String, required: true }
});

module.exports = mongoose.model("Farm", FarmSchema);
