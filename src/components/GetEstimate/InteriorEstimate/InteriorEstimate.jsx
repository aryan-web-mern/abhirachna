import React, { useEffect, useRef, useState } from "react";
import styles from "./InteriorEstimate.module.css";
import Button from "../../ui/Button/Button";
import tickMark from "../../../assets/getEstimate/tickMark.svg";
import { getErrorMessage } from "../../../utils/errorHandler";
import { getestimateBudget } from "../../../services/estimateService";
import { useNavigate, useParams } from "react-router-dom";
import background from "../../../assets/getEstimate/interior-estimate.svg";
import backgroundSmall from "../../../assets/getEstimate/interior-estimate-small.svg";
import backgroundMedium from "../../../assets/getEstimate/interior-estimate-medium.svg";
import amountBg from "../../../assets/getEstimate/amount.svg";
import bathroom from "../../../assets/getEstimate/bathroom.svg";
import bedroom from "../../../assets/getEstimate/bedroom.svg";
import dinning from "../../../assets/getEstimate/dinning.svg";
import kitchen from "../../../assets/getEstimate/kitchen.svg";
import living_room from "../../../assets/getEstimate/living_room.svg";
import img1 from "../../../assets/getEstimate/aniamtion/img1.svg";
import img2 from "../../../assets/getEstimate/aniamtion/img2.svg";
import img3 from "../../../assets/getEstimate/aniamtion/img3.svg";
import img4 from "../../../assets/getEstimate/aniamtion/img4.svg";
import arrow from "../../../assets/profile/arrow.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const InteriorEstimate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showDetails, setShowDetails] = useState(null);

  const [estimateData, setEstimateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imgsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !imgsRef.current.includes(el)) {
      imgsRef.current.push(el);
    }
  };

  function handleShowDetails(index) {
    if (index === showDetails) {
      setShowDetails(null);
      return;
    }
    setShowDetails(index);
  }

  // useGSAP(() => {
  //   // const tl = gsap.timeline();
  //   const timer = setTimeout(() => {
  //     const timeline = gsap.timeline({repeat: -1, yoyo: true, });
  //     const timeline2 = gsap.timeline({repeat: -1, yoyo: true});
  //     const timeline3 = gsap.timeline({repeat: -1, yoyo: true});

  //     timeline.set(imgsRef.current[1], {
  //       scale: 1.7
  //     })

  //     timeline.to([imgsRef.current[1], imgsRef.current[0]], {
  //       x: 20,
  //       y: 10,
  //     })

  //     timeline.to([imgsRef.current[1], imgsRef.current[0]], {
  //       x: 10,
  //       y: 20,
  //       rotate: -10,
  //       repeat: 1,
  //       yoyo: true
  //     })

  //     timeline.to([imgsRef.current[1], imgsRef.current[0]], {
  //       x: -20,
  //       y: -5,
  //       rotate: 10
  //     })

  //     timeline2.set(imgsRef.current[2], {
  //       y: 10
  //     })

  //     timeline2.to(imgsRef.current[2], {
  //       rotate: 10,
  //       x: 10
  //     })

  //     timeline2.to(imgsRef.current[2], {
  //       delay: 0.2,
  //       y: -10,
  //       rotate: -10
  //     })

  //     timeline3.to(imgsRef.current[3], {
  //       rotate: 10,
  //       x: 20
  //     })

  //     timeline3.to(imgsRef.current[3], {
  //       delay: 0.5,
  //       y: 20,
  //       rotate: -10
  //     })

  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  async function setGetEstimateBudget(id) {
    setLoading(true);
    try {
      const data = await getestimateBudget(id);
      setEstimateData(data?.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      setGetEstimateBudget(id);
    }
  }, [id]);

  function formatIndianCurrency(value) {
    const formatNumber = (num) => {
      return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
    };

    if (value >= 1_00_00_000) {
      return `${formatNumber(value / 1_00_00_000)}Cr`;
    } else if (value >= 1_00_000) {
      return `${formatNumber(value / 1_00_000)}L`;
    } else if (value >= 1_000) {
      return `${formatNumber(value / 1_000)}K`;
    } else {
      return `${value}`;
    }
  }

  return (
    <>
      {loading && <div>Loading....</div>}
      {estimateData && (
        <div className={styles.container}>
          {estimateData.minEstimate === 0 && estimateData.maxEstimate === 0 ? (
            <div className={styles.banner}>
              <img
                src={backgroundSmall}
                className={styles.bgImageSmall}
                alt="background"
              />
              <img
                src={backgroundMedium}
                className={styles.bgImage}
                alt="Background"
              />
              <div className={styles.noEstimateContent}>
                <div className={styles.head1}>
                  <h1>You haven't Selected/chooses any work to done yet.</h1>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.banner}>
              <img
                src={backgroundSmall}
                className={styles.bgImageSmall}
                alt="background"
              />
              <img
                src={backgroundMedium}
                className={styles.bgImage}
                alt="Background"
              />
              <div className={styles.parentContent}>
                <div className={styles.mainHead}>
                  <div className={styles.head1}>
                    <h1>Your Personalized Interior Estimate</h1>
                    <p className={`paragraph-large ${styles.subHead}`}>
                      A smart price range based on your home layout and
                      essential services.
                    </p>
                  </div>
                  <div>
                    <Button
                      className={styles.ctaButton}
                      onClick={() => navigate("/contact")}
                    >
                      <h4>Contact Now</h4>
                    </Button>
                  </div>
                </div>
              </div>
              <div className={styles.priceRange}>
                <div className={styles.priceContent}>
                  <div className={styles.starAnimation}>
                    <img
                      src={img1}
                      ref={addToRefs}
                      className={styles.img1}
                      alt="img1"
                    />
                    <img
                      src={img2}
                      ref={addToRefs}
                      className={styles.img2}
                      alt="img2"
                    />
                    <img
                      src={img3}
                      ref={addToRefs}
                      className={styles.img3}
                      alt="img3"
                    />
                    <img
                      src={img4}
                      ref={addToRefs}
                      className={styles.img4}
                      alt="img4"
                    />
                  </div>
                  <div
                    className={styles.context}
                    style={{ backgroundImage: `url(${amountBg})` }}
                  >
                    <div className={styles.priceRangeText}>
                      ₹{formatIndianCurrency(estimateData?.minEstimate)} – ₹
                      {formatIndianCurrency(estimateData?.maxEstimate)}
                    </div>
                    <div className={styles.priceLined}>
                      {/* <div class={styles.curve}>
                      <svg viewBox="0 0 500 200" preserveAspectRatio="none">
                        <path d="M0 100 Q250 0 500 100" stroke="black" fill="transparent" stroke-width="2" />
                      </svg>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.dataContainer}>
            <div className={styles.sectionTitle}>
              What’s Included in Your Package
            </div>
            <div className={styles.mainContext}>
              {loading && <div className={styles.loading}>Loading....</div>}
              {estimateData && (
                <>
                  <div className={`${styles.layOut}`}>
                    <div className={styles.layouthead}>
                      <h4>{estimateData?.layoutType} -Layout</h4>
                    </div>
                    <div>
                      <ul>
                        {estimateData?.AreaDetails && (
                          <>
                            <li className={styles.tick}>
                              <div className={styles.tickIcon}>
                                <img src={bedroom} />
                              </div>
                              <div
                                className={`paragraph-large ${styles.lineItem}`}
                              >{`${estimateData?.AreaDetails?.SleepingArea} Bedrooom`}</div>
                            </li>

                            <li className={styles.tick}>
                              <div className={styles.tickIcon}>
                                <img src={bathroom} />
                              </div>
                              <div
                                className={`paragraph-large ${styles.lineItem}`}
                              >{`${estimateData?.AreaDetails?.Bathroom} Bathroom`}</div>
                            </li>

                            <li className={styles.tick}>
                              <div className={styles.tickIcon}>
                                <img src={living_room} />
                              </div>
                              <div
                                className={`paragraph-large ${styles.lineItem}`}
                              >{`${estimateData?.AreaDetails?.UtilityArea}  Utility Area`}</div>
                            </li>

                            <li className={styles.tick}>
                              <div className={styles.tickIcon}>
                                <img src={kitchen} />
                              </div>
                              <div
                                className={`paragraph-large ${styles.lineItem}`}
                              >{`${estimateData?.AreaDetails?.Kitchen} Kitchen`}</div>
                            </li>

                            <li className={styles.tick}>
                              <div className={styles.tickIcon}>
                                <img src={dinning} />
                              </div>
                              <div
                                className={`paragraph-large ${styles.lineItem}`}
                              >{`${estimateData?.AreaDetails?.Dining} Dining Area`}</div>
                            </li>
                          </>
                        )}
                        {/* {estimateData?.AreaDetails &&
                            Object.entries(estimateData.AreaDetails)
                              .map(([key, value], index) => (
                              ))
                          } */}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.QuesContainer}>
                    <div className={styles.gridBox}>
                      {estimateData?.selectedDesignOptions &&
                        estimateData?.selectedDesignOptions?.map((i, index) => (
                          <React.Fragment key={index}>
                            <div className={styles.item}>
                              <div className={styles.QuesHead}>
                                <h4>{i?.category}</h4>
                              </div>
                              <div
                                className={`${styles.tick} `}
                                key={i}
                                onClick={() => handleShowDetails(index)}
                              >
                                <div className={styles.tickIcon}>
                                  <img src={tickMark} />
                                </div>
                                <div
                                  className={`${styles.labelType} paragraph-large`}
                                >
                                  {i?.label}
                                </div>
                                <div className={`${styles.tickIcon} ${showDetails === index
                                    ? styles.rotate
                                    : ""}`}>
                                  <img src={arrow} />
                                </div>
                              </div>
                              <ul
                                className={`${styles.estimateDetails} ${
                                  showDetails === index
                                    ? styles.showDetails
                                    : ""
                                }`}
                              >
                                {i?.details?.map((item) => (
                                  <li className="paragraph-medium">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteriorEstimate;
