import express from 'express';
import {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/faqController.js';
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(getFAQs).post(protect, admin, createFAQ);
router
  .route('/:id')
  .get(getFAQ)
  .put(protect, admin, updateFAQ)
  .delete(protect, admin, deleteFAQ);

export default router;
