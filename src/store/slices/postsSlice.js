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
    replyComment: "idle",
  },
  error: {
    fetch: null,
    edit: null,
    delete: null,
    comment: null,
    like: null,
    create: null,
    dislike: null,
    replyComment: null,
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
  try {
    const response = await axiosInstance.put(
      API_ROUTES.posts + `/${data._id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
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
  try {
    const response = await axiosInstance.post(API_ROUTES.saved, postId);
    return response.data;
  } catch (error) {}
});

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (data) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.comment, data);
      return response.data;
    } catch (err) {
      throw Error(err.respnse.data.error);
    }
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
  async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ROUTES.likeComment + `/${data.id}`,
        data
      );
      return response.data;
    } catch (err) {
      console.error("Error in likeComment", err);
      throw Error(err.response.data.error);
    }
  }
);
export const replyComment = createAsyncThunk(
  "posts/replyComment",
  async (data) => {
    try {
      console.log("Sending request to:", API_ROUTES.replyComment);
      console.log("API route:", API_ROUTES.replyComment);
      const response = await axiosInstance.post(API_ROUTES.replyComment, data);

      console.log("Response:", response.data);

      return response.data;
    } catch (err) {
      console.error("Error in replyToComment", err);
      throw Error(err.response.data.error);
    }
  }
);

export const pinComment = createAsyncThunk("posts/pinComment", async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.comment + `/${data.commentId}/pin`
  );
  return response.data;
});

export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.posts + "/" + data.postId + "/like",
      data
    );

    return response.data;
  } catch (err) {
    throw Error(err.message.data.error);
  }
});

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (data) => {
    try {
      const response = await axiosInstance.delete(
        API_ROUTES.posts + "/" + data.postId + "/unlike",
        { data }
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

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
      .addCase(editPost.pending, (state) => {
        state.status.edit = "loading";
        state.error.edit = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status.edit = "succeeded";
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.payload.post._id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload.post;
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status.edit = "failed";
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
        const { postId } = action.payload;
        const postIndex = state.posts.findIndex((post) => post._id === postId);
        state.posts[postIndex].comments.push(action.payload);
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
        const post = state.posts.find((post) => post._id === postId);

        if (post) {
          const likedComment = post.comments.find((c) => c._id === commentId);

          if (likedComment) {
            likedComment.likes = likes;
          } else {
            console.warn(
              `Comment with ID ${commentId} not found in post with ID ${postId}`
            );
          }
        } else {
          console.warn(`Post with ID ${postId} not found`);
        }

        state.status.comment = "succeeded";
      })

      .addCase(likeComment.rejected, (state, action) => {
        state.status.comment = "failed";
        state.error.comment = action.error.message;
      })
      // reply to a comment, handling all cases of response
      .addCase(replyComment.pending, (state, action) => {
        state.status.comment = "loading";
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.status.comment = "succeeded";
        const { postId, updatedComment } = action.payload;
        const postIndex = state.posts.findIndex((post) => post._id === postId);

        if (postIndex !== -1) {
          const post = state.posts[postIndex];

          const commentedPost = {
            ...post,
            comments: post.comments.map((comment) =>
              comment._id === updatedComment._id ? updatedComment : comment
            ),
          };

          state.posts[postIndex] = commentedPost;
        } else {
          console.warn(`Post with ID ${postId} not found`);
        }
      })
      .addCase(replyComment.rejected, (state, action) => {
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
        state.status.like = "succeeded";

        const postsIndex = state.posts.findIndex(
          (post) => post._id === action.payload.newLike.postId
        );
        state.posts[postsIndex].likes.push(action.payload.newLike);
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status.like = "failed";
        state.error.like = action.error.message;
      })
      .addCase(dislikePost.pending, (state, action) => {
        state.status.dislike = "loading";
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.payload.postId
        );
        const newLikes = state.posts[postIndex].likes.filter(
          (like) => like.userId !== action.payload.userId
        );
        state.posts[postIndex].likes = newLikes;
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status.dislike = "failed";
        state.error.dislike = action.error.message;
      });
    // add all cases with .addCase, shares
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostErrors = (state) => state.posts.error;
export const selectEditPostId = (state) => state.posts.editPostId;

export default postsSlice.reducer;
