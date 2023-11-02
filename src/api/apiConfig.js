const BASE_URL = "http://localhost:3001"; // if we include the "/" we have to take care not to include it in routes
const API_ROUTES = {
  //  define routes here, so we can use them without making spelling mistakes
  //  we redefine route when backend routes are ready
  login: "/auth/login",
  register: "/auth/register",
  posts: "/posts",
  users: "/users",
  user: "/users/",
  post: "/post",
  comment: "/comments",
<<<<<<< HEAD
  friendRequest: "/friend-requests",
=======
  friendRequest: "/friend-request",
  getFriendRequest: "/get-friend-request",
  acceptFriendRequest: "/accept-request"
>>>>>>> main
};

export { BASE_URL, API_ROUTES };
