import React from "react";
import styles from "./landinganimation.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function LandingAnimation() {
  const imageRef = React.useRef(null);
  const textContainerRef = React.useRef(null);
  const containerRef = React.useRef(null);

  useGSAP(() => {
    gsap.set(textContainerRef.current, {
      opacity: 0,
      position: "absolute",
      top: 220,
    });

    gsap.set(imageRef.current, {
      position: "absolute",
      bottom: "30%",
      right: "50%",
      transform: "translateX(50%)",
    });

    gsap.to(imageRef.current, {
      y: 100,
      duration: 1,
      delay: 1,
    });

    gsap.to(textContainerRef.current, {
      y: -20,
      opacity: 1,
      duration: 1,
      delay: 1,
    });

    gsap.to(imageRef.current, {
      delay: 2,
      scale: 120,
      duration: 1.5,
      zIndex: 1000,
      ease: "power3.inOut",
    });

    // gsap.to(textContainerRef.current, {
    //   delay: 2.5,
    //   opacity: 0,
    //   // display: "none",
    // })

    gsap.to(containerRef.current, {
      delay: 2.5,
      duration: 1,
      // opacity:0,
      background: "transparent",
      ease: "none",
    });
  }, []);

  return (
    <div className={styles.landingAnimationContainer} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.textContainer} ref={textContainerRef}>
          <h1>Where Design Meets</h1>
          <h1>Perfection</h1>
        </div>

        <div className={styles.imageContainer}>
          <svg
            width="348"
            height="307"
            viewBox="0 0 348 307"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ref={imageRef}
          >
            <path
              d="M0 252.883H116.101L57.2181 170.443L0 252.883Z"
              fill="#E74C21"
            />
            <path
              d="M231.596 81.1755C195.523 31.8633 175.516 0 175.516 0L62.3081 163.11C85.7875 146.672 102.46 171.455 102.46 171.455L196.129 307C196.129 307 239.781 260.47 227.049 242.768C214.317 225.066 143.08 124.924 143.08 124.924L164.3 91.0379C164.3 91.0379 208.557 134.787 187.338 158.052C187.338 158.052 267.669 130.488 231.596 81.1755Z"
              fill="#E74C21"
            />
            <path
              d="M281.613 158.052C260.091 127.799 190.672 163.615 190.672 163.615C239.477 162.351 245.54 236.446 285.857 252.883L348 251.366L281.613 158.052Z"
              fill="#E74C21"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LandingAnimation;
