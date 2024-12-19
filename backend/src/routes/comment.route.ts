import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  getPostCommentsController,
} from "../controllers/comment.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/create-comment/:id").post(validateJWT, createCommentController);
router.route("/:id").get(validateJWT, getPostCommentsController);
router.route("/:commentId").delete(validateJWT, deleteCommentController);

export default router;
