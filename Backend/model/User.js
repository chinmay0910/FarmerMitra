const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['farmer', 'buyer'],  // Restrict to these roles
  },
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer',
    required: function() { return this.role === 'farmer'; }  // Only required if role is farmer
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: function() { return this.role === 'buyer'; }  // Only required if role is buyer
  },
  date: { 
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model("User", UserSchema);
