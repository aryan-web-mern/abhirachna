import styles from "./UserGallery.module.css";
import Back from "../../../assets/Frame.svg";
import { useNavigate } from "react-router-dom";
import CircleButton from "../../ui/CircleButton/CircleButton";
import ImageCard from "../../Gallery/ImageCard";
import FullScreenPreview from "../../Gallery/FullScreenPreview";
import { useEffect, useRef, useState } from "react";
import {
  getAllSavedGallery,
  saveGalleryImage,
} from "../../../services/galleryService";
import { setAwsImageURL } from "../../../utils/functions";
import { getErrorMessage } from "../../../utils/errorHandler";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import { useAuth } from "../../../AuthProvider/AuthContext";

const UserGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSaved, setOpenSaved] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const { authUser } = useAuth();

  const navigate = useNavigate();
  const mainContentRef = useRef();
  const galleryRef = useRef();
  const hasMounted = useRef(false);

  async function fetchAllSavedGallery() {
    // hasMounted.current = true;
    setLoading(true);
    try {
      const response = await getAllSavedGallery();
      if (response.success) {
        setGalleryImages(response?.data?.galleries);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
  // Saving Image
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
          await fetchAllSavedGallery();
        }
        updateGalleryImage({ ...image, isSaved: newSavedState });
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateGalleryImage = (updatedImage) => {
    setGalleryImages((prevImages) =>
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

  // When Image is Clicked
  const handleImageClick = (imageData) => {
    setSelectedImage(imageData);
    const url = `${window.location.pathname}?imageId=${imageData?._id}`;
    window.history.pushState({}, "", url);
  };

  // Closing image preview
  const closePreview = () => {
    setSelectedImage(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  useEffect(() => {
    if (hasMounted.current || authUser) {
      fetchAllSavedGallery();
    }
    hasMounted.current = true;
  }, [authUser]);

  return (
    <div className={styles.mainContainer}>
      {/* Navbar */}

      <ProfileNavbar
        name={"Gallery"}
        handleClick={() => {
          navigate("/profile");
        }}
      />

      {/* Main Profile */}

      {!loading && galleryImages && galleryImages.length <= 0 ? (
        <p className={styles.noBlogsContainer}>There are no Saved Images</p>
      ) : (
        <div className={styles.mainContent} ref={mainContentRef}>
          <div className={styles.masonryContainer} ref={galleryRef}>
            {galleryImages?.map((d, i) => (
              <ImageCard
                key={i}
                src={setAwsImageURL(d?.imageKey)}
                alt={d._id}
                description={d.description}
                isSaved={d?.isSaved}
                id={d._id}
                data={d}
                onClick={() => handleImageClick(d)}
                onSave={() => handleSaveImage(d)}
                authUser={authUser}
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <FullScreenPreview
          image={selectedImage}
          onClose={closePreview}
          onSave={() => handleSaveImage(selectedImage)}
        />
      )}
    </div>
  );
};

export default UserGallery;
