import { Types, Document } from "mongoose";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female" | "other";
  dob: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
};

export type TPayload = {
  _id: string;
  name: string;
  email: string;
};

interface LinkPreview {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string[];
  ogUrl?: string;
}

export interface IPost extends Document {
  title: string;
  description: string;
  photo?: string;
  codeBlock?: string;
  linkPreview?: LinkPreview[];
  owner: Types.ObjectId;
  readingTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFollow extends Document {
  follower: Types.ObjectId; // Reference to the User who is following
  following: Types.ObjectId; // Reference to the User who is being followed
  createdAt: Date; // Timestamp field added by Mongoose automatically
  updatedAt: Date; // Timestamp field added by Mongoose automatically
}

export interface IComment extends Document {
  content: string;
  post: Types.ObjectId;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILike extends Document {
  post: Types.ObjectId; // Reference to the Post model
  comment: Types.ObjectId; // Reference to the Comment model
  likedBy: Types.ObjectId; // Reference to the User who liked
  createdAt: Date; // Timestamp field (automatically added by Mongoose)
  updatedAt: Date; // Timestamp field (automatically added by Mongoose)
}
