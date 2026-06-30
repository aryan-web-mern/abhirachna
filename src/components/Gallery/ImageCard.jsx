import React, { forwardRef, useState } from "react";
import styles from "./Gallery.module.css";
import save from "../../assets/gallery/Save.svg";
import saved from "../../assets/gallery/Saved.svg";

const ImageCard = forwardRef(
  (
    { src, alt, isSaved, data, onClick, onSave , authUser},
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(true);

    return (
      <>
        <div
          ref={ref}
          className={styles.masonryItem}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onClick(data)}
        >
          <div className={styles.imageContainer}>
            <img
              src={src}
              alt={alt}
              onLoad={() => setIsLoaded(true)}
              className={`${styles.galleryImage} ${isLoaded ? styles.loaded : ""
                }`}
            />
            <div
              className={`${styles.imageOverlay} ${isHovered ? styles.visible : ""
                }`}
            >
              <div className={styles.imageOverlayLeft}>
                <p className={styles.imageTitle}> {data?.theme}</p>
                <p className={`${styles.imageDescription} label-small`}>
                  {data?.imageName}
                </p>
              </div>
              <div className={styles.imageOverlayRight}>
                <img
                  src={!authUser ? save : isSaved ? saved : save}
                  alt="like"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave();
                  }}
                />
                {/* <img src={share} alt="share" /> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ImageCard;
