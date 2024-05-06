// promotionController.js

import asyncHandler from 'express-async-handler';
import Promotion from '../models/promotionModel.js';

// @desc    Fetch all promotions
// @route   GET /api/promotions
// @access  Public
export const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({});
  res.json(promotions);
});

// @desc    Fetch single promotion
// @route   GET /api/promotions/:id
// @access  Public
export const getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

// @desc    Create a promotion
// @route   POST /api/promotions
// @access  Private/Admin
export const createPromotion = asyncHandler(async (req, res) => {
  const { name, type, value, validPeriod, relatedProduct } = req.body;

  const promotion = new Promotion({
    name,
    type,
    value,
    validPeriod,
    relatedProduct
  });

  const createdPromotion = await promotion.save();
  res.status(201).json(createdPromotion);
});

// @desc    Update a promotion
// @route   PUT /api/promotions/:id
// @access  Private/Admin
export const updatePromotion = asyncHandler(async (req, res) => {
  const { name, type, value, validPeriod, relatedProduct } = req.body;

  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.name = name;
    promotion.type = type;
    promotion.value = value;
    promotion.validPeriod = validPeriod;
    promotion.relatedProduct = relatedProduct;

    const updatedPromotion = await promotion.save();
    res.json(updatedPromotion);
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

// @desc    Delete a promotion
// @route   DELETE /api/promotions/:id
// @access  Private/Admin
export const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    await promotion.remove();
    res.json({ message: 'Promotion removed' });
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

export default {
  getPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
};
