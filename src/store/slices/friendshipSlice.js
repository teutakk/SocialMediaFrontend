  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import { API_ROUTES } from "../../api/apiConfig";
  import axiosInstance from "../../api/axiosInstance";

  const initialState = {
    friends: [],
    pendingRequests: [],
    sentRequests: [],
    error: null,
    loading: "idle",
  };

  export const fetchFriends = createAsyncThunk(
    "friendship/fetchFriends",
    async (userId) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.getFriendRequest, {
          userId,
        });
        const data = await response.data;
        return data;
      } catch (error) {
        console.log("An error occurred while fetching friends");
        throw error;
      }
    }
  );
  export const sendFriendRequestAsync = createAsyncThunk(
    "friendship/sendFriendRequest",
    async ({ recipientUserId, senderUserId }) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.friendRequest, {
          requestTo: recipientUserId,
          user: { userId: senderUserId },
        });

        const data = await response.data;

        return data;
      } catch (error) {
        console.error("Failed to send friend request", error.message);
        throw error;
      }
    }
  );

  export const acceptFriendRequestAsync = createAsyncThunk(
    "friendship/acceptFriendRequest",
    async ({ rid, senderUserId, status }) => {
      try {
        const response = await axiosInstance.post(
          API_ROUTES.acceptFriendRequest,
          {
            rid: rid,
            user: { userId: senderUserId },
            status: status,
          }
        );
        const data = await response.data;
        return data;
      } catch (error) {
        console.error("Failed to accept friend", error.message);
        throw error;
      }
    }
  );

  export const removeFriendRequestAsync = createAsyncThunk(
    "friendship/removeFriend",
    async ({id, did}) => {
      try {
        const response = await axiosInstance.delete(
          API_ROUTES.removeFriendRequest, {
            data: {
              user: {userId: id},
              did: did
            }
          }
        );
        const data = response.data;
        return data
      } catch (error) {
        console.error("Failed to remove friend", error.message);
        throw error;
      }
    }
  );

  export const getSentRequests = createAsyncThunk(
    "friendship/getSentRequests",
    async (userId) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.getSentRequests, {
          userId,
        });
        const data = await response.data;
        return data;
      } catch (error) {
        console.log("An error occurred while fetching sent requests");
        throw error;
      }
    }
  );
  export const cancelFriendRequest = createAsyncThunk(
    "friendship/cancelFriendRequest",
    async ({ rid }) => {
      try {
        const response = await axiosInstance.post(
          API_ROUTES.cancelFriendRequest,
          {
            rid: rid
          }
        );
        const data = await response.data;
        return data;
      } catch (error) {
        console.error("Failed to cancel friend request", error.message);
        throw error;
      }
    }
  );

  export const viewProfile = createAsyncThunk(
    "friendship/getProfileViewers",
    async ({userId, profileUserId}) => {
      try {
        if(userId !== profileUserId){
        const response = await axiosInstance.post(API_ROUTES.profileViews, 
          {
            user: {userId},
            id: profileUserId
          }
        )
        const data = await response.data
        return data
        }
      } catch (error) {
        console.error(error);
        throw error
      }
    }
  )

  const friendshipSlice = createSlice({
    name: "friendship",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFriends.pending, (state) => {
          state.loading="idle"
        })
        .addCase(fetchFriends.fulfilled, (state, action) => {
          state.pendingRequests = action.payload.data;
          state.loading = "succeeded";
        })
        .addCase(fetchFriends.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(sendFriendRequestAsync.pending, (state) => {
          state.loading = "idle"
        })
        .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
          state.sentRequests.push(action.payload.data);
          state.loading = "succeeded";
        })
        .addCase(sendFriendRequestAsync.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(acceptFriendRequestAsync.pending, (state) => {
          state.loading = "idle"
        }) 
        .addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
          state.friends = action.payload.data;
          state.loading = "succeeded";
          const acceptedFriendId = action.payload.data.requestFrom;
          state.pendingRequests = state.pendingRequests.filter(
            (friend) => friend?.requestFrom?._id !== acceptedFriendId
          );
        })
        .addCase(acceptFriendRequestAsync.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(removeFriendRequestAsync.pending, (state) => {
          state.loading = "idle"
        })
        .addCase(removeFriendRequestAsync.fulfilled, (state, action) => {
          state.loading = "succeeded"
        })
        .addCase(removeFriendRequestAsync.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(getSentRequests.pending, (state) => {
          state.loading="idle"
        })
        .addCase(getSentRequests.fulfilled, (state, action) => {
          state.sentRequests = action.payload.data;
          state.loading = "succeeded";
        })
        .addCase(getSentRequests.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(cancelFriendRequest.pending, (state) => {
          console.log("Cancel friend request pending");
          state.loading = "idle"
        })
        .addCase(cancelFriendRequest.fulfilled, (state, action) => {
          state.loading = "succeeded"
          const cancelledFriendId = action.payload.data.requestTo;  
          console.log(action.payload.data);
          state.sentRequests = state.sentRequests.filter(
            (sentR) => sentR?.requestTo?._id !== cancelledFriendId
          );
        })
        .addCase(cancelFriendRequest.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
        .addCase(viewProfile.pending, (state) => {
          state.loading = "idle";
          console.log("state pending");
        })
        .addCase(viewProfile.fulfilled, (state, action) => {
          state.loading = "succeeded";
        })
        .addCase(viewProfile.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
        })
    },
  });

  // export const {
  // } = friendshipSlice.actions;

  export default friendshipSlice.reducer;
