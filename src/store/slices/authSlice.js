import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
const API_URL = BASE_URL;

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// Async function to handle user authentication
export const authenticateUser = createAsyncThunk(
  "authentication/authenticateUser",
  async (credentials) => {
    const response = await axiosInstance.post(
      `${API_URL}${API_ROUTES.login}`,
      credentials
    );
    // if we name it token
    const token = response.data.token;
    // Saving the token to localStorage
    localStorage.setItem("token", token);

    return response.data;
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutUser: (state) => {
      // logging out
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
