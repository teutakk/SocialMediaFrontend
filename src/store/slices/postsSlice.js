import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  status: {
    fetch: "idle",
    edit: "idle",
    delete: "idle",
    comment: "idle",
    like: "idle",
    save: "idle",
  },
  error: {
    fetch: null,
    edit: null,
    delete: null,
    comment: null,
    like: null,
    create: null,
  },
};

// ***fix the corrent route on API_ROUTE for all of the fetch request***

// here we handle all of the fetch request that have to do with posts, eg liking, commenting, editing, deleting

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // in the fute this has to be posts of you, and your friends
  const response = await axiosInstance.get(API_ROUTES.posts);
  return response.data;
});

export const editPost = createAsyncThunk("posts/editPost", async (data) => {
  // this action can be performed only by the owner of the post. CHECK FOR THAT
  const response = await axiosInstance.patch(API_ROUTES.posts[data.id], data);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  // this action can be performed only by the owner of the post. CHECK FOR THAT
  const response = await axiosInstance.delete(API_ROUTES.posts.id);
  return response.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
  const response = await axiosInstance.post(API_ROUTES.posts, data);
  return response.data;
});

export const savePost = createAsyncThunk("posts/savePost", async (postId) => {
  // here we need to be careful where we send the data, we need to post these data to the userId
  const response = await axiosInstance.post(API_ROUTES.saved, postId);
  return response.data;
});

export const commentPost = createAsyncThunk("posts/commentPost", async () => {
  // comment logic here
  return;
});

export const likePost = createAsyncThunk("posts/likePost", async () => {
  // like logic here
  return;
});

export const sharePost = createAsyncThunk("posts/sharePost", async () => {
  // share logic here
  return;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching posts, handling all cases of responses
      .addCase(fetchPosts.pending, (state, action) => {
        state.status.fetch = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status.fetch = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error.fetch = action.error.message;
      })
      // Editing posts, handling all cases of responses
      .addCase(editPost.pending, (state, action) => {
        state.state.edit = "loading";
        state.error.edit = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.state.edit = "succeeded";
        // find index of the edited post, this is done with the meaning of the patch request sending back a response with the whole edited post.
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        // updating the edited post so we can show it to the user
        state.posts[index] = action.payload;
        state.error.edit = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.state.edit = "failed";
        state.error.edit = action.error.message;
      })
      // Deleting posts, handling all cases of responses
      .addCase(deletePost.pending, (state, action) => {
        state.status.delete = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // then we exclude the said  post from the data of the posts
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.status.delete = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error.delete = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status.create = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status.create = "loading";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("action: ", action.payload);
        state.status.create = "failed";
        state.error.create = action.error.message;
      });
    // add all cases with .addCase, likes, comments, shares,
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectStats = (state) => state.posts.status;
export const selectError = (state) => state.posts.error;

export default postsSlice.reducer;
