import express from "express";
import { getSearchResults } from "../../controllers/user-controllers/user-search-controller.js";
const router = express.Router();

router.get("/:query/:filter", getSearchResults);

export default router;
