import mongoose from "mongoose";

const voucherOrderSchema = mongoose.Schema({
  userID: { type: String },
  userName: { type: String },
  code: { type: Number, required: true, unique: true },
  value: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  deliveryDetails: { type: String, required: true },
});

const VoucherOrder = mongoose.model("VoucherOrder", voucherOrderSchema);

export default VoucherOrder;
