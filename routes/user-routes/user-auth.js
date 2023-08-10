import express from "express";
import { doLogin, doSignup, signupOTP } from "../../controllers/user-controllers/user-authController.js";
const router = express.Router();

router.post("/login", doLogin);
router.post("/signup/sentOTP", signupOTP);
router.post("/signup/verifyOTP/:otp", doSignup);

export default router;
