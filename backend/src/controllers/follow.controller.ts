import { Follow } from "../models/follow.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const toggleFollowController = asyncHandler(async (req, res) => {
  const { followId } = req.params;
  const user = req.user?._id;
  const isFollow = await Follow.findOne({
    follower: user,
    following: followId,
  });
  if (isFollow) {
    await Follow.findByIdAndDelete(isFollow._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isFollow: false }, "Unfollowed"));
  }
  const follow = await Follow.create({ follower: user, following: followId });
  if (!follow) {
    return res.status(400).json(new ApiResponse(400, null, "Failed to follow"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, follow, "Followed successfully!"));
});

export const getFollowersController = asyncHandler(async (req, res) => {
  const allFollowers = await Follow.aggregate([
    { $match: { following: req.user?._id } },
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        follower: "$userDetails._id",
        name: "$userDetails.name",
        email: "$userDetails.email",
        profilePic: "$userDetails.photo",
      },
    },
    {
      $group: {
        _id: null,
        totalFollowers: { $sum: 1 },
        followers: { $push: "$$ROOT" }, // Push all the projected follower details into an array
      },
    },
    {
      $project: {
        _id: 0,
        totalFollowers: 1,
        followers: 1,
      },
    },
  ]);
  if (!allFollowers) {
    return res.status(400).json(new ApiResponse(400, "No followers"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allFollowers, "All followers"));
});

export const getFollowingController = asyncHandler(async (req, res) => {
  await Follow.aggregate([
    {
      $match: { follower: req.user?._id },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        following: "$userDetails._id",
        name: "$userDetails.name",
        email: "$userDetails.email",
        profilePic: "$userDetails.photo",
      },
    },
    {
      $group: {
        _id: null,
        totalFollowing: { $sum: 1 },
        following: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        totalFollowing: 1,
        following: 1,
      },
    },
  ]);
});
