import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import share from "../../assets/icons/Share.svg";
import save from "../../assets/gallery/Save.svg";
import saved from "../../assets/gallery/Saved.svg";
import back from "../../assets/gallery/back1.svg";
import { getMediaUrl } from "../../utils/functions";
import { useToast } from "../../hooks/hooks";
const FullScreenPreview = ({ image, onClose, onSave }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link:", err);
    }
  };

  return (
    <div className={styles.fullScreenPreview} onClick={onClose}>
      <div
        className={styles.previewContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <img src={back} alt="back" />
        </button>
        <img
          src={getMediaUrl(image?.imageKey)}
          alt={image?._id}
          className={styles.fullScreenImage}
          onClick={() => setIsOverlayVisible(!isOverlayVisible)}
        />

        <div className={styles.previewOverlay}>
          <div className={styles.previewOverlayBottom}>
            <div className={styles.previewOverlayLeft}>
              <p className={styles.previewTitle}>{image?.theme}</p>
              <p className={styles.previewDescription}>{image?.imageName}</p>
            </div>
            <div className={styles.previewOverlayRight}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
                className={styles.previewActionButton}
              >
                <img src={image?.isSaved ? saved : save} alt="save" />
              </button>
              <button
                className={styles.previewActionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  copyLink(``);
                }}
              >
                <img src={share} alt="share" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPreview;
