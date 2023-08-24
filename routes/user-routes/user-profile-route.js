import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { getProfileDetails, updateProfilePhoto } from "../../controllers/user-controllers/user-profile-controller.js";
const router = express.Router();

router.get("/getDetails", authMiddleware, getProfileDetails);
router.post("/updateProfile", authMiddleware, updateProfilePhoto)

export default router;
