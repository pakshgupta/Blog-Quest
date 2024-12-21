import { Router } from "express";
import { getFollowersController, getFollowingController, toggleFollowController, } from "../controllers/follow.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(validateJWT);
router.route("/follower").get(getFollowersController);
router
    .route("/following")
    .get(getFollowingController)
    .post(toggleFollowController);
