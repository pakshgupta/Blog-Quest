import mongoose, { FilterQuery, isValidObjectId } from "mongoose";
import org from "open-graph-scraper";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
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
    isPublished: true,
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

export const getUserPostController = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.user?._id)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.POST_PER_PAGE) || 5;
  const skip = (page - 1) * limit;

  const [userPost, totalPosts] = await Promise.all([
    Post.find({ owner: req.user?._id, isPublished: true })
      .skip(skip)
      .limit(limit),
    Post.countDocuments({ owner: req.user?._id, isPublished: true }),
  ]);

  if (!userPost?.length) {
    throw new ApiError(404, "No posts found");
  }
  const totalPages = Math.ceil(totalPosts / limit);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { posts: userPost, currentPage: page, totalPages: totalPages },
        "User Posts fetched successfully!"
      )
    );
});

export const getPostByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully!"));
});

export const searchPostsController = asyncHandler(async (req, res) => {
  const { keyword, tags, page, author, category, limit } = req.query;
  const currentPage = Number(page) || 1;
  const postsPerPage = Number(limit) || 7;
  const skip = (currentPage - 1) * postsPerPage;
  const baseQuery: FilterQuery<typeof Post> = {};
  if (keyword) {
    baseQuery.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }
  if (tags) {
    const tagsArray =
      typeof tags === "string"
        ? tags.split(",")
        : Array.isArray(tags)
        ? tags
        : [];
    baseQuery.tags = { $in: tagsArray };
  }

  if (category) {
    baseQuery.category = category;
  }

  if (author) {
    const user = await User.findOne(
      {
        name: { $regex: author, $options: "i" },
      },
      "_id"
    );
    if (user) {
      baseQuery.owner = user._id;
    } else {
      throw new ApiError(404, "Author not found");
    }
  }

  const [posts, totalPosts] = await Promise.all([
    Post.find({ ...baseQuery, isPublished: true })
      .skip(skip)
      .limit(postsPerPage),
    Post.countDocuments({ ...baseQuery, isPublished: true }),
  ]);

  if (!posts.length) {
    throw new ApiError(404, "No posts found for the given criteria");
  }
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { posts, currentPage, totalPages },
        "Posts fetched successfully!"
      )
    );
});

export const saveDraftController = asyncHandler(async (req, res) => {
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

  const existedDraft = await Post.findOne({
    onwer: req.user?._id,
    title,
    isPublished: false,
  });
  let post;
  if (existedDraft) {
    existedDraft.description = description;
    existedDraft.linkPreview = linkPreview;
    existedDraft.photo = photo;
    post = await existedDraft.save();
  } else {
    post = await Post.create({
      title,
      description,
      photo,
      owner: req.user?._id,
      linkPreview,
      isPublished: false,
    });
  }

  if (!post) {
    throw new ApiError(500, "Internal server error while creating post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully!"));
});

export const publishDraftController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const draft = await Post.findOne({
    _id: id,
    owner: req.user?._id,
    isPublished: false,
  });
  if (!draft) {
    throw new ApiError(
      404,
      "Draft not found or you don't have permission to publish this draft"
    );
  }
  draft.isPublished = true;
  const publishedPost = await draft.save();
  return res
    .status(200)
    .json(new ApiResponse(200, publishedPost, "Post published successfully"));
});
