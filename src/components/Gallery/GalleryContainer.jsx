import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard";
import styles from "./Gallery.module.css";
import GalleryNavbar from "./GalleryNavbar";
import AnimationOverlay from "./AnimationOverlay/AnimationOverlay";
import gsap from "gsap";
import {
  getAllGallery,
  getAllSavedGallery,
  saveGalleryImage,
  getGalleryById,
} from "../../services/galleryService";
import { setAwsImageURL } from "../../utils/functions";
import FullScreenPreview from "./FullScreenPreview";
import { getErrorMessage } from "../../utils/errorHandler";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useGSAP } from "@gsap/react";

const GalleryContainer = () => {
  const galleryRef = useRef(null);
  const mainContentRef = useRef(null);
  const mainPageRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [savedGalleryImages, setSavedGalleryImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const hasMounted = useRef(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { authUser, setShowModel } = useAuth();
  const firstRun = useRef(true);
  const loaderRef = useRef();

  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(null);
  const [savedPageNo, setSavedPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [savedHasMore, setSavedHasMore] = useState(true);
  const [savedTotal, setSavedTotal] = useState(null);

  async function fetchGalleryData(pageNumber, limit) {
    setLoading(true);
    try {
      if (total !== null && galleryImages.length >= total) {
        setHasMore(false);
        return;
      }
      const data = await getAllGallery(authUser?.id, pageNumber, limit);
      if (data?.success) {
        console.log(pageNo);

        console.log(data?.data?.galleries);

        const newImages = data?.data?.galleries || [];
        setGalleryImages((prev) => [...prev, ...newImages]);
        setTotal(data?.data?.total);
        // console.log(data?.data?.total);
        setHasMore(newImages.length > 0);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllSavedGallery(pageNumber, limit) {
    hasMounted.current = true;
    setLoading(true);
    try {
      if (savedTotal !== null && savedGalleryImages.length >= savedTotal) {
        setSavedHasMore(false);
        return;
      }
      const response = await getAllSavedGallery(pageNumber, limit);
      if (response?.success) {
        console.log(savedPageNo);
        console.log(response?.data?.galleries);

        const newImages = response?.data?.galleries || [];
        setSavedGalleryImages((prev) => [...prev, ...newImages]);
        setSavedTotal(response?.data?.total);
        setSavedHasMore(newImages.length > 0);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (openSaved) {
      setTotal(null);
    } else {
      setSavedTotal(null);
    }
  }, [openSaved]);

  const handleImageClick = (imageData) => {
    if (!isUserLogin) {
      setIsUserLogin((prev) => !prev);
    }

    setSelectedImage(imageData);
    const url = `${window.location.pathname}?imageId=${imageData?._id}`;
    window.history.pushState({}, "", url);
  };

  const closePreview = () => {
    setSelectedImage(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  const updateGalleryImage = (updatedImage) => {
    setGalleryImages((prevImages) =>
      prevImages.map((img) =>
        img._id === updatedImage._id
          ? { ...img, isSaved: updatedImage.isSaved }
          : img
      )
    );

    setSavedGalleryImages((prevImages) =>
      prevImages.map((img) =>
        img._id === updatedImage._id
          ? { ...img, isSaved: updatedImage.isSaved }
          : img
      )
    );

    if (selectedImage && selectedImage._id === updatedImage._id) {
      setSelectedImage((prev) => ({
        ...prev,
        isSaved: updatedImage.isSaved,
      }));
    }
  };

  const handleSaveImage = async (image) => {
    if (!authUser) {
      setShowModel(true);
      return;
    }
    if (isSaving) return;
    setIsSaving(true);

    const newSavedState = !image.isSaved;
    try {
      const res = await saveGalleryImage(image._id);
      if (res.success) {
        if (openSaved) {
          // await fetchAllSavedGallery();
        }
        updateGalleryImage({ ...image, isSaved: newSavedState });
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  useGSAP(() => {
    let mainTimer;
    let timeoutId;
    let timeoutId1;
    let wrapperTimer;
    if (openSaved || hasMounted.current) return;
    const wrapper = mainPageRef.current;
    if (wrapper) {
      wrapper.style.height = "100vh";
      wrapper.style.overflow = "hidden";

      wrapperTimer = setTimeout(() => {
        wrapper.style.height = "auto";
      }, 2000);
    }

    galleryRef.current.style.visibility = "hidden";
    mainContentRef.current.style.overflow = "visible";
    galleryRef.current.style.overflow = "visible";

    timeoutId = setTimeout(() => {
      mainContentRef.current.style.overflowX = "hidden";
      galleryRef.current.style.overflowY = "scroll";
    }, 7500);

    timeoutId1 = setTimeout(() => {
      galleryRef.current.style.visibility = "visible";
    }, 5000);

    mainTimer = setTimeout(() => {
      if (!galleryRef.current) return;
      const items = galleryRef.current.querySelectorAll(
        `.${styles.masonryItem}`
      );
      const container = galleryRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = {
        x: containerRect.left + containerRect.width / 2,
        y: containerRect.top + containerRect.height / 2,
      };

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const quadrantX = itemCenter.x < containerCenter.x ? -1 : 1;
        const quadrantY = itemCenter.y < containerCenter.y ? -1 : 1;

        gsap.set(item, {
          opacity: 0,
          delay: 2,
          x: quadrantX * 500,
          y: quadrantY * 500,
          scale: 0.7,
        });
      });

      gsap.to(items, {
        delay: 3.1,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "none",
        stagger: {
          amount: 0.7,
          from: "center",
        },
      });

      window.scrollTo(0, 0);
      return () => {};
    }, 1500);

    return () => {
      clearTimeout(wrapperTimer);
      clearTimeout(mainTimer);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId1);
    };
  }, []);

  useEffect(() => {
    if (openSaved) return;

    const innerWidth = window.innerWidth;
    fetchGalleryData(pageNo, innerWidth < 590 ? 6 : 12);
    setSavedPageNo(1);
    setSavedGalleryImages([]);
  }, [openSaved, pageNo, authUser?.id]);

  useEffect(() => {
    if (openSaved) {
      const innerWidth = window.innerWidth;
      fetchAllSavedGallery(savedPageNo, innerWidth < 590 ? 6 : 12);
      setPageNo(1);
      setGalleryImages([]);
    }
  }, [openSaved, savedPageNo]);

  useEffect(() => {
    if (loading) return;

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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, savedHasMore]);

  useEffect(() => {
    if (!firstRun.current) return;
    if (!galleryImages || galleryImages.length === 0) return;

    firstRun.current = false;

    const queryParams = new URLSearchParams(window.location.search);
    const imageId = queryParams.get("imageId");

    if (!imageId) return;

    const findImage = galleryImages.find((image) => image?._id === imageId);

    if (findImage) {
      setTimeout(() => {
        setSelectedImage(findImage);
      }, 6000);
    }
  }, [galleryImages]);

  return (
    <div className={styles.pageContainer} ref={mainPageRef}>
      <AnimationOverlay />
      <GalleryNavbar
        openSaved={openSaved}
        setOpenSaved={setOpenSaved}
        noOfItems={
          openSaved ? savedTotal : total
        }
      />
      <div className={styles.mainContent} ref={mainContentRef}>
        <div className={styles.masonryContainer} ref={galleryRef}>
          {openSaved
            ? savedGalleryImages?.map((d, i) => (
                <ImageCard
                  key={i}
                  src={setAwsImageURL(d?.imageKey)}
                  alt={d._id}
                  description={d.description}
                  isSaved={d?.isSaved}
                  id={d._id}
                  data={d}
                  setIsUserLogin={setIsUserLogin}
                  onClick={() => handleImageClick(d)}
                  onSave={() => handleSaveImage(d)}
                  authUser={authUser}
                />
              ))
            : galleryImages?.map((d, i) => (
                <ImageCard
                  key={i}
                  src={setAwsImageURL(d?.imageKey)}
                  alt={d._id}
                  description={d.description}
                  isSaved={d?.isSaved}
                  id={d._id}
                  data={d}
                  setIsUserLogin={setIsUserLogin}
                  onClick={() => handleImageClick(d)}
                  onSave={() => handleSaveImage(d)}
                  authUser={authUser}
                />
              ))}
        </div>
      </div>
      {(savedHasMore || hasMore) && !error && (
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

      {isUserLogin && selectedImage && (
        <FullScreenPreview
          image={selectedImage}
          onClose={closePreview}
          setIsUserLogin={setIsUserLogin}
          onSave={() => handleSaveImage(selectedImage)}
        />
      )}
    </div>
  );
};

export default GalleryContainer;
