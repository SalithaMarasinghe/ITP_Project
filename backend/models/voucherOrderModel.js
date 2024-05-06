import mongoose from "mongoose";

const voucherOrderSchema = mongoose.Schema({
  userID: { type: String, required: true },
  email: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  value: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  deliveryDetails: { type: String, required: true },
});

const VoucherOrder = mongoose.model("VoucherOrder", voucherOrderSchema);

export default VoucherOrder;
