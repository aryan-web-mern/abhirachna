import React from "react";
import ValueCardStyles from "./valuecard.module.css";

function ValueCard({ image, heading, subheadings, descriptions }) {
  return (
    <div className={ValueCardStyles.cardContainer}>
      <div className={ValueCardStyles.headingContainer}>
        <img src={image} alt="Value Card" className={ValueCardStyles.image} />
        <h3 className={ValueCardStyles.heading}>{heading}</h3>
      </div>

      <div className={ValueCardStyles.horizontalLine} />

      <div className={ValueCardStyles.container}>
        {subheadings.map((subheading, index) => (
          <div key={index} className={ValueCardStyles.infoContainer}>
            <h4 className={ValueCardStyles.digits}>0{index + 1}</h4>
            <div className={ValueCardStyles.inner}>
              <h5>{subheading}</h5>
              <p className="paragraph-small">{descriptions[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValueCard;
