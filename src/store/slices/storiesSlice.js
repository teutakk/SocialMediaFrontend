import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  stories: [],
  status: {
    fetch: "idle",
    create: "idle",
  },
  error: {
    fetch: null,
    create: null,
  },
};

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async () => {
    try {
      const response = await axiosInstance.get(API_ROUTES.stories); // Adjust the route as needed
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addStory = createAsyncThunk(
  "stories/addStory",
  async (newStory) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.stories, newStory); // Adjust the route as needed
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status.fetch = "loading";
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.stories = action.payload;
        state.status.fetch = "succeeded";
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error.fetch = action.error.message;
      })
      .addCase(addStory.pending, (state) => {
        state.status.create = "loading";
        state.error.create = null;
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.stories.push(action.payload);
      })
      .addCase(addStory.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.create = action.error.message;
      });
  },
});

export const selectStories = (state) => state.stories.stories;
export const selectStoriesStatus = (state) => state.stories.status;
export const selectStoriesErrors = (state) => state.stories.error;

export default storiesSlice.reducer;
