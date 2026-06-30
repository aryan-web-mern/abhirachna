import React from "react";
import HereItFromCard from "./HereItFromCard";
import video1 from "../../../assets/videos/video1.mp4";
import video2 from "../../../assets/videos/video3.mp4";
import video3 from "../../../assets/videos/video2.mp4";

import Button from "../../ui/Button/Button";

import styles from "./hereItFrom.module.css";
import { CareersGridContent } from "../../../utils/constantData";
import { useNavigate } from "react-router-dom";

const videoMap = {
  "video1.mp4": video1,
  "video2.mp4": video2,
  "video3.mp4": video3,
};

export default function HereItFromPage() {
  const navigate = useNavigate();

  function BtnHandler() {
    navigate("/job-list");
  }
  const firstGridItems = CareersGridContent.filter(
    (item) => item.id >= 1 && item.id <= 6
  );
  const secondGridItems = CareersGridContent.filter(
    (item) => item.id >= 7 && item.id <= 8
  );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.careersOuter}>
        <div className={styles.careersContent}>
          <div className={styles.careersInfoContainer}>
            <h3>Hear It From the Inside</h3>
            <p className={`${styles.para} paragraph-medium`}>
              At Abhirachnaa, 200+ talented minds come together to do what they
              love — creating spaces that inspire. But it’s more than just
              design — it’s about growth, balance, and feeling valued.
            </p>
          </div>
          <Button className={styles.careersBtn1} onClick={BtnHandler}>
            Join Our Crew
          </Button>
        </div>

        <div className={styles.careersTestimonialsLayout}>
          <div className={styles.careersTestimonials}>
            {firstGridItems.map((item) => (
              <HereItFromCard
                key={item.id}
                {...item}
                src={item.type === "video" ? videoMap[item.src] : item.src}
              />
            ))}
          </div>

          <div className={styles.careersTestimonials2}>
            {secondGridItems.map((item) => (
              <HereItFromCard
                key={item.id}
                {...item}
                src={item.type === "video" ? videoMap[item.src] : item.src}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
