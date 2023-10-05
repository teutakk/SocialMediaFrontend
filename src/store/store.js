import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
  },
});

export default store;
