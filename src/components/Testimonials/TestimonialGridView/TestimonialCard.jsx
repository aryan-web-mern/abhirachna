import React, { useEffect, useState } from "react";
import styles from "./testimonials.module.css";
import imageDemo from "../../../assets/about-img.png";


export default function TestimonialCard({
  _id,
  src,
  text,
  fullName,
  video,
  image,
  BoxNumber,
  onFullScreen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const Contentype = video ? "video" : image ? "image" : "quote";
  const bgClasses = [
    "default",
    "bgBlue",
    "default",
    "bgOrange",
    "default",
    "bgRed",
    "default",
    "bgPurple",
    "default",
    "default",
    "bgBlue",
    "bgRed",
    "bgOrange",
    "default",
  ];
  return (
    <div
      className={`${styles.box} ${styles[`box${BoxNumber}`]} ${
        styles[bgClasses[BoxNumber - 1]]
      } ${_id} ${isOpen ? styles.fullWidth : ""}`}
      style={
        video ? { padding: "0px" } :
        image
          ? {
              backgroundImage:  `url("${src}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              justifyContent: "end",
            }
          : {}
      }
      onClick={() => {
        if (video || image) {
          onFullScreen({ _id, src, text, fullName, video, image });
        }
      }}
    >
      {Contentype === "video" && (
        <div className={styles.videoContainer}>
          <video className={styles.videoBg} autoPlay muted loop playsInline>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {Contentype === "quote" && <p className={styles.quote}>“{text}”</p>}
      <h5
        className={`${styles.author} ${
          Contentype === "video" ? styles.authorImg : ""
        }`}
      >
        {fullName}
      </h5>
    </div>
  );
}
