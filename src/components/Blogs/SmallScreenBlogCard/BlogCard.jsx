import React, { useState } from "react";
import styles from "../SmallScreenBlogCard/BlogCard.module.css";
import { useNavigate } from "react-router-dom";
import { likeBlog } from "../../../services/blogsService";
import like from "../../../assets/blogCardSvgs/like.png";
import save from "../../../assets/blogCardSvgs/save.png";
import liked from "../../../assets/blogCardSvgs/liked.png";
import saved from "../../../assets/blogCardSvgs/saved.png";
import moment from "moment";
import { useAuth } from "../../../AuthProvider/AuthContext";
import { getMediaUrl } from "../../../utils/functions";

const SmallBlogCard = ({
  data = [],
  index,
  savedBlog,
  setBlogsData,
  profile = false,
}) => {
  // const [isSaved, setIsSaved] = useState(data?.isSaved || false);
  // const [isLiked, setIsLiked] = useState(data?.isLiked || false);
  const navigate = useNavigate();
  const { authUser, setShowModel } = useAuth();

  const likedBlog = async () => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    try {
      const res = await likeBlog(data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    savedBlog(data?._id);
    setBlogsData((blogs) => {
      const updateState = blogs?.map((blog) => {
        if (blog._id === data?._id) {
          return { ...blog, isSaved: !blog.isSaved };
        } else {
          return blog;
        }
      });
      return updateState;
    });
  };

  const handlelike = (e) => {
    e.stopPropagation();
    likedBlog();
    setBlogsData((blogs) => {
      const updateState = blogs?.map((blog) => {
        if (blog._id === data?._id) {
          return { ...blog, isLiked: !blog.isLiked };
        } else {
          return blog;
        }
      });
      return updateState;
    });
  };

  const handleBlogClick = (id, index) => {
    if (profile === true) {
      navigate(`${id}?index=${index}`);
      return;
    }
    navigate(`/blogs/${id}?index=${index}`);
  };
  return (
    <div
      className={styles.BlogCard}
      onClick={() => handleBlogClick(data._id, index)}
    >
      <div className={styles?.image}>
        <img
          src={getMediaUrl(data?.image)}
          alt="blogImage"
        />
      </div>
      <div className={styles.context}>
        <div className={styles.circle}>
          <h5>{index}</h5>
        </div>
        <h5>{data?.heading}</h5>
      </div>
      <div className={styles.action}>
        <div className={styles.time}>{moment(data?.createdAt).fromNow()}</div>
        <div className={styles.btns}>
          <button
            className={`${styles.circle} ${styles.btn}`}
            onClick={(e) => handlelike(e)}
          >
            <img
              src={!authUser ? like : data?.isLiked ? liked : like}
              alt="like"
            />
          </button>
          <button
            className={`${styles.circle} ${styles.btn}`}
            onClick={(e) => handleSave(e)}
          >
            <img
              src={!authUser ? save : data?.isSaved ? saved : save}
              alt="save"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallBlogCard;
