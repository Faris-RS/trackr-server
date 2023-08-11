import express from "express";
import {
  blockUser,
  fetchAllUsers,
} from "../../controllers/admin-controllers/admin-userManagment-controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authMiddleware, fetchAllUsers);
router.patch("/blockUser", authMiddleware, blockUser);

export default router;
