import mongoose from "mongoose";
import { IPost } from "../types/type.js";

const linkPreviewSchema = new mongoose.Schema({
  ogTitle: {
    type: String,
  },
  ogDescription: {
    type: String,
  },
  ogImage: {
    type: [String],
  },
  ogUrl: {
    type: String,
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    codeBlock: {
      type: String,
    },
    linkPreview: {
      type: [linkPreviewSchema],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    readingTime: {
      type: String,
      default: "1 min",
    },
  },
  { timestamps: true }
);

postSchema.index({ owner: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>("Post", postSchema);
