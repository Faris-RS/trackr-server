import express from "express";
import {
  blockUser,
  fetchAllUsers,
} from "../../controllers/admin-controllers/admin-user-managment-controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", fetchAllUsers);
router.patch("/blockUser", authMiddleware, blockUser);

export default router;
