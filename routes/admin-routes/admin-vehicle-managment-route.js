import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  addVehicle,
  doDeleteVehicle,
  doEditVehicle,
  fetchAllVehicles,
  getSelectedVehicleDetails,
  rentVehicle,
  returnVehicle,
} from "../../controllers/admin-controllers/admin-vehicle-managment-controller.js";

const router = express.Router();

router.get(
  "/getSelectedVehicle/:vehicle",
  authMiddleware,
  getSelectedVehicleDetails
);
router.post("/addVehicle", authMiddleware, addVehicle);
router.get("/getAllVehicles", authMiddleware, fetchAllVehicles);
router.put("/editVehicle", authMiddleware, doEditVehicle);
router.put("/rentVehicle", authMiddleware, rentVehicle);
router.post("/returnVehicle", authMiddleware, returnVehicle);
router.delete("/deleteVehicle/:vehicle", authMiddleware, doDeleteVehicle);

export default router;
