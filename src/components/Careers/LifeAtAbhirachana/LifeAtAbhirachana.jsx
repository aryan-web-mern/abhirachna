import React, { useRef } from "react";
import LifePageStyle from "./lifepage.module.css";
import BelieveCard from "./BelieveCard";
import PhotoSlider from "./PhotoSlider";
import {
  image1,
  image2,
  image3,
} from "../../../assets/sliderDummyImages/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function LifeAtAbhirachana() {
  const mainHeadref = useRef();

  // Initial animations for the main heading
  useGSAP(() => {
    gsap.from([mainHeadref.current], {
      y: "500px",
      delay: 0.5,
      duration: 1,
      ease: "none",
    });
  });
  return (
    <div className={LifePageStyle.parentContainer}>
      <div ref={mainHeadref} className={LifePageStyle.container}>
        <div className={LifePageStyle.mainContainer}>
          <h3>Life at Abhirachnaa</h3>
          <p className={LifePageStyle.subHeading}>
            At Abhirachnaa, we believe a great team builds great design. Here,
            creativity meets collaboration, and bold ideas meet meaningful
            impact.
          </p>

          <div className={LifePageStyle.sliderContainer}>
            <PhotoSlider photos={[image1, image2, image3]} />
          </div>
        </div>
        <BelieveCard />
      </div>
    </div>
  );
}

export default LifeAtAbhirachana;
