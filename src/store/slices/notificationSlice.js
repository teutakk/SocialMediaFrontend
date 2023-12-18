import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";

export const getNotifications = createAsyncThunk(
  "posts/notifications",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ROUTES.posts + "/notifications",
        { userId: data }
      );
      console.log("data: ", response);
      return response.data;
    } catch (err) {
      throw Error(err.message.data.error);
    }
  }
);

const initialState = {
  notifications: [],
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // You can add any additional synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("actionpayload: ", action.payload.messages);
        state.notifications = action.payload.messages;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Set error message
      });
  },
});

export const selectNotifications = (state) => state.notifications.notifications;

export default notificationsSlice.reducer;
