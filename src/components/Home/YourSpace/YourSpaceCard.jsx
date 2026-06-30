import React from "react";
import Style from "./yourspacecard.module.css";

function YourSpaceCard({heading, text}) {
  return (
    <div className={Style.cardContainer}>
      <h3>{heading[0]} <br/>{heading[1]}</h3>
      <p className="paragraph-small">{text}</p>
    </div>
  );
}

export default YourSpaceCard;
