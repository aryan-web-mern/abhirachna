import React from "react";
import PerkPageStyle from "./perksandbenefits.module.css";
import { headings, lists } from "./PerkCardsData";
import PerkCard from "./PerkCard";

import image1 from "../../../assets/perksImages/Calendar_object1.png";
import image2 from "../../../assets/perksImages/image2.png";
import image3 from "../../../assets/perksImages/beach-chair1.png";
import image4 from "../../../assets/perksImages/Group.png";

function PerkAndBenefits() {
  return (
    <div className={PerkPageStyle.mainContainer}>
      <div className={PerkPageStyle.container}>
        <div className={PerkPageStyle.Header}>
          <h3>Perks & Benefits Abhirachnaa Offers</h3>
          <p className="paragraph-medium">
            Because when you feel good, you do great work — and we’re all about
            both.
          </p>
        </div>

        <div className={PerkPageStyle.cardsContainer}>
          <PerkCard heading={headings[0]} list={lists[0]} image={image1} />
          <PerkCard heading={headings[1]} list={lists[1]} image={image2} />
          <PerkCard heading={headings[2]} list={lists[2]} image={image3} />
          <PerkCard heading={headings[3]} list={lists[3]} image={image4} />
        </div>
      </div>
    </div>
  );
}

export default PerkAndBenefits;
