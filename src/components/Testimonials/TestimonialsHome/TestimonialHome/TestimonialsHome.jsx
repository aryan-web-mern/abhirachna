import React from "react";
import Styles from "./TestimonialHome.module.css";
import Button from "../../../ui/Button/Button";
import star from "../../../../assets/testimonials/star.svg";
import arrow from "../../../../assets/testimonials/up-rightArrow.svg";

const TestimonialsHome = () => {
  return (
    <div className={Styles.testimonialsHome}>
      <div className={Styles.mainText}>
        <h1>“Where Design Meets Perfection”</h1>
        <p className="paragraph-medium">
          At Abhirachnaa, we believe great design is more than just arranging
          furniture — it’s about shaping how you feel in your space.
        </p>
      </div>

      <div className={Styles.mainCard}>
        <div className={Styles.cardTop}>
          <h1 className={Styles.title}>
            500+ <br /> VERIFIED
          </h1>
          <h1 className={Styles.tag}>TESTIMONIALS</h1>
        </div>

        <div className={Styles.cardBottom}>
          <p className={`${Styles.cardPara} paragraph-medium`}>
            With over two decades of collective experience, our team brings
            mastery that merges design aesthetics with functional brilliance.
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
                <div>
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
                <p className={`${Styles.ratingText} paragraph-smal`}>4.9/5</p>
              </div>
            </div>
            <Button variant="secondary">
              <p className={Styles.buttonText}>
                Share Yours <img src={arrow} alt="up-rightArrow" />
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsHome;
