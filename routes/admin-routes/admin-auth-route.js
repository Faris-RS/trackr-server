import express from "express";
import { doLogin } from "../../controllers/admin-controllers/admin-auth-controller.js";
const router = express.Router();

router.post("/login", doLogin);

export default router;
