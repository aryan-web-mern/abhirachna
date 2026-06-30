import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScrolled } from "../../redux/scrollSlice";
import DesignDream from "../../components/Home/DesignDream/DesignDream";
import { FAQ } from "../../components/Home/FAQ/FAQ";
import FirstEstimate from "../../components/Home/FirstEstimate/FirstEstimate";
import SetUsApart from "../../components/Home/SetUsApart/SetUsApart";
import YourSpace from "../../components/Home/YourSpace/YourSpace";
import DreamHome from "../../components/Home/House/DreamHome";
import HgridView from "../../components/Home/HomeGridView/HGridView";
import Landing from "../../components/Home/Hero/Landing";
import OurPortfolio from "../../components/Home/OurPortfolio/OurPortfolio";
import OurProcess from "../../components/Home/OurProcess/OurProcess";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./Style.css";
import BookYourDesign from "../../components/Home/BookYourDesign";
import LandingAnimation from "../../components/Home/Hero/LandingAnimation";
const Home = () => {
  const [isMount, setIsMount] = React.useState(false);

  // useGSAP(() => {
  //   gsap.to("#home-page2", {
  //     scrollTrigger: {
  //       trigger: "#home-page2",
  //       start: "top -8%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page3", {
  //     scrollTrigger: {
  //       trigger: "#home-page3",
  //       start: "top 2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,
  //     }
  //   });

  //   gsap.to("#home-page4", {
  //     scrollTrigger: {
  //       trigger: "#home-page4",
  //       start: "top 2%",
  //       end: "+=1500",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page5", {
  //     scrollTrigger: {
  //       trigger: "#home-page5",
  //       start: "top -17%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page6", {
  //     scrollTrigger: {
  //       trigger: "#home-page6",
  //       start: "top 2%",
  //       end: "+=600",
  //       pin: true,
  //       pinSpacing: false,
  //     }
  //   });

  //   gsap.to("#home-page7", {
  //     scrollTrigger: {
  //       trigger: "#home-page7",
  //       start: "top 2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page8", {
  //     scrollTrigger: {
  //       trigger: "#home-page8",
  //       start: "top -5%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page9", {
  //     scrollTrigger: {
  //       trigger: "#home-page9",
  //       start: "top 2%",
  //       end: "+=600",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page10", {
  //     scrollTrigger: {
  //       trigger: "#home-page10",
  //       start: "top 2%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,

  //     }
  //   });

  //   gsap.to("#home-page11", {
  //     scrollTrigger: {
  //       trigger: "#home-page11",
  //       start: "top 2%",
  //       end: "+=600",
  //       pin: true,
  //       pinSpacing: false,
  //     }
  //   });
  // });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScrolled(false));

    const handleScroll = () => {
      const isScrolledPast = window.scrollY > 870;
      dispatch(setScrolled(isScrolledPast));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      dispatch(setScrolled(true)); // Reset to white when unmounted
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    const timer = setTimeout(() => {
      setIsMount(true);
      document.body.style.overflow = "unset";
    }, 3000);

    document.body.style.overflow = "hidden";
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div id="home-page1">{isMount ? <Landing /> : <LandingAnimation />}</div>
      <div id="home-page2">
        <SetUsApart />
      </div>
      <div id="home-page3">
        <YourSpace />
      </div>
      <div id="home-page4">
        <DreamHome />
      </div>
      <div id="home-page5">
        <HgridView />
      </div>
      <div id="home-page6">
        <OurPortfolio />
      </div>
      <div id="home-page7">
        <FirstEstimate />
      </div>
      <div id="home-page8">
        <OurProcess />
      </div>
      <div id="home-page9">
        <FAQ />
      </div>
      <BookYourDesign />

      {/* <div id="home-page11">
        <AboutForm />
      </div> */}
    </div>
  );
};

export default Home;
