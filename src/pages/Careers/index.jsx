import React from "react";
import CareersHome from "../../components/Careers/Home/CareersHome";

import "./Style.css";
import JobDetails from "../../components/Careers/JobDetails/JobDetails";
import LifeAtAbhirachana from "../../components/Careers/LifeAtAbhirachana/LifeAtAbhirachana";
import PerkAndBenefits from "../../components/Careers/PerkAndBenefits/PerkAndBenefits";
import HereItFromPage from "../../components/Careers/GridView/HereItFromPage";
import CarrierForm from "../../components/Careers/CarrierForm/CarrierForm";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Careers = () => {
  // useGSAP(() => {
  //   gsap.to("#page1", {
  //     scrollTrigger: {
  //       trigger: "#page1",
  //       start: "top -2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,
  //     }
  //   });
  //   gsap.to("#page2", {
  //     scrollTrigger: {
  //       trigger: "#page2",
  //       start: "top 2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,
  //     }
  //   });

  //   gsap.to("#page3", {
  //     scrollTrigger: {
  //       trigger: "#page3",
  //       start: "top -7%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#page4", {
  //     scrollTrigger: {
  //       trigger: "#page4",
  //       start: "top 2%",
  //       end: "+=1500",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#page5", {
  //     scrollTrigger: {
  //       trigger: "#page5",
  //       start: "top 2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });
  // });

  return (
    <div id="careers">
      <div id="page1">
        <CareersHome />
      </div>

      <div id="page2">
        <LifeAtAbhirachana />
      </div>

      <div id="page3">
        <PerkAndBenefits />
      </div>

      <div id="page4">
        <HereItFromPage />
      </div>

      <div id="page5">
        <CarrierForm />
      </div>
    </div>
  );
};

export default Careers;
