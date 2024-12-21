import { Router } from "express";
import { getLikesPost, toggleCommentLikeController, togglePostLikeController, } from "../controllers/likes.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/toggle/p/:postId").post(validateJWT, togglePostLikeController);
router
    .route("toggle/c/:commentId")
    .post(validateJWT, toggleCommentLikeController);
router.route("/posts").get(validateJWT, getLikesPost);
export default router;
