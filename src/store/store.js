import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import friendshipSlice from "./slices/friendshipSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import notificationsSlice from "./slices/notificationsSlice";
import marketplaceSlice from "./slices/marketplaceSlice";
import storiesSlice from "./slices/storiesSlice";
import notifications from "./slices/notificationSlice";
const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
    posts: postsSlice,
    friendship: friendshipSlice,
    profile: profileSlice,
    notifications: notifications,
    marketplace: marketplaceSlice,
    stories: storiesSlice,
  },
});

export default store;
