import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { newPostRequest } from "../../types";
import { MessageAllPostResponse, MessagePostResponse } from "./api-types";

export const postAPI = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/post/",
    credentials: "include",
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation<MessagePostResponse, newPostRequest>({
      query: ({ formData }) => ({
        url: "create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["posts"],
    }),
    allProducts: builder.query<MessageAllPostResponse, void>({
      query: () => ({
        url: "user/posts",
      }),
      providesTags: ["posts"],
    }),
    SinglePost: builder.query<MessagePostResponse, string>({
      query: (id) => id,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useAllProductsQuery,
  useSinglePostQuery,
} = postAPI;
