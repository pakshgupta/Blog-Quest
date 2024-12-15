import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getUserPostController,
  publishDraftController,
  saveDraftController,
  searchPostsController,
} from "../controllers/post.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/create-post")
  .post(validateJWT, upload.single("photo"), createPostController);
router.route("/user/posts").get(validateJWT, getUserPostController);
router.route("/search").get(validateJWT, searchPostsController);
router.route("/drafts").post(validateJWT, saveDraftController);
router.route("/:id").delete(validateJWT, deletePostController);
router.route("/:id").get(validateJWT, getPostByIdController);
router.route("/:id/publish").patch(validateJWT, publishDraftController);

export default router;
