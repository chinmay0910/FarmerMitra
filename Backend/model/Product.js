const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productPrice: { type: Number, required: true }  // Price per unit or kg
});

module.exports = mongoose.model("Product", ProductSchema);
