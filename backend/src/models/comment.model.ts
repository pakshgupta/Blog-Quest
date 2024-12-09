import mongoose from "mongoose";
import { IComment } from "../types/type.js";

const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Comment = mongoose.model<IComment>("Comment", commentsSchema);
