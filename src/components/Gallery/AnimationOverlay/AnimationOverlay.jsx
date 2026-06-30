import { useEffect, useRef } from "react";
import "./Animation.css";
import gsap from "gsap";
import img from "../../../assets/gallery/Image1.jpg";

const AnimationOverlay = () => {
  const animationRef = useRef(null); // Sliding animation container
  const rightRef1 = useRef(null); // Left side Sliding animation
  const leftRef1 = useRef(null); // Right side Sliding animation
  const rightRef2 = useRef(null); // Left side Sliding animation
  const leftRef2 = useRef(null); // Right side Sliding animation
  const gradientRef = useRef(null); // White Gradient Ref

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 4000);
    gsap.to(gradientRef.current, {
      delay: 3.5,
      opacity: 0,
      ease: "none",
    });

    gsap.to([rightRef1.current, rightRef2.current], {
      delay: 0.5,
      x: "400px",
      duration: 2,
      ease: "none",
      onComplete: () => {
        gsap.to([rightRef1.current, rightRef2.current], {
          x: "50vw",
          delay: 0.4,
          duration: 0.5,
          opacity: 0,
        });
      },
    });

    gsap.to([leftRef2.current, leftRef1.current], {
      delay: 0.5,
      x: "-400px",
      duration: 2,
      ease: "none",

      onComplete: () => {
        gsap.to([leftRef2.current, leftRef1.current], {
          x: "-50vw",
          delay: 0.4,
          duration: 0.5,
          opacity: 0,
        });
      },
    });

    gsap.to(animationRef.current, {
      delay: 3.5,
      opacity: 0,
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* White Radial Gradient Overlay  */}
      <div className="full-screen-gradient-overlay" ref={gradientRef}></div>

      {/* Sliding Animation */}
      <div className="animation-overlay" ref={animationRef}>
        <section className="move-right" ref={rightRef1}>
          <img className="scroll-images" src={img} />
        </section>
        <section className="move-left" ref={leftRef1}>
          <img className="scroll-images" src={img} />
        </section>
        <section className="move-right" ref={rightRef2}>
          <img className="scroll-images" src={img} />
        </section>
        <section className="move-left" ref={leftRef2}>
          <img className="scroll-images" src={img} />
        </section>
      </div>
    </>
  );
};

export default AnimationOverlay;
