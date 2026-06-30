import React from "react";
import FounderCardStyle from "./foundercard.module.css";

function FounderCard({name, occupation, image}) {
  return (
    <div className={FounderCardStyle.cardContainer}>
      <img src={image} />
      <div className={FounderCardStyle.founderDetails}>
        <label className="label-medium">{name}</label>
        <label className={`${FounderCardStyle.founderOccupation} label-small`}>({occupation})</label>
      </div>
    </div>
  );
}

export default FounderCard;
