import axiosInstance from "../../api/axiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  registeredUser: "",
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    const response = await axiosInstance.post("register_route", userData);
    // check form of response
    console.log(response);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.pending((state, action) => {
          state.status = "loading";
          state.error = null;
        })
      )
      .addCase(
        registerUser.fulfilled((state, action) => {
          console.log("action payload");
          state.registeredUser = action.payload;
          state.status = "succeeded";
        })
      )
      .addCase(
        registerUser.rejected((state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
      );
  },
});

export const selectRegisteredUser = (state) => state.register.user;
export const selectRegisteredStatus = (state) => state.register.status;
export const selectRegisteredError = (state) => state.register.error;

export default registerSlice.reducer;
