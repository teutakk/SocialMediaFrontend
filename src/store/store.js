import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import friendshipSlice from "./slices/friendshipSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import notificationsSlice from "./slices/notificationsSlice";
import marketplaceSlice from "./slices/marketplaceSlice";
import notificationSlice from "./slices/notificationSlice";
const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
    posts: postsSlice,
    friendship: friendshipSlice,
    profile: profileSlice,
    notifications: notificationsSlice,
    marketplace: marketplaceSlice,
  },
});

export default store;
