import mongoose from "mongoose";
import { IFollow } from "../types/type.js";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Follow = mongoose.model<IFollow>("Follow", followSchema);
