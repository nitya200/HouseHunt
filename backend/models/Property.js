const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['Apartment', 'House', 'Villa', 'Commercial'], required: true },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { type: String, enum: ['Available', 'Rented', 'Sold'], default: 'Available' },
  adminApproved: { type: Boolean, default: false } // For Admin moderation
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);