import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { heatmap } from "../../controllers/admin-controllers/admin-graph-controller.js";
const router = express.Router();

router.get("/heatmap", authMiddleware, heatmap);

export default router;
