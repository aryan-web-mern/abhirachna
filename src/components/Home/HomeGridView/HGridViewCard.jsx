import React from "react";
import styles from "./HGridview.module.css";

export default function HereItFromCard({
  id,
  type,
  src,
  text,
  author,
  color,
  location,
}) {
  const isQuote = type === "quote";
  const isVideo = type === "video";

  return (
    <div
      className={`${styles.careersBox} ${styles[`careersBox${id}`]} ${
        isQuote ? styles[`bg${color}`] : ""
      }`}
    >
      {isVideo && (
        <>
          <video
            className={styles.careersVideoBg}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.careersAuthorContainer}>
            <h5 className={styles.authorName}>{author}</h5>
          </div>
        </>
      )}

      {isQuote && (
        <>
          <p className={styles.quote}>“{text}”</p>
          <div className={styles.careersAuthor}>
            <h5>{author}</h5>
          </div>
        </>
      )}
    </div>
  );
}
