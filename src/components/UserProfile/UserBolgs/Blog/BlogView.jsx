import React, { useEffect, useState } from "react";
import styles from "./BlogView.module.css";
import {
  getBlogDetails,
  likeBlog,
  saveBlog,
} from "../../../../services/blogsService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../../AuthProvider/AuthContext";
import like from "../../../../assets/blogCardSvgs/like.png";
import save from "../../../../assets/blogCardSvgs/save.png";
import liked from "../../../../assets/blogCardSvgs/liked.png";
import saved from "../../../../assets/blogCardSvgs/saved.png";
import ProfileNavbar from "../../ProfileNavbar/ProfileNavbar";
import moment from "moment";
import { getErrorMessage } from "../../../../utils/errorHandler";
import { getMediaUrl } from "../../../../utils/functions";

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");

  const [error, setError] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(blogData?.isLiked || false);
  const [isLiked, setIsLiked] = useState(blogData?.isSaved || false);
  const { authUser, setShowModel } = useAuth();

  const likedBlog = async () => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    try {
      const res = await likeBlog(blogData?._id);
      if (res.success) {
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const savedBlog = async () => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    try {
      const res = await saveBlog(blogData?._id);
      if (res.success) {
        setIsSaved((p) => !p);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();

    savedBlog();
  };

  const handlelike = (e) => {
    e.stopPropagation();
    likedBlog();
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const data = await getBlogDetails(id, authUser?.id);
        setBlogData(data?.data);
        setIsSaved(data?.data?.isSaved || false);
        setIsLiked(data?.data?.isLiked || false);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [authUser]);

  return (
    <div className={styles.mainBlogContainer}>
      {blogData && (
        <>
          <ProfileNavbar
            name={"Blogs"}
            handleClick={() => {
              navigate("/profile/blogs");
            }}
          />

          <div className={styles.mainContainer}>
            <div className={styles.minHScreen}>
              <main className={styles.mainContext}>
                <div className={styles.headerLeft}>
                  <div className={styles.headerIcon}>
                    <span className={styles.count}>{index}</span>
                  </div>
                </div>

                <div className={styles.headerouter}>
                  <div className={styles.headerRight}>
                    <div className={styles.heartContain} onClick={handlelike}>
                      <img src={isLiked ? liked : like} alt="like" />
                    </div>
                    <div
                      className={styles.bookmarkContain}
                      onClick={handleSave}
                    >
                      <img src={isSaved ? saved : save} alt="save" />
                    </div>
                  </div>
                </div>

                <div className={styles.paraHeading}>
                  <h4>{blogData.heading}</h4>
                  <p className={`${styles.subtitle} paragraph-medium`}>
                    {blogData?.subheading}
                  </p>
                </div>

                <hr className={styles.line} />
                <div className={styles.blogdate}>
                  <label className={`${styles.date} label-medium`}>
                    {" "}
                    {moment(blogData?.createdAt).fromNow()}
                  </label>
                </div>
                <div className={styles.mainImageContainer}>
                  <img
                    className={styles.minimalimg}
                    src={getMediaUrl(blogData?.image)}
                    alt="Minimalist living space"
                  />
                </div>

                <section>
                  <div className={styles.data}>
                    <h4>{blogData?.title}</h4>
                    <p>{blogData?.body}</p>
                  </div>
                </section>

                {/* More sections here, same pattern */}
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogView;
