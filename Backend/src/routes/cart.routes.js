import { Router } from "express";
import {
  createCartItem,
  updateCartItem,
  fetchAllCartItems,
  deleteCartItem,
} from "../controllers/cart.controller.js";
import { varifyJwt } from "../middlewares/user.middleware.js";
const router = Router();

router.route("/add-item").post(createCartItem);
router.route("/user-items").get(varifyJwt,fetchAllCartItems);
router.route("/update/:id").patch(updateCartItem);
router.route("/delete/:id").delete(deleteCartItem);

export default router;
