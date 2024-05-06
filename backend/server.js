import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import voucherRouter from "./routes/voucherRoutes.js";

const app = express();

dotenv.config();

//Connect Database
connectDB();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

// Product Route
app.use("/api/products", productRoutes);

// User Route
app.use("/api/users", userRoutes);

// Order Route
app.use("/api/orders", orderRoutes);

// Upload Route
app.use("/api/upload", uploadRoutes);

//Promotions Route
app.use("/api/promotions", promotionRoutes);

//FAQs Route
app.use("/api/faqs", faqRoutes);

//inquiry Route
app.use("/api/inquiries", inquiryRoutes);

app.use("/api/vouchers", voucherRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Default Route
  app.get("/api", (req, res) => {
    res.status(201).json({ success: true, message: "Welcome Cloth Shop APP" });
  });
}

// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
