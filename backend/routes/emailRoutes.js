import express from "express";
const router = express.Router();
import {sendEmailToSupplier, sendNotificationToSupplier} from "../controllers/emailController.js";

// Router
router.post("/send-email", sendEmailToSupplier);
router.post('/send-message', sendNotificationToSupplier);

export default router;
