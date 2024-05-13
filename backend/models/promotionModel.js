// promotionModel.js

import mongoose from 'mongoose';

const promotionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },

  minQty: {
    type: Number,
    required: true
  },
  
  validPeriod: {
    type: Date,
    required: true
  },
  relatedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  }
  
}, {
  timestamps: true
});

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;
