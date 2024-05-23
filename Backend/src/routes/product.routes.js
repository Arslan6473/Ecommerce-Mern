import { Router } from "express";
import {
  createProduct,
  fetchFilteredProducts,
  updateProduct,
  fetchSingleProduct
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(fetchFilteredProducts);
router.route("/:id").get(fetchSingleProduct);
router.route("/create").post(createProduct);
router.route("/update/:id").patch(updateProduct);


export default router;
