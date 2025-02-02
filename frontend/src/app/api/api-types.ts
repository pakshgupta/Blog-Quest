import { PostRequest, User } from "../../types";

export interface MessageResponse {
  statusCode: number;
  data: {
    data?: User;
  };
  message: string;
  success: boolean;
}

export interface MessagePostResponse {
  statusCode: number;
  data: PostRequest;
  message: string;
  success: boolean;
}
export interface MessageAllPostResponse {
  statusCode: number;
  data: {
    posts: PostRequest[];
  };
  message: string;
  success: boolean;
}
