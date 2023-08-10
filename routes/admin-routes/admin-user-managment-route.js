import express from "express";
import { fetchAllUsers } from "../../controllers/admin-controllers/admin-userManagment-controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authMiddleware, fetchAllUsers);

export default router;
