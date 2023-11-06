import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ROUTES } from "../../api/apiConfig";
const initialState = {
  user: "",
  status: "idle",
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "profilePage/fetchUserProfile",
  async (id) => {
    try {
      const response = await axiosInstance.get(API_ROUTES.users + id);
      return response.data;
    } catch (err) {
      throw new Error(err.response.deta.error);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "profilePage/fetchUserDetails",
  async (id) => {
    try {
      return await axiosInstance.get(API_ROUTES.users + "/" + id + "/about");
    } catch (err) {
      throw new Error(err.response.deta.error);
    }
  }
);

export const createUserDetails = createAsyncThunk(
  "profilePage/createUserDetails",
  async ({ userId, userDetails }) => {
    try {
      console.log("got to createUserDetails");

      console.log("outgoing old user response");
      console.log(userDetails);

      console.log("outgoing old userId");
      console.log(userId);

      console.log("outgoing URL");
      console.log(API_ROUTES.users + "/" + userId + "/about");

      const response = await axiosInstance.post(
        API_ROUTES.users + "/" + userId + "/about",
        userDetails
      );
      console.log("new user response");
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "profilePage/updateUserDetails",
  async ({ userId, userDetails }) => {
    try {
      const response = await axiosInstance.put(
        API_ROUTES.users + "/" + userId + "/about",
        userDetails
      );

      console.log("old user response");
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  }
);

export const deleteUserDetails = createAsyncThunk(
  "profilePage/deleteUserDetails",
  async (userId) => {
    try {
      const response = await axiosInstance.delete(
        API_ROUTES.users + "/" + userId + "/about"
      );
      return response;
    } catch (error) {
      console.error("Error deleting user details:", error);
    }
  }
);

const profileSlice = createSlice({
  name: "profilePage",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.user = action.error.message;
      });
  },
});

export const selectProfilePageUser = (state) => state.profile.user;
export const selectProfilePageUserStatus = (state) => state.profile.status;
export const selectProfilePageUserError = (state) => state.profile.error;

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
