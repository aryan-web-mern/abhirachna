import React from "react";
import Styles from "./TestimonialHome.module.css";
import star from "../../../assets/testimonials/star.svg";
import arrow from "../../../assets/testimonials/up-rightArrow.svg";
import Button from "../../ui/Button/Button";

const TestimonialsHome = () => {
  return (
    <div className={Styles.testimonialMainContainer}>
      <div className={Styles.testimonialsHome}>
        <div className={Styles.mainText}>
          <h1>
            Where design meets perfections <br />
            trusted by our clients
            {/* We Deliver Excellence <br />
            Proven by Our Clients */}
          </h1>
          <p className="paragraph-medium">
            Design isn&#39;t just what we do; it&#39;s how we connect lives,
            elevate lifestyles, and build timeless spaces. At Abhirachnaa, our
            legacy is shaped by real stories, real homes, and real satisfaction.
          </p>
        </div>

        <div className={Styles.mainCard}>
          <div className={Styles.cardTop}>
            <h1 className={Styles.title}>
              200+ <br /> VERIFIED
            </h1>
            <h1 className={Styles.tag}>TESTIMONIALS</h1>
          </div>

          <div className={Styles.cardBottom}>
            <p className={`${Styles.cardPara} paragraph-medium`}>
              From concept to completion, every detail is a reflection of our
              promise to deliver more than just interiors, we deliver emotion,
              comfort, and value that lasts.
            </p>
            <div className={Styles.cardBottomRight}>
              <div className={Styles.avatarRatings}>
                <div className={Styles.avatarStack}>
                  <img src="https://i.pravatar.cc/48?u=1" alt="User 1" />
                  <img
                    src="https://i.pravatar.cc/48?u=2"
                    className={Styles.secondary}
                    alt="User 2"
                  />
                  <img
                    src="https://i.pravatar.cc/48?u=3"
                    className={Styles.secondary}
                    alt="User 3"
                  />
                  <img
                    src="https://i.pravatar.cc/48?u=4"
                    className={Styles.secondary}
                    alt="User 4"
                  />
                </div>

                <div className={Styles.ratings}>
                  <div className={Styles.ratingStars}>
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <img
                          key={index}
                          src={star}
                          alt="Star"
                          className={Styles.star}
                        />
                      ))}
                  </div>
                  <p className={`${Styles.ratingText} paragraph-small`}>
                    4.9/5
                  </p>
                </div>
              </div>
              <a className={Styles.buttonText} href="#testimonailForm">
                <Button variant="secondary" className={Styles.buttonText}>
                  Share Yours <img src={arrow} alt="up-rightArrow" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsHome;
