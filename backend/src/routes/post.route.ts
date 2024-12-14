import { Router } from "express";
import {
  createPostController,
  deletePostController,
} from "../controllers/post.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/create-post")
  .post(validateJWT, upload.single("photo"), createPostController);
router.route("/:id").delete(validateJWT, deletePostController);

export default router;
