import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const togglePostLikeController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId");
  }
  const alreadyLiked = await Like.findOne({
    post: postId,
    likedBy: req.user?._id,
  });
  if (alreadyLiked) {
    await Like.findByIdAndDelete(alreadyLiked?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Post Unliked Successfully"));
  }
  const newLike = await Like.create({ post: postId, likedBy: req.user?._id });
  if (!newLike) {
    throw new ApiError(500, "Internal server error while liking the post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newLike, "Post Liked Successfully"));
});

export const toggleCommentLikeController = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }
  const alreadyLiked = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
  });
  if (alreadyLiked) {
    await Like.findByIdAndDelete(alreadyLiked?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment Unliked Successfully"));
  }
  const newLike = await Like.create({
    comment: commentId,
    likedBy: req.user?._id,
  });
  if (!newLike) {
    throw new ApiError(500, "Internal server error while liking the comment");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newLike, "Comment Liked Successfully"));
});

export const getLikesPost = asyncHandler(async (req, res) => {
  const allLikedPost = await Like.aggregate([
    {
      $match: { likedBy: new mongoose.Types.ObjectId(req.user?._id) },
    },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "likedPost",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownerDetails",
            },
          },
          {
            $unwind: "$ownerDetails",
          },
        ],
      },
    },
    {
      $unwind: "$likedPost",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 0,
        likedPost: {
          _id: 1,
          title: 1,
          description: 1,
          photo: 1,
          owner: 1,
          readingTime: 1,
          isPublished: 1,
          ownerDetails: {
            name: 1,
            photo: 1,
            _id: 1,
          },
        },
      },
    },
  ]);
  if (!allLikedPost || allLikedPost.length === 0) {
    throw new ApiError(500, "No liked post found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, allLikedPost, "All liked post fetched successfully")
    );
});
