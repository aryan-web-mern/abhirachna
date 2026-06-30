import React from "react";
import home from "../../../assets/homeSvgs/home.svg"; // Assuming you have a home icon in your assets
import arrow from "../../../assets/homeSvgs/arrow.svg"; // Assuming you have a home icon in your assets
import box from "../../../assets/homeSvgs/box.svg"; // Assuming you have a home icon in your assets
import box2 from "../../../assets/homeSvgs/box2.svg"; // Assuming you have a home icon in your assets add
import Button from "../../ui/Button/Button";
import styles from "./dreamHome.module.css";
import { useNavigate } from "react-router-dom";
import gridImage from "../../../assets/Subtract.svg";

export default function DreamHome() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainWrapper}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.contentLeft}>
            <h3 className={styles.mainHeading}>
              Own Your Dream Luxury Apartment,{" "}
              <span className={styles.mobileBreak}>
                <br />
              </span>
              Save <span className={styles.highlightText}>15%</span> Today
            </h3>

            <p className={`${styles.descText} paragraph-medium`}>
              Get an instant pricing estimate tailored to your future luxury
              space — whether it’s a smart studio, a high-rise flat, a grand
              penthouse, or a spacious multi-BHK.
            </p>
          </div>

          <div className={styles.contentRight}>
            {/* <div className={styles.homeImg}> */}
            <img className={styles.house} src={home} alt="no img" />
            {/* </div> */}
          </div>
        </section>

        {/* Services Section */}
        <div className={styles.bottom}>
          <section className={styles.servicesSection}>
            <img className={styles.boxIcon} src={box} alt="no img" />
            <img className={styles.boxIcon2} src={box2} alt="no img" />
            <img
              className={styles.boxIcon1}
              style={{ display: "none" }}
              src={gridImage}
              alt="no img"
            />
            <div className={styles.servicesGrid}>
              <h3 className={styles.serviceTitle}>
                Complete Interior{" "}
                <span className={styles.solutionText}>Solutions</span>
              </h3>
              <div className={styles.line}></div>
              <p className={`${styles.serviceDesc} paragraph-medium`}>
                Join 200+ proud homeowners who chose Abhirachnaa for timeless
                design, faster delivery, and unmatched elegance
              </p>
            </div>
          </section>

          <section className={styles.getEstimate}>
            <div className={styles.ctaSection}>
              <Button
                className={`${styles.estimateBtn} btn-gradient-cta"`}
                onClick={() => navigate("/get-estimate")}
              >
                <div className={styles.get}>Get Estimate</div>
                <img className={styles.arrowIcon} src={arrow} alt="no img" />
              </Button>
            </div>

            <div className={styles.statsSection}>
              <h3 className={styles.statNumber}>200+</h3>
              <h5 className={styles.statLabel}>
                <span className={styles.hideOnMobile}>Happy </span>Homes
              </h5>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
