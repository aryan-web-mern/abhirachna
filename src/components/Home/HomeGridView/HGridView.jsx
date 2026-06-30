import React from "react";
// import HereItFromCard from './HGridView';
import video1 from "../../../assets/videos/video1.mp4";
import video2 from "../../../assets/videos/video2.mp4";
import video3 from "../../../assets/videos/video3.mp4";
import video4 from "../../../assets/videos/video4.mp4";
import Button from "../../ui/Button/Button";
import styles from "./HGridview.module.css";
import { HomeGridData } from "../../../utils/constantData";
import { useNavigate } from "react-router-dom";
import HereItFromCard from "./HGridViewCard";

const videoMap = {
  "video1.mp4": video1,
  "video4.mp4": video4,
  "video3.mp4": video3,
  "video2.mp4": video2,
};

export default function HgridView() {
  const navigate = useNavigate();

  // function BtnHandler() {
  //   navigate('/job-list')
  // }

  const firstGridItems = HomeGridData.filter(
    (item) => item.id >= 1 && item.id <= 6
  );
  const secondGridItems = HomeGridData.filter(
    (item) => item.id >= 7 && item.id <= 8
  );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.careersOuter}>
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

        <div className={styles.careersContent}>
          <div className={styles.careersInfoContainer}>
            <h3>How Our Clients Feel</h3>
            <p className="paragraph-medium">
              From the first consultation to the final reveal, our clients
              experience more than just a service — they feel heard, valued, and
              inspired. Their kind words reflect the care, creativity, and
              commitment we bring to every home. Here’s what they have to say
              about their journey with Abhirachnaa.
            </p>
          </div>
          <Button
            className={styles.careersBtn1}
            onClick={() => {
              navigate("/testmonials");
            }}
          >
            <label className="label-medium">View All</label>
          </Button>
        </div>
      </div>
    </div>
  );
}
