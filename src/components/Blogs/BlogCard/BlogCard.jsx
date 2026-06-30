import React, { useEffect, useState } from "react";
import BlogCardStyle from "./blogcard.module.css";
import like from "../../../assets/blogCardSvgs/like.png";
import save from "../../../assets/blogCardSvgs/save.png";
import liked from "../../../assets/blogCardSvgs/liked.png";
import saved from "../../../assets/blogCardSvgs/saved.png";
import { useNavigate } from "react-router-dom";
import { likeBlog, saveBlog } from "../../../services/blogsService";
import moment from "moment";
import { useAuth } from "../../../AuthProvider/AuthContext";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function BlogCard({
  data = [],
  index,
  savedBlog,
  setBlogsData,
  blogsData,
  profile = false,
}) {
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

  const [blogData, setBlogData] = useState("");

  function htmlToText(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  useEffect(() => {
    const paragraphsOnly = data?.body?.match(/<p[^>]*>.*?<\/p>/g) || [];

    const rawHtml = paragraphsOnly[0];
    const planeText = htmlToText(rawHtml);
    const shortText = truncateText(planeText, 299);
    setBlogData(shortText);
  }, [data?.body]);

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
    // api call
  };

  const handleBlogClick = (id, index) => {
    if (profile === true) {
      navigate(`${id}?index=${index}`);
      return;
    }
    navigate(`/blogs/${id}?index=${index}`);
  };

  return (
    <div className={BlogCardStyle.blogCardContainer}>
      <div className={BlogCardStyle.header}>
        <div className={BlogCardStyle.circle}>{index}</div>
        <div className={BlogCardStyle.btnsContainer}>
          <button
            className={`${BlogCardStyle.circle} ${BlogCardStyle.btn}`}
            onClick={(e) => handlelike(e)}
          >
            <img
              src={!authUser ? like : data?.isLiked ? liked : like}
              alt="like"
            />
          </button>
          <button
            className={`${BlogCardStyle.circle} ${BlogCardStyle.btn}`}
            onClick={(e) => handleSave(e)}
          >
            <img
              src={!authUser ? save : data?.isSaved ? saved : save}
              alt="save"
            />
          </button>
        </div>
      </div>

      <div
        className={BlogCardStyle.infoContainer}
        onClick={() => handleBlogClick(data._id, index)}
      >
        <div className={BlogCardStyle.info}>
          <h4>{data?.heading}</h4>

          <p
            className={`paragraph-small`}
            dangerouslySetInnerHTML={{
              __html: `<p>${blogData}</p>`,
            }}
          >
            {/* {window.screen.width <= 800
              ? data?.body?.length > 100
                ? data?.body.slice(0, 99) + "..."
                : data?.body
              : data?.body?.length > 300
              ? data?.body.slice(0, 299) + "..."
              : data?.body} */}
          </p>

          <p className="paragraph-small">{moment(data?.createdAt).fromNow()}</p>
        </div>
        <div className={BlogCardStyle?.image}>
          <img
            src={`${apiBaseUrl}/s3/getimage?key=${data?.image}`}
            alt="blogImage"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
