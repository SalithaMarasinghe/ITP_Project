import express from "express";
import {
  addOrderItems,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDeliver,
  updateBank,
  deleteOrder,
  updateDelivery
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrder);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

// Add route for updating order to include bank transfer details
router.route("/:id/paybank").put(protect, updateBank);

// Add route for updating order to include delivery details
router.route("/:id/deldetails").put(protect, updateDelivery);

// Add a new route for deleting an order
router.route("/:id").delete(protect, deleteOrder);

export default router;
