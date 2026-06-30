import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./OurProcess.module.css";
import { homeProcessImages, ourProcessData } from "../../../utils/constantData";
import orangeDot from "../../../assets/ourProcess/Dot2.svg";
import ringsDot from "../../../assets/ourProcess/Dot5.svg";
import whiteDot from "../../../assets/ourProcess/Dot4.svg";

import gsap from "gsap";

const OurProcess = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStep, setScrollStep] = useState(145);
  const [isMobileView, setIsMobileView] = useState(false);
  const [dotClasses, setDotClasses] = useState({
    dot0: "dot0",
    dot1: "dot1",
    dot2: "dot2",
    dot3: "dot3",
    dot4: "dot4",
  });
  console.log(centerIndex);

  const lastScrollTime = useRef(0);
  const processContainerRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const textRefs = useRef([]);
  const dot0Ref = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const dot4Ref = useRef(null);

  textRefs.current = ourProcessData.map(
    (_, i) => textRefs.current[i] ?? React.createRef()
  );

  // Check viewport on mount and resize
  useEffect(() => {
    if (window.innerWidth > 1070) {
      setScrollStep(262);
    } else if (window.innerWidth <= 1070 && window.innerWidth > 590) {
      setScrollStep(220);
    }
    const checkViewport = () => {
      setIsMobileView(window.innerWidth <= 1070);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // When scrolling down
  const rotateDotsUp = () => {
    const current = { ...dotClasses };

    setDotClasses({
      dot0: current.dot1,
      dot1: current.dot2,
      dot2: current.dot3,
      dot3: current.dot4,
      dot4: current.dot0,
    });
  };

  // When scrolling up
  const rotateDotsDown = () => {
    const current = { ...dotClasses };
    setDotClasses({
      dot0: current.dot4,
      dot1: current.dot0,
      dot2: current.dot1,
      dot3: current.dot2,
      dot4: current.dot3,
    });
  };

  // Scroll to center the current index
  const scrollToCenter = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetScroll = centerIndex * scrollStep;

    container.scrollTo({
      left: isMobileView ? targetScroll : 0,
      top: isMobileView ? 0 : targetScroll,
      behavior: "smooth",
    });
  }, [centerIndex, scrollStep, isMobileView]);

  // Scroll handler for mobile/tab
  const handleScroll = useCallback(() => {
    if (!isMobileView || !containerRef.current || isScrolling) return;

    // Debounce scroll events
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const container = containerRef.current;
      const currentScroll = container.scrollLeft;
      const targetIndex = Math.round(currentScroll / scrollStep);

      const newIndex = Math.max(
        0,
        Math.min(targetIndex, homeProcessImages.length - 1)
      );

      if (newIndex !== centerIndex) {
        setIsScrolling(true);
        lastScrollTime.current = Date.now();

        const direction = newIndex > centerIndex ? "right" : "left";
        direction === "left" ? rotateDotsUp() : rotateDotsDown();

        setCenterIndex(newIndex);

        gsap.to(container, {
          scrollTo: { x: newIndex * scrollStep, autoKill: false },
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            setIsScrolling(false);
          },
        });
      }
    }, 100);
  }, [centerIndex, isScrolling, isMobileView, scrollStep]);

  // Scroll handler for desktop
  const handleWheel = useCallback(
    (e) => {
      if (isMobileView) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 700) return;
      lastScrollTime.current = now;

      if (isScrolling) return;
      setIsScrolling(true);

      const direction = e.deltaY > 0 ? "down" : "up";
      const newIndex = Math.max(
        0,
        Math.min(
          direction === "down" ? centerIndex + 1 : centerIndex - 1,
          homeProcessImages.length - 1
        )
      );

      if (newIndex !== centerIndex) {
        direction === "up" ? rotateDotsUp() : rotateDotsDown();
        setCenterIndex(newIndex);
      }

      let scrollTimeout = setTimeout(() => {
        if (scrollTimeout > 0) clearTimeout(scrollTimeout);
        setIsScrolling(false);
      }, 700);
    },
    [centerIndex, isScrolling, lastScrollTime, isMobileView]
  );

  useEffect(() => {
    const container = containerRef.current;
    const processContainer = processContainerRef.current;
    if (!container || !processContainer) return;

    if (isMobileView) {
      container.addEventListener("scroll", handleScroll);
      processContainer.removeEventListener("wheel", handleWheel);
    } else {
      container.removeEventListener("scroll", handleScroll);
      processContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    scrollToCenter();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      processContainer.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout.current);
    };
  }, [handleWheel, handleScroll, scrollToCenter, isMobileView]);

  useEffect(() => {
    if (isMobileView) {
      setCenterIndex(0);
    }
  }, [isMobileView]);

  useEffect(() => {
    if (textRefs.current[centerIndex]?.current) {
      gsap.fromTo(
        textRefs.current[centerIndex].current,
        {
          opacity: 0,
          duration: 2,
        },
        {
          opacity: 1,
          duration: 2,
        }
      );
    }
  }, [centerIndex]);

  return (
    <div className={Styles.processMainContainer}>
      <div className={Styles.processContainer} ref={processContainerRef}>
        <div className={Styles.imageContainer}>
          <div className={Styles.imageTrack} ref={containerRef}>
            {homeProcessImages.map((img, index) => (
              <div
                key={img.id}
                data-index={index}
                className={` ${Styles.scrollImage}  ${
                  index === centerIndex ? Styles.active : ""
                }`}
              >
                <img src={img.src} alt="process-img" />
              </div>
            ))}
          </div>
        </div>
        <div className={Styles.pathContainer}>
          {/* Curve path */}
          <svg
            className={Styles.path}
            width="314"
            height="810"
            viewBox="0 0 314 780"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M232.971 2395C232.971 2395 -56.6028 1789.5 12.72 1627.85C82.0428 1466.21 312 1544.94 312 1359.59C312 1174.25 -0.359274 1249.07 12.72 1091.34C25.7993 933.603 272.5 850.5 273.5 803C274.5 755.5 47.1156 666.956 47.1156 605.978C47.1156 545 238 494 238 408C238 322 81.8719 155.155 56.5 1"
              stroke="url(#paint0_linear_1895_7951)"
              strokeWidth="4"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1895_7951"
                x1="157"
                y1="-539"
                x2="157"
                y2="2395"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.323243" stopColor="#E74C21" />
                <stop offset="0.326657" stopColor="#FCE6D8" />
              </linearGradient>
            </defs>
          </svg>
          {/* Dot 0 */}
          <div className={`${Styles[dotClasses.dot0]} ${Styles.dotContainer}`}>
            <img src={orangeDot} className={Styles.smallDot} />
            <img src={ringsDot} className={Styles.ringsDot} />
          </div>
          {/* Dot 1 */}
          <div
            className={`${Styles[dotClasses.dot1]} ${Styles.dotContainer}`}
            style={centerIndex === 0 && !isMobileView ? { opacity: 0 } : {}}
          >
            <img src={orangeDot} className={Styles.smallDot} />
            <img src={ringsDot} className={Styles.ringsDot} />
          </div>
          {/* Dot 2 */}
          <div className={`${Styles[dotClasses.dot2]} ${Styles.dotContainer}`}>
            <img src={orangeDot} className={Styles.smallDot} />
            <img src={ringsDot} className={Styles.ringsDot} />
          </div>
          {/* Dot 3 */}
          <div className={`${Styles[dotClasses.dot3]} ${Styles.dotContainer}`}>
            <img src={orangeDot} className={Styles.smallDot} />
            <img src={ringsDot} className={Styles.ringsDot} />
          </div>
          {/* Dot 4 */}
          <div
            className={`${Styles[dotClasses.dot4]} ${Styles.dotContainer}`}
            style={centerIndex === 6 && !isMobileView ? { opacity: 0 } : {}}
          >
            <img src={orangeDot} className={Styles.smallDot} />
            <img src={ringsDot} className={Styles.ringsDot} />
          </div>
        </div>

        <div className={Styles.textSection}>
          <h1 className={Styles.processHeading}>Our Process</h1>

          {ourProcessData.map((data, index) => {
            // Split heading so part in parentheses goes to the next line
            const formattedHeading = data.heading.replace(
              /\s*(\([^)]*\))/,
              "\n$1"
            );

            return (
              <div
                ref={textRefs.current[index]}
                key={data.id}
                className={`${Styles.textContainer} ${
                  index === centerIndex ? Styles.visible : ""
                }`}
                data-index={index}
              >
                <h3>
                  {formattedHeading.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </h3>
                <p className="paragraph-large">{data.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
