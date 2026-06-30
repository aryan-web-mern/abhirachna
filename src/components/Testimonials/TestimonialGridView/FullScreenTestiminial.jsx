// FullScreenTestimonial.jsx
import React, { useEffect } from "react";
import styles from "./testimonials.module.css";

export default function FullScreenTestimonial({ testimonial, onClose }) {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => document.body.style.overflow = "scroll";
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!testimonial) return null;

  const contentType = testimonial.video
    ? "video"
    : testimonial.image
    ? "image"
    : "quote";

  return (
    <div className={styles.fullScreenOverlay} onClick={onClose}>
      <div
        className={styles.fullScreenContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {contentType === "video" && (
          <video
            className={styles.fullScreenMedia}
            autoPlay
            controls
            muted={false}
          >
            <source src={testimonial.src} type="video/mp4" />
            Your browser does not support videos.
          </video>
        )}

        {contentType === "image" && (
          <img
            src={testimonial.src}
            alt={testimonial.fullName}
            className={styles.fullScreenMedia}
          />
        )}

        {contentType === "quote" && (
          <div className={styles.quoteContainer}>
            <p className={styles.fullScreenQuote}>“{testimonial.text}”</p>
            <h5 className={styles.fullScreenAuthor}>{testimonial.fullName}</h5>
          </div>
        )}
      </div>
    </div>
  );
}
