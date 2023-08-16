import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { getProfileDetails } from "../../controllers/user-controllers/user-profile-controller.js";
const router = express.Router();

router.get("/getDetails", authMiddleware, getProfileDetails);

export default router;
