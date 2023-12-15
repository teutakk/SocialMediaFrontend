import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./Stories.module.css";
import CreateStory from "./CreateStory";

// Dummy data for stories (Replace when backend is ready)
const dummyStories = [
  {
    id: 1,
    user: {
      id: 1,
      username: "user1",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://www.fenews.co.uk/wp-content/uploads/2022/01/social-media-1200x800.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "user2",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://img.freepik.com/free-vector/social-media-icons-vector-set-with-facebook-instagram-twitter-tiktok-youtube-logos_53876-126271.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698710400&semt=ais",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "user3",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://www.forbes.com/advisor/wp-content/uploads/2023/05/Social_Media_Statistics_-_article_image.jpg",
    timestamp: "2023-10-30T08:00:00.000Z",
  },
  {
    id: 4,
    user: {
      id: 4,
      username: "user4",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej-1280x720.png",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "user5",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://www.michalsons.com/wp-content/uploads/2018/08/Social-media-policy-e1561619696311.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 6,
    user: {
      id: 1,
      username: "user1",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://statisticsbyjim.com/wp-content/uploads/2019/05/random_dice.png",
    timestamp: "2023-10-30T08:00:00.000Z",
  },
  {
    id: 7,
    user: {
      id: 6,
      username: "user6",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://cdn.ebaumsworld.com/mediaFiles/picture/2452130/85386504.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 8,
    user: {
      id: 1,
      username: "user1",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://st.depositphotos.com/2001755/3622/i/450/depositphotos_36220949-stock-photo-beautiful-landscape.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 9,
    user: {
      id: 4,
      username: "user4",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    timestamp: new Date().toISOString(),
  },
  {
    id: 10,
    user: {
      id: 4,
      username: "user4",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://img.freepik.com/premium-photo/beautiful-landscape-based-3d-rendering-illustration_771975-25.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699056000&semt=ais",
    timestamp: new Date().toISOString(),
  },
  {
    id: 11,
    user: {
      id: 6,
      username: "user6",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    imageUrl:
      "https://121clicks.com/wp-content/uploads/2022/01/most_beautiful_places_nature_01.jpg",
    timestamp: new Date().toISOString(),
  },
];

const Stories = () => {
  // const dispatch = useDispatch();
  const [openStory, setOpenStory] = useState({
    userId: null,
    currentIndex: null,
  });
  let userStories = {};

  // useEffect(() => {
  //   dispatch(fetchStories());
  // }, [dispatch]);

  dummyStories.forEach((story) => {
    const userId = story.user.id;
    const storyTime = new Date(story.timestamp).getTime();
    const now = new Date().getTime();
    if (now - storyTime <= 24 * 60 * 60 * 1000) {
      if (!userStories[userId]) {
        userStories[userId] = [];
      }
      userStories[userId].push({
        ...story,
      });
    }
  });

  let userStoryKeys = Object.keys(userStories);

  // Remove stories after 24 hours
  useEffect(() => {
    const now = new Date().getTime();

    // Create a new object to store updated stories
    const updatedUserStories = {};

    for (const userId in userStories) {
      const filteredStories = userStories[userId].filter((story) => {
        const storyTime = new Date(story.timestamp).getTime();
        const isWithin24Hours = now - storyTime <= 24 * 60 * 60 * 1000;

        return isWithin24Hours;
      });

      if (filteredStories.length > 0) {
        updatedUserStories[userId] = filteredStories;
      }
    }

    // Update userStories with the filtered stories
    userStories = updatedUserStories;

    // Update userStoryKeys after filtering
    userStoryKeys = Object.keys(userStories);
  }, [userStories]);

  const handleStoryClick = (userId, currentIndex) => {
    setOpenStory({ userId, currentIndex });
  };

  const handleNextStory = () => {
    if (openStory.userId !== null) {
      const { userId, currentIndex } = openStory;
      if (currentIndex < userStories[userId].length - 1) {
        const nextIndex = currentIndex + 1;
        setOpenStory({ userId, currentIndex: nextIndex });
      } else {
        const currentIndex = userStoryKeys.indexOf(userId);
        if (currentIndex < userStoryKeys.length - 1) {
          const nextUser = userStoryKeys[currentIndex + 1];
          setOpenStory({ userId: nextUser, currentIndex: 0 });
        } else {
          const firstUser = userStoryKeys[0];
          setOpenStory({ userId: firstUser, currentIndex: 0 });
        }
      }
    }
  };

  const handlePreviousStory = () => {
    if (openStory.userId !== null) {
      const { userId, currentIndex } = openStory;
      if (currentIndex > 0) {
        const previousIndex = currentIndex - 1;
        setOpenStory({ userId, currentIndex: previousIndex });
      } else {
        const currentIndex = userStoryKeys.indexOf(userId);
        if (currentIndex > 0) {
          const previousUser = userStoryKeys[currentIndex - 1];
          const previousUserStoryCount = userStories[previousUser].length;
          setOpenStory({
            userId: previousUser,
            currentIndex: previousUserStoryCount - 1,
          });
        } else {
          const lastUser = userStoryKeys[userStoryKeys.length - 1];
          const lastUserStoryCount = userStories[lastUser].length;
          setOpenStory({
            userId: lastUser,
            currentIndex: lastUserStoryCount - 1,
          });
        }
      }
    }
  };

  const renderStoryModal = () => {
    const { userId, currentIndex } = openStory;
    if (userId !== null) {
      return (
        <div className={classes.storyModal}>
          <div className={classes.storyModalProfile}>
            <img
              className={classes.storyModalProfileImg}
              src={userStories[userId][currentIndex].user.profilePicture}
              alt={`${userStories[userId][currentIndex].user.username}'s profile`}
            />
            <div className={classes.storyModalUsername}>
              {userStories[userId][currentIndex].user.username}
            </div>
          </div>
          <img
            className={classes.storyModalImg}
            src={userStories[userId][currentIndex].imageUrl}
            alt={`Story by ${userStories[userId][currentIndex].user.username}`}
          />
          <button
            onClick={() => setOpenStory({ userId: null, currentIndex: null })}
            className={classes.storyModalBtn}
          >
            Close
          </button>
          <button onClick={handlePreviousStory} className={classes.previousBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
          </button>
          <button onClick={handleNextStory} className={classes.nextBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          </button>
        </div>
      );
    }
  };

  return (
    <div className={classes.storyContainer}>
      <div className={classes.storyList}>
        <CreateStory />
        {userStoryKeys.map((userId) => {
          const userStoriesForUser = userStories[userId];
          if (userStoriesForUser.length > 0) {
            return (
              <div
                key={userId}
                className={classes.story}
                onClick={() => handleStoryClick(userId, 0)}
              >
                <img
                  src={userStoriesForUser[0].imageUrl}
                  alt={`Story by ${userStoriesForUser[0].user.username}`}
                  className={classes.storyImages}
                />
                <div className={classes.userProfile}>
                  <img
                    src={userStoriesForUser[0].user.profilePicture}
                    alt={`${userStoriesForUser[0].user.username}'s profile`}
                  />
                </div>
                <p className={classes.underUsername}>
                  {userStoriesForUser[0].user.username}
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {renderStoryModal()}
    </div>
  );
};

export default Stories;
