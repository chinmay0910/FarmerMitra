const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  productsDelivered: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product schema
        required: true
      },
      quantity: { type: Number, required: true },  // Quantity of the product delivered
      deliveryDate: { type: Date, required: true }
    }
  ],
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference back to the Farmer (User schema)
    required: true
  },
  companyDeliveredTO: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
