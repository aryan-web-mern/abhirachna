import React from "react";
import CardStyle from "./perkcard.module.css";
import starIcon from "../../../assets/icons/Vector.svg";

function PerkCard({ heading, list, image }) {
  return (
    <div className={CardStyle.cardContainer}>
      <div className={CardStyle.info}>
        <h4>{heading}</h4>
        <div className={CardStyle.listContainer}>
          {list.map((item, index) => (
            <div key={index} className={CardStyle.listItem}>
              <img src={starIcon} alt="Vector" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={CardStyle.imageContainer}>
        <img src={image} alt="Perk Illustration" />
      </div>
    </div>
  );
}

export default PerkCard;
