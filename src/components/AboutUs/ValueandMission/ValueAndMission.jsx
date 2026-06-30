import React from "react";
import ValuePageStyle from "./valueandmission.module.css";
import ValueCard from "./ValueCard";

import image1 from "../../../assets/icons/diamond.png";
import image2 from "../../../assets/icons/target.png";

const subheads1 = [
  "Client centricity",
  "Building Trust",
  "Practical Design",
  "Attention to Detail",
];
const descripts1 = [
  "We embody your vision, every detail, every choice aligned precisely for you and your timeline.",
  "Complete transparency from concept to completion—clear timelines, updates, and open communication.",
  "Designing spaces that transcend trends—where elegance endures and functionality lasts.",
  "Every detail meticulously crafted—where architectural flow and finishes define luxury living.",
];

const subheads2 = [
  "Design that Reflects You",
  "Elegantly Unite Functions",
  "Experience at the Helm",
  "Integrity at Our Core",
];
const descripts2 = [
  "We craft spaces that express your unique personality, lifestyle, and vision—no compromises.",
  "Design interiors that blend beauty with purposeful, thoughtful planning.",
  "Driven by seasoned expertise, we steer projects smoothly from vision to flawless reality.",
  "Our foundation is honesty—always transparent, accountable, and committed to doing what’s right.",
];

function ValueAndMission() {
  return (
    <div className={ValuePageStyle.mainContainer}>
      <div className={ValuePageStyle.pageContainer}>
        <div className={ValuePageStyle.headerContainer}>
          <h3>Our Mission &amp; Core Values</h3>
          <p className={`${ValuePageStyle.text} paragraph-medium`}>
            At Abhirachnaa, we believe in meaningful collaboration, thoughtful
            design, and delivering excellence that resonates with every client.
            Guided by integrity, creativity, and client- centricity, our values
            influence every decision we make from concept to completion. These
            principles are the foundation of our work and the reason our spaces
            feel effortlessly right.
          </p>
        </div>

        <div className={ValuePageStyle.cardsContainer}>
          <ValueCard
            image={image1}
            heading="Values"
            subheadings={subheads1}
            descriptions={descripts1}
          />
          <ValueCard
            image={image2}
            heading="Mission"
            subheadings={subheads2}
            descriptions={descripts2}
          />
        </div>
      </div>
    </div>
  );
}

export default ValueAndMission;
