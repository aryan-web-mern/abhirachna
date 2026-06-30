import React, { useEffect, useRef } from "react";
import styles from "./CareersHome.module.css";
import Button from "../../ui/Button/Button";
import LifeAtAbhirachana from "../LifeAtAbhirachana/LifeAtAbhirachana";
import PerkAndBenefits from "../PerkAndBenefits/PerkAndBenefits";
import Navbar from "../../Navbar/Navbar";
import HereItFromPage from "../GridView/HereItFromPage";
import CarrierForm from "../CarrierForm/CarrierForm";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CareersHome = () => {
  const navigate = useNavigate();
  const mainHeadref = useRef();
  const joinButtonRef = useRef();
  const listElemetRef = useRef([]);
  const isAnimating = useRef(false);

  const addToRefs = (el) => {
    if (el && !listElemetRef.current.includes(el)) {
      listElemetRef.current.push(el);
    }
  };

  // initial animation
  useGSAP(() => {
    // Animate the subheading and cards from below
    gsap.from([joinButtonRef.current], {
      y: "900px",
      delay: 0.5,
      duration: 1,
      ease: "none",
    });
    gsap.from([mainHeadref.current], {
      y: "300px",
      delay: 0.5,
      duration: 1,
      ease: "none",
    });
  });

  const handleAnimation = () => {
    const items = listElemetRef.current;
    if (isAnimating.current) return;
    isAnimating.current = true;

    const firstItem = items[0];
    items.forEach((item, index) => {
      gsap.to(item, {
        y: "-=50",
        ease: "none",
      });
    });

    gsap.to(firstItem, {
      y: "+=250",
      duration: "none",
      delay: 1,
      onComplete: () => {
        items.push(items.shift());
        isAnimating.current = false;
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleAnimation();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function JoinBtnHandle() {
    navigate("/job-list");
  }
  return (
    <>
      <div className={styles.careersContainerHome}>
        <div ref={mainHeadref} className={styles.mainHeadref}>
          <h2>We are looking for</h2>
          <div className={styles.flipContainer}>
            <ul className={styles.flipList}>
              <li ref={addToRefs}>"SEO Optimization"</li>
              <li ref={addToRefs}>"Digital Marketing"</li>
              <li ref={addToRefs}>"Graphic Designer"</li>
              <li ref={addToRefs}>"Sales Manager"</li>
              <li ref={addToRefs}>"Sales Executive"</li>
            </ul>
          </div>
        </div>

        <Button ref={joinButtonRef} variant="primary" onClick={JoinBtnHandle}>
          Join Our Crew
        </Button>
      </div>
    </>
  );
};

export default CareersHome;
