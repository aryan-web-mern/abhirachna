import React, { useEffect, useRef, useState } from "react";
// import "./AboutHome.css"; // Assuming you have a CSS file for styling
import gsap from "gsap";
import Styles from "./AboutHome.module.css";
import { useGSAP } from "@gsap/react";
import { aboutDataLeft, aboutDataRight } from "../../../utils/constantData";
import centerImg from "../../../assets/about-img.png";

const AboutHome = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(true);
  const mainHeading = useRef();
  const subHeading = useRef();
  const centerCard = useRef();
  const centerImgRef = useRef();
  const rightCards = useRef();
  const leftCards = useRef();

  // Checking the screen type Mobile OR Laptop
  useEffect(() => {
    if (window.screen.width >= 530) {
      setIsMobileScreen(false);
    } else {
      setIsMobileScreen(true);
    }
  }, []);

  const handleMouseEnter = () => {
    // Increase the width of the center card and image, and reduce opacity of other cards
    if (window.screen.width >= 530) {
      gsap.to(centerCard.current, {
        duration: 0.7,
        width: "1160px",
        ease: "power2.out",
      });
      gsap.to(centerImgRef.current, {
        duration: 0.7,
        width: "1176px",
        height: "775px",
        ease: "power2.out",
      });
      gsap.to([leftCards.current, rightCards.current], {
        duration: 0.7,
        opacity: 0,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset the width of the center card and image, and restore opacity of other cards
    if (window.screen.width >= 530) {
      gsap.to(centerCard.current, {
        duration: 0.7,
        width: "376px",
        ease: "power2.out",
      });
      gsap.to(centerImgRef.current, {
        duration: 0.7,

        width: "831px",
        height: "651px",
        ease: "power2.out",
      });
      gsap.to([leftCards.current, rightCards.current], {
        duration: 0.7,
        opacity: 1,
        ease: "power2.out",
      });
    }
  };

  useGSAP(() => {
    // Initial animations for the main heading, subheading, and cards
    gsap.from(mainHeading.current, {
      y: "200px",
      delay: 0.9,
      duration: 0.8,
      ease: "none",
    });
    // Animate the subheading and cards from below
    gsap.from(
      [
        subHeading.current,
        centerCard.current,
        rightCards.current,
        leftCards.current,
      ],
      {
        y: "900px",
        delay: 0.7,
        duration: 1.1,
        ease: "none",
      }
    );
    // Big screen animations
    if (window.screen.width >= 1024) {
      // Animate the center card and image to their final sizes
      gsap.to(centerCard.current, {
        // delay: 1,
        duration: 1,
        width: "1160px",
        ease: "power2.out",
      });
      gsap.to(centerImgRef.current, {
        delay: 1,
        duration: 1,
        width: "1176px",
        height: "775px",
        ease: "power2.out",
      });
      gsap.to([leftCards.current, rightCards.current], {
        // delay: 1,
        // duration: 1,
        opacity: 0,
        ease: "power2.out",
      });
      gsap.delayedCall(2.5, handleMouseLeave);
    }
  }, []);

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.home}>
        {/* Top Heading and Para */}
        <div className={Styles.topText}>
          <h1 ref={mainHeading}>“Where Design Meets Perfection”</h1>
          <p ref={subHeading} className="paragraph-medium">
            At Abhirachnaa, we believe great design is more than just arranging
            furniture — it’s about shaping how you feel in your space.
          </p>
        </div>

        {/* Animation   Container */}
        <div className={Styles.animationContainer}>
          {/* Left Cards */}
          <div className={Styles.leftCards} ref={leftCards}>
            {aboutDataLeft.map((data, index) => (
              <div key={index} className={Styles.infoCard}>
                <h1 className={Styles.tag}>{data.tag}</h1>

                <div className={Styles.info}>
                  <h1 className={Styles.title}>
                    {data.title[0]}
                    <br />
                    {data.title[1]}
                  </h1>

                  <p className="paragraph-small">{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center card and Image */}
          <div
            className={Styles.centerCard}
            ref={centerCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={centerImg} alt="about-img" ref={centerImgRef} />
          </div>

          {/* Right Cards */}
          <div className={Styles.rightCards} ref={rightCards}>
            {aboutDataRight.map((data, index) => (
              <div key={index} className={Styles.infoCard}>
                <h1 className={Styles.tag}>{data.tag}</h1>

                <div className={Styles.info}>
                  <h1 className={Styles.title}>
                    {data.title[0]}
                    <br />
                    {data.title[1]}
                  </h1>

                  <p className="paragraph-small">{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
