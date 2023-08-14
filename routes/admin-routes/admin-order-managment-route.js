import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { getAllOrders } from "../../controllers/admin-controllers/admin-order-managment-controller.js";
const router = express.Router();

router.get("/getAllOrders/:month/:year", authMiddleware, getAllOrders);

export default router;
