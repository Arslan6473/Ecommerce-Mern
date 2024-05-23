import { Router } from "express";
import {
  createCategory,
  fetchAllCategories,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/create").post(createCategory);
router.route("/").get(fetchAllCategories);

export default router;
