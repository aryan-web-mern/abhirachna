import React, { useState, useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import Button from "../../ui/Button/Button";
import HomeVideo from "../../../assets/homeSvgs/HomePage.mp4";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Landing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [currentitem, setCurrentItem] = useState(0);
  const isAnimating = useRef(false);
  const itemsRef = useRef([]);
  const videoRef = useRef(null);
  const timeLinesRef = useRef(["5.00", "10.00", "15.00", "19.00"]);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const handleAnimation = () => {
    const items = itemsRef.current;
    if (isAnimating.current) return;
    isAnimating.current = true;

    const firstItem = items[0];
    items.forEach((item, index) => {
      gsap.to(item, {
        y: window.screen.width <= 1023 ? "-=54" : "-=60",
        ease: "none",
      });
    });

    gsap.to(firstItem, {
      y: window.screen.width <= 1023 ? "+=216" : "+=240",
      duration: "none",
      delay: 1,
      onComplete: () => {
        items.push(items.shift());
        isAnimating.current = false;
      },
    });
  };

  useGSAP(() => {
    gsap.to(overlayRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      delay: 1,
      duration: 1,
      ease: "none",
    });

    gsap.from(containerRef.current, {
      y: 1000,
      duration: 2,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        timeLinesRef.current.includes(
          Math.floor(videoRef.current.currentTime).toFixed(2)
        )
      ) {
        setCurrentItem((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIndex(index === 3 ? 0 : index + 1);
    if (currentitem) {
      setIsActive(index);
      handleAnimation();
    }
  }, [currentitem]);

  return (
    <div className={styles.heroContainer} ref={overlayRef}>
      <video
        className={styles.videoBackground}
        autoPlay
        muted
        loop
        playsInline
        ref={videoRef}
      >
        <source src={HomeVideo} type="video/mp4" />
      </video>

      <div className={styles.overlay}>
        {/* box content */}
        <div className={styles.contentBox} ref={containerRef}>
          <div className={styles.headerBox}>
            <h2>Innovate You,</h2>
            <div className={styles.headerText}>
              <h1>Innovate Your</h1>
              <div className={styles.itemsContainer}>
                <h1 ref={addToRefs}>Living Room</h1>
                <h1 ref={addToRefs}>Kitchen</h1>
                <h1 ref={addToRefs}>Bedroom</h1>
                <h1 ref={addToRefs}>Bathroom</h1>
              </div>
            </div>
          </div>

          <p className="paragraph-medium">
            Transform your space with timeless interiors crafted to reflect who
            you are.
          </p>

          <div className={styles.buttonContainer}>
            <Button
              children={"Get Estimate"}
              className="btn-gradient-cta"
              onClick={() => navigate("/get-estimate")}
            />
          </div>
          <div className={styles.buttonsContainer}>
            {[0, 1, 2, 3].map((value, index) => (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key={value}
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5.4"
                  fill={isActive === index ? "none" : "#E74C21"}
                  stroke="#E74C21"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* radio buttons svgs */}
      </div>
    </div>
  );
}
