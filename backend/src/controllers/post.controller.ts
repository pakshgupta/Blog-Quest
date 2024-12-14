import mongoose from "mongoose";
import org from "open-graph-scraper";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPostController = asyncHandler(async (req, res) => {
  const { title, description, url } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "All feilds are required");
  }
  const linkPreview = [];
  if (url) {
    const options = { url: url };
    const data = await org(options);
    if (data) {
      const imageUrls = Array.isArray(data.result.ogImage)
        ? data.result.ogImage.map((img: any) => img.url).filter(Boolean)
        : [];
      linkPreview.push({
        ogTitle: data.result.ogTitle,
        ogDescription: data.result.ogDescription,
        ogImage: imageUrls,
        ogUrl: data.result.ogUrl,
      });
    } else {
      throw new ApiError(500, "Error in getting meta data");
    }
  }

  const photoPath = req.file;
  let photo = "";
  if (photoPath) {
    photo = photoPath?.path;
  }
  const post = await Post.create({
    title,
    description,
    photo,
    owner: req.user?._id,
    linkPreview,
  });
  if (!post) {
    throw new ApiError(500, "Internal server error while creating post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully!"));
});

export const deletePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.owner.toString() !== req?.user?._id?.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  const deletePost = await Post.deleteOne({ _id: id });

  if (!deletePost) {
    throw new ApiError(500, "Internal server error while deleting the post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully"));
});
