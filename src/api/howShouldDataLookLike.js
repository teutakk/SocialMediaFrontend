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
  firstName: "",
  lastName: "",
  description: "",
  pictures: [{}, {}],
  likes: [
    {
      _id: "",
      userId: "",
      firstName: "",
      lastName: "",
    },
  ],
  comments: [
    {
      _id: "",
      userId: "",
      profilePicture: "?when we complete the saving of images",
      firstName: "",
      lastName: "",
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
