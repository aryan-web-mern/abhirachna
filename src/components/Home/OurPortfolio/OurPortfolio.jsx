import React, { useState } from "react";
import Style from "./ourportfolio.module.css";
import PortfolioSlider from "./PortfolioSlider";
import arrow from "../../../assets/Frame.png";
import whiteArrow from "../../../assets/whiteArrow.svg";
import { useNavigate } from "react-router-dom";

function OurPortfolio() {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={Style.mainContainer}>
      <div className={Style.portfolioContainer}>
        <div className={Style.leftContainer}>
          <h3>Our Portfolio</h3>
          <p className="paragraph-medium">
            With over 200 flat interiors completed, we’ve redefined everyday
            spaces into elegant, functional homes that reflect each client’s
            unique lifestyle. From smart studios to luxurious penthouses, our
            designs embody modern luxury, driven by innovation, craftsmanship,
            and a commitment to lasting value.
          </p>
        </div>

        <button
          className={`${Style.showButton}`}
          onClick={() => navigate("/gallery")}
          style={{ display: "none" }}
        >
          <span className={Style.galleryAllBtn}>View Gallery </span>
          <img src={whiteArrow} alt="" />
        </button>

        <div className={Style.rightContainer}>
          <PortfolioSlider scrollNumber={1} direction={"left"} />
          <PortfolioSlider scrollNumber={2} direction={"right"} />

          <PortfolioSlider
            scrollNumber={1}
            direction={"left"}
            style={window.screen.width <= 590 ? "" : { display: "none" }}
          />
          <PortfolioSlider
            scrollNumber={2}
            direction={"right"}
            style={window.screen.width <= 590 ? "" : { display: "none" }}
          />
          <div className={Style.exploreBtn}>
            <button
              className={`${Style.customBtn}  ${
                showText ? Style.expanded : ""
              }`}
              onMouseOver={() => setShowText(true)}
              onMouseLeave={() => setShowText(false)}
              onClick={() => navigate("/gallery")}
            >
              <span className={Style.btntext}>Explore</span>
              <img src={arrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurPortfolio;
