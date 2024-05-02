const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  type: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  expirationDate: { type: Date, required: true }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
