import { Router } from "express";
import {
  createOrder,
  fetchFilteredOrders,
  fetchUserOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import { varifyJwt } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/create").post(createOrder);
router.route("/").get(fetchFilteredOrders);
router.route("/login-user").get(varifyJwt,fetchUserOrders);
router.route("/update/:id").patch(updateOrder);
export default router;
