import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { getAllOrders } from "../../controllers/user-controllers/user-order-controller.js";
const router = express.Router();

router.get("/", authMiddleware, getAllOrders)

export default router;
