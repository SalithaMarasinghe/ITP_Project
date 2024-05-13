import express from "express";
import {
  getAllvoucherOrders,
  getSinglevoucherOrders,
  createVoucherOrder,
} from "../controllers/voucherOrderController.js";

const voucherOrderRouter = express.Router();

voucherOrderRouter.route("/").get(getAllvoucherOrders).post(createVoucherOrder);
voucherOrderRouter.route("/:id").get(getSinglevoucherOrders);

export default voucherOrderRouter;
