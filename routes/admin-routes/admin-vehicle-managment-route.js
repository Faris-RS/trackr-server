import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  addVehicle,
  doEditVehicle,
  fetchAllVehicles,
  getSelectedVehicleDetails,
  rentVehicle,
} from "../../controllers/admin-controllers/admin-vehicle-managment-controller.js";

const router = express.Router();

router.post("/addVehicle", authMiddleware, addVehicle);
router.get("/getAllVehicles", authMiddleware, fetchAllVehicles);
router.put("/rentVehicle", authMiddleware, rentVehicle);
router.get(
  "/getSelectedVehicle/:vehicle",
  authMiddleware,
  getSelectedVehicleDetails
);
router.put("/editVehicle", authMiddleware, doEditVehicle)

export default router;