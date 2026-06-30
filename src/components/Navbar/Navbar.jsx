import React, { useRef } from "react";
import { useSelector } from "react-redux";
import logoblue from "../../assets/icons/logoblue.png";
import logowhite from "../../assets/icons/logowhite.png";
import "./Navbar.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

function Navbar({ menuOpen, setMenuOpen, varient }) {
  const isScrolled = useSelector((state) => state.scroll.isScrolled);
  const logoRef = useRef(null);
  const imageRef = useRef(null);
  const navbarBtnRef = useRef(null);
  const navbarContainerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (varient && varient.cssClass) {
      gsap.set(imageRef.current, {
        visibility: "hidden",
        opacity: 0,
      });
      gsap.set(navbarBtnRef.current, {
        visibility: "hidden",
        opacity: 0,
      });

      gsap.from(logoRef.current, {
        y: "-=200px",
        // delay: 1,
        duration: 2,
        zIndex: -1000,
      });

      gsap.to(navbarBtnRef.current, {
        delay: 6,
        visibility: "visible",
        opacity: 1,
        duration: 1,
      });
      gsap.to(imageRef.current, {
        delay: 6,
        visibility: "visible",
        opacity: 1,
        duration: 1,
      });
    }
  }, []);

  return (
    <div
      className={`navbar_container  ${
        isScrolled ? "" : varient ? varient.cssClass : ""
      } ${menuOpen ? "open_nav" : "close_navbar"}`}
      ref={navbarContainerRef}
    >
      <img
        onClick={() => {
          navigate("/");
          setMenuOpen(false);
        }}
        ref={imageRef}
        src={
          isScrolled
            ? menuOpen
              ? logowhite
              : logoblue
            : menuOpen
            ? logoblue
            : logowhite
        }
        alt=""
      />

      <div
        className={`navbar_center  ${menuOpen ? "open_nav" : ""}`}
        ref={logoRef}
      >
        <h1>ABHIRACHNAA</h1>
      </div>

      <div
        className={`custom_toggle  ${menuOpen ? "open_nav" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        ref={navbarBtnRef}
      >
        <span></span>
        <span className="middleLine"></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;
