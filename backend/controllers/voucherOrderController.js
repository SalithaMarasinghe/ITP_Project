import asyncHandler from "express-async-handler";
import VoucherOrder from "../models/voucherOrderModel.js";

// @DESC Fetch all voucher
// @ROUTE /api/voucher
// @METHOD GET
export const getAllvoucherOrders = asyncHandler(async (req, res) => {
  const voucherOrders = await VoucherOrder.find();

  res.status(201).json({
    success: true,
    voucherOrders,
  });
});

// @DESC Fetch single voucher
// @ROUTE /api/voucher/:id
// @METHOD GET
export const getSinglevoucherOrders = asyncHandler(async (req, res) => {
  const voucherOrders = await voucherOrders.findById(req.params.id);

  if (!voucher) {
    res.status(401);
    throw new Error("Voucher not found");
  }

  res.status(201).json({ success: true, voucherOrders });
});

// @Desc Create voucher
// @Route /api/voucher
// @Method POST
export const createVoucherOrder = asyncHandler(async (req, res) => {
  const ac = Math.floor(Math.random() * 1000000000000);

  const voucherOrder = new VoucherOrder({
    userID: req.body.userID,
    email: req.body.email,
    code: ac,
    value: req.body.value,
    expirationDate: req.body.expirationDate,
    deliveryDetails: req.body.deliveryDetails,
  });

  const createdVoucherOrder = await voucherOrder.save();

  res.status(201).json({ success: true, voucherOrder: createdVoucherOrder });
});
