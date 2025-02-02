import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";
import { postAPI } from "./api/postAPI";
import { userAPI } from "./api/userAPi";
export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, postAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
