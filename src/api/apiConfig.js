const BASE_URL = "http://localhost:3001/"; // if we include the "/" we have to take care not to include it in routes
const API_ROUTES = {
  //  define routes here, so we can use them without making spelling mistakes
  //  we redefine route when backend routes are ready
  login: "/auth/login",
  register: "/auth/register",
  posts: "/posts",
  feedPosts: "/posts/feedPosts",
  saved: "/posts/",
  users: "/users",
  user: "/users/",
  updateUser: "/update/",
  post: "/post",
  deletePost: "/delete-post",
  savedPosts: "/savedPosts",
  unsavePost: "/unsavePost",
  comment: "/comments",
  likeComment: "/like-comment",
  replyComment: "/reply-comment",
  deleteComment: "/delete-comment",
  friendRequest: "/friend-request",
  getFriendRequest: "/get-friend-request",
  acceptFriendRequest: "/accept-request",
  removeFriendRequest: "/delete-friend",
  suggestedFriends: "/suggested-friends",
  getSentRequests: "/get-send-request",
  cancelFriendRequest: "/cancel-request",
  profileViews: "/profile-view",
  addProfilePic: "/users/profilePicture/" //:userId
};

export { BASE_URL, API_ROUTES };
