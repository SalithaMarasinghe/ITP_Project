import express from 'express';

import {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry
} from '../controllers/inquiryController.js';

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(getInquiries).post(protect, createInquiry);
router
  .route('/:id')
  .get(getInquiry)
  .put(protect, admin, updateInquiry)
  .delete(protect, admin, deleteInquiry);

export default router;
