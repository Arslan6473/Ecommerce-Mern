import { Router } from "express";
import {
  createBrand,
  fetchAllBrands,
} from "../controllers/brand.controller.js";

const router = Router();

router.route("/create").post(createBrand);
router.route("/").get(fetchAllBrands);

export default router;
