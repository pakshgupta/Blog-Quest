import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const createCommentController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, "Content is required");
    }
    const comment = await Comment.create({
        content,
        post: id,
        owner: req.user?._id,
    });
    if (!comment) {
        throw new ApiError(500, "Internal server errro while creating the comment");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment created successfully!"));
});
export const getPostCommentsController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Post Id");
    }
    //   const postComments = await Comment.find({ post: id });
    const postComments = await Comment.aggregate([
        { $match: { post: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
            },
        },
        { $unwind: "$ownerDetails" },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes",
            },
        },
        { $addFields: { likedCount: { $size: "$likes" } } },
        {
            $project: {
                content: 1,
                createdAt: 1,
                "ownerDetails.name": 1,
                "ownerDetails.photo": 1,
                "ownerDetails._id": 1,
                likedCount: 1,
            },
        },
    ]);
    if (!postComments || postComments.length === 0) {
        throw new ApiError(500, "Post comments not found");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, postComments, "Post comments fetched successfully!"));
});
export const deleteCommentController = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not valid");
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(400, "Comment is required");
    }
    if (comment?.owner.toString() !== userId?.toString()) {
        throw new ApiError(400, "Only owner can edit coment");
    }
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (!deleteComment) {
        throw new ApiError(400, "Failed to update comment");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment has been deleted successfully"));
});
