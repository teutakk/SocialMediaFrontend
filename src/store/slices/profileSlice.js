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
  async () => {
    try {
      const response = await axiosInstance.get(API_ROUTES.user);
      return response.data;
    } catch (err) {
      throw new Error(err.response.deta.error);
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
  extraReducers: (builder) => {},
});

export const { selectProfilePageUser } = (state) => state.profile.user;

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
