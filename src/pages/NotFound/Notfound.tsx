import React from "react";
import { useNavigate } from "react-router-dom";
import "./Notfound.css"; // if needed

const Notfound= () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div className="mainWrapper">
        <div className="notFoundSection">
          <h1 className="mainHeading">
            This page is <span className="highlightText">currently under construction</span>
          </h1>
          <p className="descText">
            We are working on it and will make it live <span className="solutionText">very soon</span>.
          </p>
          <div className="ctaSection">
            <div className="estimateBtn" onClick={() => navigate("/")}>
              Go Back to Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
