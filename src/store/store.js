import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import friendshipSlice from "./slices/friendshipSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'friends',          // Key to use in storage
  storage,              // Storage engine to use (e.g., local storage)
  version: 1
}

const persistedFriendshipSlice = persistReducer(persistConfig, friendshipSlice);


const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
    posts: postsSlice,
    friendship: friendshipSlice,
    profile: profileSlice,
  }
});

// const persistor = persistStore(store)

export default store;
