import { Router } from "express";
import {
  signinController,
  signoutController,
  signupController,
} from "../controllers/user.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/signup").post(signupController);
router.route("/signin").post(signinController);
router.route("/signout").post(validateJWT, signoutController);
export default router;
