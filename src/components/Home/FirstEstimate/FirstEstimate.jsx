import React from "react";
import Style from "./firstestimate.module.css";
import houseImage from "../../../assets/house2.png";
import { useNavigate } from "react-router-dom";

function FirstEstimate() {
  const navigate=useNavigate();
  return (
    <div className={Style.mainContainer}>
      <div className={Style.container}>
        <div className={Style.innerBox}>
          <div className={Style.left}>
            <div className={Style.leftHeader}>
              <h3>
                Get <span>15% OFF</span>
                {window.screen.width <=768 ? "" : <br />} Your First Estimate
              </h3>
              <p className="paragraph-medium">
                Estimate the cost of transforming your flat, studio apartment,
                penthouse, or multi-BHK home — tailored to your lifestyle and
                taste, just the way you want it
              </p>
            </div>
            <div className={Style.leftFooter}>
              <button className={Style.estimateBtn} onClick={()=>navigate('/get-estimate')}>
                <h4>Get Estimate</h4>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                    fill="white"
                  />
                </svg>
              </button>

              <p>Quick • Custom • 200+ Happy Homes</p>
            </div>
          </div>
          <div className={Style.right}>
            <img src={houseImage} alt="House Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstEstimate;
