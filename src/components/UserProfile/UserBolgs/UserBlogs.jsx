import React, { useEffect, useState } from "react";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import {
  fetchSavedBlogs,
  getBlogsList,
  saveBlog,
} from "../../../services/blogsService";
import Toast from "../../ui/ToastMsg/Toast";
import { useToast } from "../../../hooks/hooks";
import styles from "./UserBlogs.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider/AuthContext";
import SmallBlogCard from "../../Blogs/SmallScreenBlogCard/BlogCard";
import BlogCard from "../../Blogs/BlogCard/BlogCard";
import { getErrorMessage } from "../../../utils/errorHandler";

const UserBlogs = () => {
  const [blogsData, setBlogsData] = useState(null);
  const [error, setError] = useState(null);
  const [openSaved, setOpenSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  async function fetchBlogs() {
    setLoading(true);
    try {
      const data = await fetchSavedBlogs(authUser?.id);
      setBlogsData(data?.data?.blogs);
    } catch (err) {
      toast.error("Something went wrong");
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [authUser]);

  const savedBlog = async (id) => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    try {
      const res = await saveBlog(id);
      if (openSaved) fetchBlogs();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Navbar */}
      <ProfileNavbar
        name={"Blogs"}
        handleClick={() => {
          navigate("/profile");
        }}
      />

      {/* User Blogs */}
      {(!loading && blogsData && blogsData?.length <= 0) ||
      (!loading && blogsData === null) ? (
        <p className={`paragraph-large ${styles.noBlogsContainer}`}>
          There is no saved blog
        </p>
      ) : (
        <>
          <div className={styles.smallScreen}>
            {blogsData?.map((blog, i) => (
              <div className={`${styles.Blog} blog${blog._id}}`} key={blog._id}>
                <SmallBlogCard
                  profile={true}
                  data={blog}
                  savedBlog={savedBlog}
                  index={(i + 1).toString().padStart(2, "0")}
                  setBlogsData={setBlogsData}
                  blogsData={blogsData}
                />
              </div>
            ))}
          </div>
          <div className={`${styles.blogCards} blogCardDiv`}>
            {blogsData?.map((blog, i) => (
              <div className={`${styles.Blog} blog${blog._id}}`} key={blog._id}>
                <BlogCard
                  profile={true}
                  data={blog}
                  index={(i + 1).toString().padStart(2, "0")}
                  savedBlog={savedBlog}
                  setBlogsData={setBlogsData}
                  blogsData={blogsData}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserBlogs;
