import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../app/reducer-types";
import { User } from "../types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      (state.loading = false), (state.user = action.payload);
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userSlice.actions;
