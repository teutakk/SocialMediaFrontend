import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ROUTES } from "../../api/apiConfig";

const initialState = {
  notifications: [],
  status: {
    fetch: "idle",
    read: "idle",
  },
  error: {
    fetch: null,
    read: null,
  },
};

const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    try {
      const response = await axiosInstance.get(API_ROUTES.notifications);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const readNotification = createAsyncThunk(
  "notifications/readNotifications",
  async ({ id, data }) => {
    try {
      const response = await axiosInstance.patch(
        API_ROUTES.notifications + id,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (id) => {
    try {
      const response = await axiosInstance.patch(API_ROUTES.notifications, id);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status.fetch = "loading";
        state.error.fetch = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status.fetch = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error.fetch = action.error.message;
      })
      .addCase(readNotification.pending, (state) => {
        state.status.read = "loading";
        state.error.read = null;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        // find the updated notification and update the read state of it
        const index = state.notifications.findIndex(
          (notification) => notification._id === action.payload._id
        );
        if (index !== -1) {
          //   state.notifications[index].read = "true";
          // or if we get the whole notification as a response then we can do it like this
          state.notifications[index] = action.payload;
        }
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.status.read = "failed";
        state.error.read = action.error.message;
      });
  },
});

export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationsStatus = (state) => state.notifications.status;
export const selectNotificationsError = (state) => state.notifications.error;

export const { clearNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
