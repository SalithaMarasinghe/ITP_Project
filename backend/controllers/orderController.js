import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const createdOrder = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({ success: true, order: createdOrder });
});



// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json({ success: true, order });
});



// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    balance: req.body.balance,
  };

  const updatedOrder = await order.save();

  res.json({ success: true, order: updatedOrder });
});



export const updateBank = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { accName, accNum, transDate, bankName, branchName, transAmount, remarks } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { bankDetails: { accName, accNum, transDate, bankName, branchName, transAmount, remarks } },
    { new: true }
  );

  if (updatedOrder) {
    res.json({ success: true, order: updatedOrder });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.json({ success: true, order: updatedOrder });
});



// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json({ success: true, orders });
});




// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json({ success: true, orders });
});
