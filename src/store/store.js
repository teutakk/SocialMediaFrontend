import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import postsSlice from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
    posts: postsSlice,
  },
});

export default store;
