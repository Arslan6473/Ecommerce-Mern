import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  signoutUser,
  updateUser,
} from "../controllers/user.controller.js";
import { varifyJwt } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//secure routes
router.route("/signOut").post(varifyJwt, signoutUser);
router.route("/update-user").patch(varifyJwt, updateUser);
router.route("/current-user").get(varifyJwt, getCurrentUser);

export default router;
