import React from "react";
import Style from "./yourspace.module.css";
import YourSpaceCard from "./YourSpaceCard";
import { homeOurSpaceData } from "../../../utils/constantData";

function YourSpace() {
  return (
    <div className={Style.mainContainer}>
      <div className={Style.container}>
        <div className={Style.leftContainer}>
          <h3>
            Your Space, Our <span>Expertise</span>
          </h3>
          <p className="paragraph-medium">
            What sets us apart is more than design —{window.screen.width <= 1024 ? "" : <br />} it’s our promise to
            deliver on time, within budget,
          </p>
        </div>

        <div className={Style.rightContainer}>
          {homeOurSpaceData.map((item, index) => (
            <YourSpaceCard heading={item.title} text={item.text} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourSpace;
