import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import AboutForm from "../../components/AboutUs/AboutForm/AboutForm";
import AboutHome from "../../components/AboutUs/AboutHome/AboutHome";
import Founders from "../../components/AboutUs/Founders/Founders";
import ValueAndMission from "../../components/AboutUs/ValueandMission/ValueAndMission";

import "./Style.css";
import { useGSAP } from "@gsap/react";
import Footer from "../../components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // useGSAP(() => {
  //   gsap.to("#about-page1", {

  //     scrollTrigger: {
  //       trigger: "#about-page1",
  //       start: "5% top",
  //       end: "+=1000",
  //       pin: true,
  //       scrub: true
  //     },
  //   });
  //   gsap.to("#about-page2", {

  //     scrollTrigger: {
  //       trigger: "#about-page2",
  //       start: "top -5%",
  //       end: "+=1000",
  //       pin: true,
  //       scrub: true

  //     },
  //   });

  //   gsap.to("#about-page3", {

  //     scrollTrigger: {
  //       trigger: "#about-page3",
  //       start: "top top",
  //       end: "+=800",
  //       pin: true,
  //       scrub: true

  //     },
  //   });

  //   gsap.to("#about-page4", {

  //     scrollTrigger: {
  //       trigger: "#about-page4",
  //       start: "top top",
  //       end: "+=800",
  //       pin: true,
  //       scrub: true
  //     },
  //   });

  // }, []);

  return (
    <div className="about" id="about">
      <div id="about-page1">
        <AboutHome />
      </div>

      <div id="about-page2">
        <Founders />
      </div>

      <div id="about-page3">
        <ValueAndMission />
      </div>

      <div id="about-page4">
        <AboutForm />
      </div>
    </div>
  );
};

export default About;
