import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";
import { MessageResponse } from "./api-types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/user/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "signin",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "signout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userAPI;
