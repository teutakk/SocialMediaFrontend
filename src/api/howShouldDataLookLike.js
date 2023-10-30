const user = {
  _id: "",
  firstName: "",
  lastName: "",
  profilePicture: [{ img: "url" }],
  coverPhoto: [{ img: "url" }],
  posts: [],
  friends: [],
  about: {
    contacts: {
      phone: "",
    },
    education: {
      university: {},
      school: {},
      middleSchool: {},
    },
  },
};

const post = {
  _id: "",
  userId: "",
  author: "",
  description: "",
  pictures: [{}, {}],
  likes: [
    {
      _id: "",
      userId: "",
      author: "",
      profilePicture: "",
    },
  ],
  comments: [
    {
      _id: "",
      userId: "",
      profilePicture: "?when we complete the saving of images",
      author: "",
      likes: [
        {
          _id: "",
          userId: "",
          firstName: "",
          lastName: "",
        },
      ],
    },
  ],
  shares: [
    {
      _id: "",
      userId: "",
      firstName: "",
      lastName: "",
    },
  ],
};

const notification = [
  {
    _id: "",
    type: "friend notif | friendConfirm notif | like notif | comment | notif | share notif etj",
    notificationSender: {
      _id: "",
      firtName: "",
      lastName: "",
      profilePicture: "?",
    },
    postId: "or commentId",

    content: "if comment, description",
  },
];
