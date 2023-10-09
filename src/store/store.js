import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
  },
});

export default store;
