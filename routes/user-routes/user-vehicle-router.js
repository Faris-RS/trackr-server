import express from "express";
import { getAllVehicles } from "../../controllers/user-controllers/user-vehicle-controller.js";
const router = express.Router();

router.get("/getAllVehicles", getAllVehicles);

export default router;
