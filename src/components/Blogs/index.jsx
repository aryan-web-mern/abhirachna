import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard/BlogCard";
import { data } from "react-router-dom";
import styles from "./Blogs.module.css";
import BlogNav from "./BlogNavbar/BlogNav";
import { Link, Outlet } from "react-router-dom";
import image from "../../assets/blogCardSvgs/sample.png";
import gsap from "gsap";
import {
  fetchSavedBlogs,
  getBlogsList,
  saveBlog,
} from "../../services/blogsService";
import { getErrorMessage } from "../../utils/errorHandler";
import SmallBlogCard from "./SmallScreenBlogCard/BlogCard";
import { useToast } from "../../hooks/hooks";
import { useAuth } from "../../AuthProvider/AuthContext";

const BlogsPage = () => {
  const {
    authUser,
    setShowModel,
    setAuthUser,
    loading: authLoading,
  } = useAuth();
  const toast = useToast();
  const [openSaved, setOpenSaved] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [savedBlogsData, setSavedBlogsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navRef = useRef();
  const mainBlogContainerRef = useRef();
  const blogheadRef = useRef();
  const hasMounted = useRef(false);
  const hasMounted2 = useRef(false);
  const smallmainBlogContainerRef = useRef(false);
  const [pageNo, setPageNo] = useState(1);
  const [savedPageNo, setSavedPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const smallScreenLoaderRef = useRef(null);
  const [total, setTotal] = useState(null);
  const [savedTotal, setSavedTotal] = useState(null);
  const [savedHasMore, setSavedHasMore] = useState(true);

  useEffect(() => {
    if (openSaved) {
      fetchingSavedBlogs(savedPageNo, 5);
      setBlogsData([]);
      setPageNo(1);

      const tl = gsap.timeline();

      tl.set([navRef.current], {
        position: "fixed",
        top: "22.6rem",
        zIndex: 100,
      });
      gsap.to(blogheadRef.current, {
        y: -500,
        duration: 0.5,
      });
      if (window.screen.width <= 590) {
        gsap.to(smallmainBlogContainerRef.current, {
          marginTop: 134,
          duration: 0.5,
        });
        gsap.set([blogheadRef.current], {
          marginTop: -20,
          duration: 0.5,
        });
        gsap.set([navRef.current], {
          marginTop: 27,
          duration: 1,
        });
        tl.to([navRef.current, mainBlogContainerRef.current], {
          y: -260,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        tl.to([navRef.current], {
          width: "1280px",
          y: -260,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.set([navRef.current], {
          marginTop: 65,
          duration: 1,
        });
        gsap.set([mainBlogContainerRef.current], {
          marginTop: 183,
          duration: 1,
          y: -260,
        });
      }
      if (window.screen.width >= 1296) {
        gsap.set([mainBlogContainerRef.current], {
          y: -260,
          marginTop: 183,
          duration: 1,
          y: -350,
        });
      }

      if (1295 < window.screen.width <= 1440) {
        gsap.set([mainBlogContainerRef.current], {
          marginTop: 289,
        });
      }
      if (window.screen.width >= 1024) {
        gsap.set([navRef.current], {
          marginTop: 65,
        });
      } else if (window.screen.width < 1024) {
        gsap.set([navRef.current], {
          marginTop: 45,
        });
      }
    } else if (hasMounted.current && !openSaved) {
      // fetchBlogs();

      gsap.to(blogheadRef.current, {
        y: +10,
        duration: 0.5,
      });
      gsap.set([navRef.current], {
        position: "",
        top: "",
        zIndex: "",
        width: "100%%",
      });
      gsap.set(mainBlogContainerRef.current, {
        marginTop: "",
        placeSelf: "center",
        // maxWidth: '1280',
        width: "100%",
        duration: 0.5,
        y: -2,
        ease: "power2.out",
      });
      // document.querySelector(".blogCardDiv").style.setProperty("width", "81%", "important")

      if (window.screen.width <= 590) {
        gsap.set([blogheadRef.current], {
          marginTop: 20,
          duration: 0.5,
        });
        gsap.to([navRef.current], {
          marginTop: 13,
          y: -2,
          ease: "power2.out",
          width: "100%",
          duration: 0.5,
        });

        gsap.to(smallmainBlogContainerRef.current, {
          marginTop: 294,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to([navRef.current], {
          width: "1064", // target width
          duration: 0.5,
          y: -2,
          ease: "power2.out",
        });
      }
    }
  }, [openSaved, savedPageNo]);

  async function fetchingSavedBlogs(page, limit) {
    setLoading(true);

    try {
      if (savedTotal !== null && savedBlogsData.length >= savedTotal) {
        // setSavedHasMore(false);
        return;
      }
      if (authUser?.id) {
        // console.log(authUser?.id, page, limit);

        const data = await fetchSavedBlogs(authUser?.id, page, limit);
        if (data?.success) {
          const newBlogs = data?.data?.blogs;
          setSavedBlogsData((prev) => [...prev, ...newBlogs]);
          setSavedTotal(data?.data?.total);
          setSavedHasMore(newBlogs.length > 0);
        }
      }
    } catch (err) {
      toast.error("Something went wrong", err.message);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlogs(page, limit) {
    setLoading(true);
    try {
      if (total !== null && blogsData.length >= total) {
        setHasMore(false);
        setHasMore(true);
        return;
      }
      // if (authUser?.id) {
      // console.log(authUser?.id, page, limit);

      const data = await getBlogsList(authUser?.id, page, limit);
      if (data?.success) {
        const blogsArray = data?.data?.blogs;

        setBlogsData((prev) => [...prev, ...blogsArray]);
        setTotal(data?.data?.total);
        setHasMore(blogsArray.length > 0);
        // console.log(blogsData);
      }
      // }
    } catch (err) {
      toast.error("Something went wrong", err.response.data.message);
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log(smallmainBlogContainerRef.current);

    // if(!smallmainBlogContainerRef.current) return;

    if (openSaved) {
      setTimeout(() => {
        smallmainBlogContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [openSaved]);

  useEffect(() => {
    if (openSaved) return;

    // if (!authUser) {
    //   setPageNo(1);
    // }

    if(authLoading === false && blogsData.length > 0 && pageNo === 1){
      setBlogsData([]);
    }

    if (!authUser?.id && authLoading === true) {
      // setBlogsData([]);
      setPageNo(1);
      return;
    }

    const innerWidth = window.innerWidth;

    fetchBlogs(pageNo, 5);
    setSavedPageNo(1);
    setSavedBlogsData([]);
  }, [authUser?.id, pageNo, openSaved, authLoading]);

  const savedBlog = async (id) => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    try {
      const res = await saveBlog(id);
      if (openSaved) {
        const innerWidth = window.innerWidth;
        setSavedPageNo(1);
        fetchingSavedBlogs(savedPageNo, 5);
        // setPageNo(1);
        // setBlogsData([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const savedClick = () => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    hasMounted.current = true;
    setOpenSaved((p) => !p);
  };

  //add here +>>>>> >>>>>

  const handleBack = () => {
    setOpenSaved(false);
  };

  useEffect(() => {
    if (loading) return;

    // console.log(savedHasMore, hasMore, "saved has more and has more");
    // console.log(smallScreenLoaderRef.current, "small screen loader ref");

    if (openSaved && !savedHasMore) return;
    if (!openSaved && !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (openSaved) {
          setSavedPageNo((prev) => {
            return prev + 1;
          });
        } else {
          setPageNo((prev) => {
            return prev + 1;
          });
        }
      }
    });

    const innerWidth = window.innerWidth;

    if (loaderRef.current && innerWidth > 590) {
      observer.observe(loaderRef.current);
    } else if (smallScreenLoaderRef.current && innerWidth < 590) {
      observer.observe(smallScreenLoaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, savedHasMore]);

  return (
    <>
      <div className={styles.mainBlogContainer}>
        <div className={styles.bloghead} ref={blogheadRef}>
          <h2 className={styles.head1}>Design Stories & Style Insights</h2>
          <div className={`${styles.head2} paragraph-medium`}>
            Explore design trends, expert tips, and real project stories from
            the Abhirachnaa team.
          </div>
        </div>
        {loading && <div>Loading....</div>}
        {blogsData && (
          <>
            <div
              className={`${styles.navContainerParent} ${
                openSaved
                  ? styles.openSavedNav
                  : styles.navContainerParentOnNotSave
              }`}
              ref={navRef}
            >
              <BlogNav
                handleBack={openSaved ? handleBack : undefined}
                handleSaved={savedClick}
                openSaved={openSaved}
                showSaved={true}
                count={
                  openSaved
                    ? `${savedTotal ? savedTotal : ""} Saved`
                    : `${total ? total : ""} Blogs`
                }
              />
            </div>

            {/* {blogsData.length <= 0 ? (
              <p className={`paragraph-large ${styles.noBlogsContainer}`}>
                There is no saved blog
              </p>
            ) : ( */}
            <>
              <div
                className={styles.smallScreen}
                ref={smallmainBlogContainerRef}
              >
                {openSaved ? (
                  savedBlogsData.length <= 0 ? (
                    <p className={`paragraph-large ${styles.noBlogsContainer}`}>
                      There is no saved blog.
                    </p>
                  ) : (
                    savedBlogsData?.map((blog, i) => (
                      <div
                        className={`${styles.Blog} blog${blog._id}}`}
                        key={blog._id}
                      >
                        <SmallBlogCard
                          data={blog}
                          index={(i + 1).toString().padStart(2, "0")}
                          savedBlog={savedBlog}
                          setBlogsData={setSavedBlogsData}
                          blogsData={blogsData}
                        />

                        {savedHasMore && !error && (
                          <div
                            ref={smallScreenLoaderRef}
                            style={{
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {loading && <span>Loading...</span>}
                          </div>
                        )}
                      </div>
                    ))
                  )
                ) : (
                  blogsData?.map((blog, i) => (
                    <div
                      className={`${styles.Blog} blog${blog._id}}`}
                      key={blog._id}
                    >
                      <SmallBlogCard
                        data={blog}
                        index={(i + 1).toString().padStart(2, "0")}
                        savedBlog={savedBlog}
                        setBlogsData={setBlogsData}
                        blogsData={blogsData}
                      />

                      {hasMore && !error && (
                        <div
                          ref={smallScreenLoaderRef}
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {loading && <span>Loading...</span>}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div
                className={`${styles.blogCards} blogCardDiv`}
                ref={mainBlogContainerRef}
              >
                {openSaved ? (
                  savedBlogsData.length <= 0 ? (
                    <p className={`paragraph-large ${styles.noBlogsContainer}`}>
                      There is no saved blog.
                    </p>
                  ) : (
                    savedBlogsData?.map((blog, i) => (
                      <div
                        className={`${styles.Blog} blog${blog._id}}`}
                        key={blog._id}
                      >
                        <BlogCard
                          data={blog}
                          index={(i + 1).toString().padStart(2, "0")}
                          savedBlog={savedBlog}
                          setBlogsData={setSavedBlogsData}
                          blogsData={blogsData}
                        />
                      </div>
                    ))
                  )
                ) : (
                  blogsData?.map((blog, i) => (
                    <div
                      className={`${styles.Blog} blog${blog._id}}`}
                      key={blog._id}
                    >
                      <BlogCard
                        data={blog}
                        index={(i + 1).toString().padStart(2, "0")}
                        savedBlog={savedBlog}
                        setBlogsData={setBlogsData}
                        blogsData={blogsData}
                      />
                    </div>
                  ))
                )}

                {hasMore && !error && (
                  <div
                    ref={loaderRef}
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading && <span>Loading...</span>}
                  </div>
                )}
              </div>
            </>
            {/* )} */}
          </>
        )}
      </div>
    </>
  );
};

export default BlogsPage;
