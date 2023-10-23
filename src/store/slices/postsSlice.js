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
    dislike: "idle",
  },
  error: {
    fetch: null,
    edit: null,
    delete: null,
    comment: null,
    like: null,
    create: null,
    dislike: null,
  },
  editPostId: null,
};

// ***fix the corrent route on API_ROUTE for all of the fetch request***

// here we handle all of the fetch request that have to do with posts, eg liking, commenting, editing, deleting

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.posts);
    return response.data;
  } catch (error) {
    throw error; // Handle errors appropriately
  }
});
export const editPost = createAsyncThunk("posts/editPost", async (data) => {
  const response = await axiosInstance.patch(API_ROUTES.posts[data.id], data);
  return response.data;
});

export const selectEditState = (state) => state.posts.editing;
export const startEdit = createAsyncThunk("posts/startEdit", (postId) => {
  return postId;
});
export const finishEdit = createAsyncThunk("posts/finishEdit", () => {
  return null;
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

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (data) => {
    const response = await axiosInstance.post(API_ROUTES.comment, data);
    return response.data;
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async (data) => {
    const response = await axiosInstance.patch(
      API_ROUTES.comment + `/${data.commentId}`,
      data
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId) => {
    const response = await axiosInstance.delete(
      API_ROUTES.comment + `/${commentId}`
    );
    return response.data;
  }
);

export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async (commentId) => {
    const response = await axiosInstance.post(
      API_ROUTES.comment + `/${commentId}/like`
    );
    return response.data;
  }
);

export const pinComment = createAsyncThunk("posts/pinComment", async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.comment + `/${data.commentId}/pin`
  );
  return response.data;
});

export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.posts[data.id].likes,
    data
  );
  return response.data;
});

export const dislikePost = createAsyncThunk("posts/dislikePost", async (id) => {
  const response = await axiosInstance.delete(API_ROUTES.posts.likes[id]);
  return response.data;
});

export const sharePost = createAsyncThunk("posts/sharePost", async () => {
  // share logic here
  return;
});

export const postsSlice = createSlice({
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
      .addCase(deletePost.pending.type, (state, action) => {
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
      .addCase(createPost.pending.type, (state, action) => {
        state.status.create = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.create = action.error.message;
      })
      //Adding a comment to a post, handling all cases of responses
      .addCase(commentPost.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.status.comment = "succeeded";
        const { postId, comment } = action.payload;
        //finding the post that user wants to add a comment
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          //adding the comment to the post that was found
          post.comments.push(comment);
        }
        state.comments.push(comment);
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      // Editing a comment, handling all cases of responses
      .addCase(editComment.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        //let the user find the post with the comment that wants to edit it
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          const editedCommentIndex = post.comments.findIndex(
            (c) => c.id === comment.id
          );
          if (editedCommentIndex !== -1) {
            post.comments[editedCommentIndex] = comment;
          }
        }
        state.status.comment = "succeeded";
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      // deleting a comment, handling all cases of responses
      .addCase(deleteComment.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        //let the user find the comment in a post and then delete it
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          post.comments = post.comments.filter((c) => c.id !== commentId);
        }
        state.status.comment = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      // liking a comment, handling all cases of responses
      .addCase(likeComment.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const { postId, commentId, likes } = action.payload;
        //let the user find the post and comment to update the likes
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          const likedComment = post.comments.find((c) => c.id === commentId);
          if (likedComment) {
            likeComment.likes = likes;
          }
        }
        state.status.comment = "succeeded";
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      // pinning a comment, handling all cases of responses
      .addCase(pinComment.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(pinComment.fulfilled, (state, action) => {
        const { postId, commentId, isPinned } = action.payload;
        //find the post with the comments to update the pinned status
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          const pinnedComment = post.comments.find((c) => c.id === commentId);
          if (pinnedComment) {
            pinnedComment.isPinned = isPinned;
          }
        }
        state.status.comment = "succeeded";
      })
      .addCase(pinComment.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      .addCase(likePost.pending, (state, action) => {
        state.status.like = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts.likes = action.payload;
        state.status.like = "succeeded";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status.like = "failed";
        state.error.like = action.error.message;
      })
      .addCase(dislikePost.pending, (state, action) => {
        state.status.dislike = "loading";
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.posts.likes = state.posts.likes.filter(
          (like) => like.id !== action.payload.id
        );
        state.status.dislike = "succeeded";
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status.dislike = "failed";
        state.error.dislike = action.error.message;
      });
    // add all cases with .addCase, shares
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectStats = (state) => state.posts.status;
export const selectError = (state) => state.posts.error;
export const selectEditPostId = (state) => state.posts.editPostId;
export default postsSlice.reducer;
