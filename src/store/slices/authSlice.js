import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// Async function to handle user authentication
export const authenticateUser = createAsyncThunk(
  "authentication/authenticateUser",
  async (credentials) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.login, credentials);
      const token = response.data.token;
      localStorage.setItem("token", token);

      return response.data;
    } catch (err) {
      console.log("Error in authenticateUser thunk:", err);
      throw Error(`Authentication failed: ${err.message}`);
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logInWithToken: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      // logging out
      state.user = null;
      state.status = "idle";
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
        state.user = action.payload.user;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.authentication.user;
export const selectAuthStatus = (state) => state.authentication.status;
export const selectAuthError = (state) => state.authentication.error;

export const { logoutUser, logInWithToken } = authSlice.actions;

export default authSlice.reducer;
