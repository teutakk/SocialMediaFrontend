import React, { useState } from "react";
import classes from "./PostContent.module.css";
import Modal from "../../layout/Modal";
import ImageSlider from "./ImageSlider";

const PostContent = ({ post, type }) => {
  const [modalOpen, setModalOpen] = useState();
  // function to open and close modal
  const showModal = () => {
    setModalOpen((prev) => !prev);
  };
  // Photo content will control how the photos are shown. Different grids in case of different number of images
  let photoContent;
  // for more than 3
  if (post.pictures?.length > 3) {
    photoContent = (
      <div className={classes.ImageHolder} onClick={showModal}>
        <div className={classes.first}>
          <img src={post.pictures[0]} alt="laksjdlajsd" />
        </div>
        <div className={classes.second}>
          <img src={post.pictures[1]} alt="lkasjdlkajd" />
        </div>
        <div className={classes.third}>
          <img src={post.pictures[2]} alt="askldjlkasd" />
          {post.pictures?.length > 3 && (
            <div className={classes.overlay}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 83 83"
                fill="none"
              >
                <path
                  d="M59.7945 41.3928C59.801 42.6121 59.323 43.7841 58.4657 44.6511C57.6084 45.5182 56.4419 46.0093 55.2226 46.0166C54.6186 46.0135 54.0211 45.8914 53.4643 45.6573C52.9074 45.4232 52.4022 45.0817 51.9773 44.6524C51.5524 44.223 51.2163 43.7141 50.9881 43.1549C50.7599 42.5956 50.6441 41.9969 50.6472 41.3928C50.6436 40.7885 50.7591 40.1894 50.9871 39.6297C51.2151 39.0701 51.5512 38.5608 51.9761 38.1311C52.401 37.7014 52.9064 37.3596 53.4635 37.1253C54.0205 36.891 54.6183 36.7688 55.2226 36.7656C57.7472 36.7656 59.7945 38.8371 59.7945 41.3928Z"
                  fill="#eee"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M62.7065 25.6193C59.7704 25.2043 55.9904 25.2043 51.2767 25.2043H31.7233C27.0096 25.2043 23.2296 25.2043 20.2935 25.6193C17.2606 26.0516 14.7325 26.9784 12.8512 29.1468C10.9733 31.3187 10.3958 33.9781 10.375 37.0768C10.3543 40.0717 10.8557 43.862 11.4782 48.5896L12.7405 58.1726C13.2281 61.8696 13.6224 64.8576 14.2345 67.1989C14.8743 69.6335 15.815 71.6567 17.5822 73.2198C19.3459 74.783 21.4555 75.4608 23.9248 75.779C26.3006 76.0833 29.2852 76.0833 32.9683 76.0833H50.0317C53.7148 76.0833 56.6994 76.0833 59.0753 75.779C61.548 75.4608 63.6506 74.783 65.4178 73.2198C67.1851 71.6567 68.1257 69.6335 68.7655 67.1989C69.3776 64.8576 69.7719 61.8661 70.2595 58.1726L71.5218 48.5896C72.1443 43.862 72.6458 40.0717 72.625 37.0733C72.6008 33.9781 72.0302 31.3187 70.1488 29.1503C68.2675 26.9784 65.7395 26.0516 62.7065 25.6193ZM20.9298 30.1982C18.4191 30.5578 17.1464 31.208 16.2957 32.1971C15.438 33.1827 14.9677 34.5418 14.9469 37.1079C14.9296 39.7432 15.3827 43.2084 16.0363 48.1573L16.2092 49.4714L17.4923 48.5273C20.8123 46.0996 25.7093 46.2172 28.8633 48.8559L40.5663 58.6533C41.6729 59.5802 43.5785 59.7531 44.9549 58.9438L45.7676 58.4666C49.6582 56.1772 54.8768 56.4192 58.4666 59.1237L64.8023 63.8962C65.1135 62.1808 65.3936 60.0747 65.7464 57.4083L66.9637 48.1573C67.6173 43.2119 68.0704 39.7432 68.0496 37.1079C68.0323 34.5418 67.562 33.1827 66.7078 32.1971C65.8536 31.208 64.5809 30.5578 62.0667 30.1982C59.4903 29.8316 56.0319 29.8281 51.0969 29.8281H31.9031C26.9681 29.8281 23.5063 29.8316 20.9298 30.1982Z"
                  fill="#eee"
                />
                <path
                  d="M30.6375 6.91668H52.3627C53.089 6.91668 53.6423 6.91668 54.1265 6.96855C55.782 7.15388 57.3545 7.79149 58.6716 8.81147C59.9886 9.83145 60.9994 11.1944 61.593 12.7509H21.4072C22.0008 11.1944 23.0116 9.83145 24.3287 8.81147C25.6457 7.79149 27.2182 7.15388 28.8737 6.96855C29.3579 6.91668 29.9112 6.91668 30.6375 6.91668ZM23.7934 15.5625C19.4636 15.5625 15.9153 18.4675 14.7326 22.3201C14.7073 22.4005 14.6831 22.4812 14.66 22.5622C15.8981 22.1472 17.1846 21.8705 18.4918 21.6872C21.8568 21.2065 26.1071 21.2065 31.0421 21.2065H52.4941C57.4292 21.2065 61.6795 21.2065 65.041 21.6872C66.3482 21.8705 67.6347 22.1437 68.8797 22.5622C68.8566 22.4812 68.8324 22.4005 68.8071 22.3201C67.6209 18.4675 64.0726 15.5625 59.7463 15.5625H23.7865H23.7934Z"
                  fill="#eee"
                />
              </svg>
              <p>+{post.pictures?.length - 2} more items</p>
            </div>
          )}
        </div>
      </div>
    );
    // when there are 3 photos uploaded
  } else if (post.pictures?.length === 3) {
    photoContent = (
      <div className={classes.ImageHolder} onClick={showModal}>
        <div className={classes.first}>
          <img src={post.pictures[0]} alt="laksjdlajsd" />
        </div>
        <div className={classes.second}>
          <img src={post.pictures[1]} alt="lkasjdlkajd" />
        </div>
        <div className={classes.third}>
          <img src={post.pictures[2]} alt="askldjlkasd" />
        </div>
      </div>
    );
    // when there are 2 photos uploaded we show them side by side
  } else if (post.pictures?.length === 2) {
    photoContent = (
      <div className={classes.ImageHolderType2} onClick={showModal}>
        <img src={post.pictures[0]} alt="asldkj" />
        <img src={post.pictures[1]} alt="kasjhkj" />
      </div>
    );
    // and when it is one we show it fully on screen
  } else if (post.pictures?.length === 1) {
    photoContent = (
      <div className={classes.ImageHolderType1} onClick={showModal}>
        <img src={post.pictures[0]} alt="lasjdkkjasd" />
      </div>
    );
  } else {
    photoContent = null;
  }

  let likesContent;

  if (post.likes?.length >= 3) {
    likesContent = (
      <div className={classes.likesHolder}>
        <span className={classes.logo}>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="aksd"
          />
        </span>
        <span className={classes.logo}>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="sajdasd"
          />
        </span>
        <span className={classes.logo}>
          <img
            src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="kajdakjsd"
          />
        </span>
        <p>
          {post.likes[0].author} and {post.likes?.length - 1} others like this
          post.
        </p>
      </div>
    );
  } else if (post.likes.length === 2) {
    likesContent = (
      <div className={classes.likesHolderType1}>
        <p>
          {post.likes[0].author} and {post.likes[1].author} liked this post
        </p>
      </div>
    );
  } else if (post.likes.length === 1) {
    likesContent = (
      <div className={classes.likesHolderType1}>
        <p>{post.likes[0]?.author} liked this post</p>
      </div>
    );
  } else if (post.likes.length === 0) {
    likesContent = (
      <div className={classes.likesHolderType1}>
        <p>0 likes</p>
      </div>
    );
  }

  const likesContentSmall = (
    <div className={classes.likesHolderSmall}>
      <p>{post.likes.length} likes</p>
    </div>
  );

  return (
    <div className={classes.ContentHolder}>
      <div className={classes.content}>
        <p>{post.description}</p>
        {/* this type check is done so that when we open the pictures, we dont show pictures + post with pictures, because i reuse SinglePost in modal */}
        {type !== "modal-post" && post.pictures?.length > 0 && photoContent}
      </div>
      {modalOpen && (
        <Modal
          data={post}
          showActionButtons={false}
          showModal={showModal}
          modal={modalOpen}
          type={"SHOW-FULL-POST"}
        >
          <ImageSlider />
        </Modal>
      )}
      <div
        className={`${classes.PostData} ${
          type === "modal-post" ? classes.modalPostData : " "
        }`}
      >
        <div className={classes.likes}>
          {likesContent}
          {likesContentSmall}
        </div>
        <div className={classes.commentsAndShare}>
          <p>{post.comments?.length} comments</p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
