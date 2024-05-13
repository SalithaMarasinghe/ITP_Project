import express from "express";
import {
  getAll,
  getSingle,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../controllers/voucherController.js";

const voucherRouter = express.Router();

voucherRouter.route("/").get(getAll).post(createVoucher);
voucherRouter
  .route("/:id")
  .get(getSingle)
  .delete(deleteVoucher)
  .put(updateVoucher);

export default voucherRouter;
