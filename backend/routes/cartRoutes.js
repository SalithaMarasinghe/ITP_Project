import express from "express";
import {
  addCartItems,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
  clearCart,
  getCarts,
} from "../controllers/cartController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addCartItems);
router.route("/").get(protect, getCartByUserId);
router.route("/all").get(protect, admin, getCarts);
router.route("/:id").put(protect, updateCartItem);
router.route("/clear").delete(protect, clearCart);
router.route("/:id").delete(protect, deleteCartItem);

export default router;
