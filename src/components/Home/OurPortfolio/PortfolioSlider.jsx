import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Style from "./portfolioslider.module.css";
import scrollImage from "../../../assets/gallery/scrollImage.jpg";

gsap.registerPlugin(ScrollToPlugin);

function PortfolioSlider({ direction, scrollNumber, style }) {
  const directionRef = useRef();
  const imgsRef = useRef([]);
  const isAnimating = useRef(false);
  const [contentReady, setContentReady] = useState(false);

  const addToRefs = (el) => {
    if (el && !imgsRef.current.includes(el)) {
      imgsRef.current.push(el);
    }
  };

  // const { contextSafe } = useGSAP(

  //   () => {
  //     if (!contentReady || !directionRef.current) return;

  //     const element = directionRef.current;
  //     const maxScroll = element.scrollWidth - element.clientWidth;

  //     if (maxScroll <= 0) {
  //       setTimeout(() => setContentReady(false), 100);
  //       setTimeout(() => setContentReady(true), 500);
  //       return;
  //     }

  //     if (direction === "left") {
  //       gsap.set(element, { scrollLeft: 0 });
  //       gsap.to(element, {
  //         scrollTo: { x: maxScroll },
  //         duration: 35,
  //         ease: "none",
  //         repeat: -1,
  //       });
  //     }

  //     if (direction === "right") {
  //       gsap.set(element, { scrollLeft: maxScroll });
  //       gsap.to(element, {
  //         scrollTo: { x: 0 },
  //         duration: 35,
  //         ease: "none",
  //         repeat: -1,
  //       });
  //     }
  //   },
  //   { scope: directionRef, dependencies: [contentReady, direction] }
  // );

  // useEffect(() => {
  //   if (!directionRef.current) return;

  //   const checkContent = () => {
  //     const element = directionRef.current;
  //     if (element && element.scrollWidth > element.clientWidth) {
  //       setContentReady(true);
  //       return true;
  //     }
  //     return false;
  //   };

  //   setTimeout(checkContent, 100);

  //   const retryInterval = setInterval(() => {
  //     if (checkContent()) {
  //       clearInterval(retryInterval);
  //     }
  //   }, 200);

  //   const observer = new ResizeObserver(() => {
  //     setTimeout(() => {
  //       if (checkContent()) {
  //         setContentReady(false);
  //         setTimeout(() => setContentReady(true), 50);
  //       }
  //     }, 100);
  //   });

  //   observer.observe(directionRef.current);

  //   return () => {
  //     clearInterval(retryInterval);
  //     observer.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   const temp = setTimeout(() => {
  //     setContentReady(true);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(temp);
  //   };
  // }, []);

  // useGSAP(() => {
  //   if (!contentReady) return;
  //   const screenWidth = window.innerWidth;
  //   function slideLeft() {
  //     const imgs = imgsRef.current;

  //     if (isAnimating.current) return;
  //     isAnimating.current = true;

  //     const firstItem = imgs[0];

  //     imgs.forEach((item, index) => {
  //       gsap.to(item, {
  //         x: screenWidth <= 590 ? "-=210" : "-=420",
  //         ease: "none",
  //         duration: "4",
  //       });
  //     });

  //     gsap.to(firstItem, {
  //       x:
  //         screenWidth <= 1023
  //           ? screenWidth <= 590
  //             ? "+=2730"
  //             : "+=5330"
  //           : "+=5460",
  //       duration: "0.001",
  //       delay: "4",
  //       onComplete: () => {
  //         imgs.push(imgs.shift());
  //         isAnimating.current = false;
  //       },
  //     });
  //   }

  //   function slideRight() {
  //     const imgs = imgsRef.current;

  //     if (isAnimating.current) return;
  //     isAnimating.current = true;

  //     const lastItem = imgs[imgs.length - 1];

  //     gsap.set(lastItem, {
  //       x:
  //         screenWidth <= 1023
  //           ? screenWidth <= 590
  //             ? "-=2730"
  //             : "-=5330"
  //           : "-=5460",
  //     });

  //     imgs.forEach((item) => {
  //       gsap.to(item, {
  //         x:
  //           screenWidth <= 1023
  //             ? screenWidth <= 590
  //               ? "+=210"
  //               : "+=410"
  //             : "+=420",
  //         ease: "none",
  //         duration: "4",
  //       });
  //     });

  //     gsap.to(
  //       {},
  //       {
  //         duration: "4",
  //         onComplete: () => {
  //           imgs.unshift(imgs.pop());
  //           isAnimating.current = false;
  //         },
  //       }
  //     );
  //   }

  //   let interval;

  //   if (direction === "left") {
  //     interval = setInterval(slideLeft, 1);
  //   }

  //   if (direction === "right") {
  //     interval = setInterval(slideRight, 1);
  //     // slideRight()
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [contentReady]);

  useGSAP(() => {
    const images = imgsRef.current;
    if (images.length === 0) return;
    const screenWidth = window.innerWidth;

    const slideRight = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const lastImage = images[images.length - 1];
      gsap.set(lastImage, {
        x:
          screenWidth <= 1023
            ? screenWidth <= 590
              ? "-=5950"
              : "-=12600"
            : "-=14616",
      });
      images.forEach((item) => {
        gsap.to(item, {
          x:
            screenWidth <= 1023
              ? screenWidth <= 590
                ? "+=2980"
                : "+=6300"
              : "+=7300",
          ease: "none",
          duration: "50",
        });
      });
      gsap.to(
        {},
        {
          duration: "50",
          onComplete: () => {
            images.unshift(images.pop());
            isAnimating.current = false;
          },
        }
      );
    };

    const slideLeft = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const firstImage = images[0];

      images.forEach((image, index) => {
        gsap.to(image, {
          x:
            screenWidth <= 1023
              ? screenWidth <= 590
                ? "-=2980"
                : "-=6300"
              : "-=7300",
          duration: 50,
          ease: "none",
        });
      });

      gsap.to(firstImage, {
        x: "+=14616",
        x:
          screenWidth <= 1023
            ? screenWidth <= 590
              ? "+=5950"
              : "+=12600"
            : "+=14616",
        duration: "none",
        delay: 50,
        onComplete: () => {
          images.push(images.shift());
          isAnimating.current = false;
        },
      });
    };

    let interval;

    if (direction === "left") {
      interval = setInterval(slideLeft, 1);
    }

    if (direction === "right") {
      interval = setInterval(slideRight, 1);
      // slideRight()
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={directionRef} className={Style.imgContainer} style={{ ...style }}>
      {/* <OverlayScroll
        scrollNumber={scrollNumber}
        styles={{ borderRadius: "1.5625rem", marginBottom: "-1.125rem" }}
        className={Style.images}
        refArray={imgsRef}
      /> */}
      <img src={scrollImage} ref={addToRefs} className={Style.image} />
      <img src={scrollImage} ref={addToRefs} className={Style.image} />
    </div>
  );
}
export default PortfolioSlider;
