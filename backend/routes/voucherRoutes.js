import express from "express";
import {
  getAll,
  getSingle,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../controllers/voucherController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAll).post(protect, admin, createVoucher);
router
  .route("/:id")
  .get(getSingle)
  .delete(protect, admin, deleteVoucher)
  .put(protect, admin, updateVoucher);

export default router;
