import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

// @desc    Create new cart
// @route   POST /api/carts
// @access  Private

export const addCartItems = asyncHandler(async (req, res) => {
  const { cartItem } = req.body;

  // Validate cart item
  if (!cartItem) {
    res.status(400).json({ success: false, message: "Invalid cart item" });
  }

  // Check if cart already exists for user
  const existingCart = await Cart.findOne({ user: req.user._id });

  // If cart exists, check if cart item already exists
  if (existingCart) {
    const itemExists = existingCart.cartItems.some(
      (item) => item.product.toString() === cartItem.product.toString()
    );

    if (itemExists) {
      return res
        .status(400)
        .json({ success: false, message: "Item already exists" });
    }

    existingCart.cartItems.push(cartItem);

    // Calculate total price
    let totalPrice = 0;
    existingCart.cartItems.forEach((item) => {
      totalPrice += item.price * item.qty;
    });

    existingCart.totalPrice = totalPrice;

    const updatedCart = await existingCart.save();
    return res.status(201).json({ success: true, cart: updatedCart });
  }

  // Calculate total price
  const totalPrice = cartItem.price * cartItem.qty;

  // If cart does not exist, create a new one
  const createdCart = await Cart.create({
    user: req.user._id,
    cartItems: [cartItem],
    totalPrice,
  });

  res.status(201).json({ success: true, cart: createdCart });
});

// get cart by user id
// @desc    Get cart by user id
// @route   GET /api/carts
// @access  Private

export const getCartByUserId = asyncHandler(async (req, res) => {
  // populate user except password
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "user",
    "-password"
  );

  if (!cart) {
    res.status(404).json({ success: false, message: "Cart not found" });
  }

  res.status(200).json({ success: true, cart });
});

// Update the quantity of a cart item
// @desc    Update cart item
// @route   PUT /api/carts/:id
// @access  Private

export const updateCartItem = asyncHandler(async (req, res) => {
  const { qty } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404).json({ success: false, message: "Cart not found" });
  }

  const item = cart.cartItems.find(
    (item) => item.product.toString() === req.params.id
  );

  if (!item) {
    res.status(404).json({ success: false, message: "Item not found" });
  }

  item.qty = qty;

  // Calculate total price
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.qty;
  });

  cart.totalPrice = totalPrice;

  const updatedCart = await cart.save();

  res.status(200).json({ success: true, cart: updatedCart });
});

// Delete cart item
// @desc    Delete cart item
// @route   DELETE /api/carts/:id
// @access  Private

export const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404).json({ success: false, message: "Cart not found" });
  }

  cart.cartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== req.params.id
  );

  // Calculate total price
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.qty;
  });

  cart.totalPrice = totalPrice;

  const updatedCart = await cart.save();

  res.status(200).json({ success: true, cart: updatedCart });
});

// Clear cart
// @desc    Clear cart
// @route   DELETE /api/carts
// @access  Private

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404).json({ success: false, message: "Cart not found" });
  }

  cart.cartItems = [];
  cart.totalPrice = 0;

  const updatedCart = await cart.save();

  res.status(200).json({ success: true, cart: updatedCart });
});

// Get all carts
// @desc    Get all carts
// @route   GET /api/carts
// @access  Private/Admin

export const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({}).populate("user", "-password");

  res.status(200).json({ success: true, carts });
});
