import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";

export const getNotifications = createAsyncThunk("posts/notifications", async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ROUTES.posts + "/notifications",
        data
      );
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      throw Error(err.message.data.error);
    }
  });

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
      data: [], // Array to store notifications
      status: 'idle', // String to store loading status
      error: null, // To store any error that occurs
    },
    reducers: {
      // You can add any additional synchronous reducers here
    },
    extraReducers: (builder) => {
      builder
        .addCase(getNotifications.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getNotifications.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.data; // Assuming the payload has a 'data' property
        })
        .addCase(getNotifications.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message; // Set error message
        });
    },
  });
  
  export default notificationsSlice.reducer;