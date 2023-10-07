import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  registeredUser: "",
  status: "idle",
  error: null,
};

// asyncthunk is responsible to make the fetchReqests.
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    const { firstName, lastName, email, password, birthday, gender } = userData;
    // excluding the confirmPassword from data sent to backend
    const newUserData = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: password.toLowerCase(),
      birthday: birthday.toLowerCase(),
      gender: gender.toLowerCase(),
    };
    const response = await axiosInstance.post(API_ROUTES.login, userData);
    // check form of response
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registeredUser = action.payload;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectRegisteredUser = (state) => state.register.user;
export const selectRegisteredStatus = (state) => state.register.status;
export const selectRegisteredError = (state) => state.register.error;

export default registerSlice.reducer;
