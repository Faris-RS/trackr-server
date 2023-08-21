import express from "express";
import {
  getAllVehicles,
  rentVehicle,
} from "../../controllers/user-controllers/user-vehicle-controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/getAllVehicles", getAllVehicles);
router.put("/rentVehicle", authMiddleware, rentVehicle);

export default router;
