import express from "express";
import {
  getAll,
  getSingle,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../controllers/voucherController.js";

const router = express.Router();

router.route("/").get(getAll).post( createVoucher);
router
  .route("/:id")
  .get(getSingle)
  .delete( deleteVoucher)
  .put( updateVoucher);

export default router;
