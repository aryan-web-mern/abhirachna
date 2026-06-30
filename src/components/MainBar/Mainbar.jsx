import React, { useEffect, useRef, useState } from "react";
import styles from "./Mainbar.module.css";
import contactpng from "../../assets/icons/contact.png";
import emailpng from "../../assets/icons/email.png";
import locationpng from "../../assets/icons/location.png";
import profilepng from "../../assets/icons/profile.png";
import logoutpng from "../../assets/icons/logout.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";
import Button from "../ui/Button/Button";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useGSAP } from "@gsap/react";

const Mainbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = useSelector((state) => state.scroll.isScrolled);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menuLineRef = useRef(null);
  const firstLineRef = useRef(null);
  const secondLineRef = useRef(null);
  const footerRef = useRef(null);
  const navLinksRef = useRef(null);
  const timeoutRef = useRef(null);
  const menuButttonRef = useRef(null);
  const headingContainerRef = useRef(null);
  const logoRef = useRef(null);

  const { authUser, logout, showModel, setShowModel } = useAuth();

  const [showTemp, setShowTemp] = useState(true);

  useEffect(() => {
    if (pathname !== "/") {
      setShowTemp(false);
      return;
    }
    const timer = setTimeout(() => setShowTemp(false), 3000);
    return () => clearTimeout(timer);
  }, [pathname, isScrolled]);

  useEffect(() => {
    if (menuOpen || showModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, showModel, pathname]);

  useGSAP(() => {
    if (pathname === "/") {
      gsap.set(logoRef.current, {
        visibility: "hidden",
        opacity: 0,
      });
      gsap.set(menuButttonRef.current, {
        visibility: "hidden",
        opacity: 0,
      });

      gsap.from(headingContainerRef.current, {
        y: "-=12.5rem",
        // delay: 1,
        duration: 2,
        zIndex: -1000,
      });

      gsap.to(menuButttonRef.current, {
        delay: 5,
        visibility: "visible",
        opacity: 1,
        duration: 1,
      });
      gsap.to(logoRef.current, {
        delay: 5,
        visibility: "visible",
        opacity: 1,
        duration: 1,
      });
    }
  }, [pathname]);

  const getResponsiveValues = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      // 1200px
      return {
        width: "97vw",
        y: -30,
        x: 55,
        height: 39,
        lineY: 13.4,
        lineX: -1,
        secondLineX: -0.3,
      };
    } else if (width >= 1025) {
      // 1034px
      return {
        width: "97vw",
        y: -30,
        x: 62,
        height: 39,
        lineY: 13.4,
        lineX: -1,
        secondLineX: -0.3,
      };
    } else if (width >= 830) {
      // 830px
      return {
        width: "96vw",
        y: -25,
        x: 20,
        height: 30,
        lineY: 8.5,
        lineX: 0,
        secondLineX: 0,
      };
    } else if (width >= 590) {
      // 590px
      return {
        width: "96vw",
        y: -25,
        x: 25,
        height: 30,
        lineY: 8.5,
        lineX: 0,
        secondLineX: 0,
      };
    } else if (width >= 430) {
      // 430px
      return {
        width: "96vw",
        y: -25,
        x: 5,
        height: 30,
        lineY: 8.5,
        lineX: 0,
        secondLineX: 0,
      };
    } else {
      return {
        width: "96vw",
        y: -25,
        x: 8,
        height: 30,
        lineY: 8.5,
        lineX: 0,
        secondLineX: 0,
      };
    }
  };

  const getCloseValues = () => {
    const width = window.innerWidth;

    if (width >= 1025) {
      // 1025px
      return { width: 22, height: 4 };
    } else {
      return { width: 12, height: 3 };
    }
  };

  const handleClick = (e = null) => {
    if (e.target.tagName !== "path" && e.target.tagName !== "svg") {
      if (e.target.className.includes("navOverlay") && menuOpen) {
        return;
      }
    }

    if (timeoutRef.current) {
      return;
    }

    timeoutRef.current = true;
    setTimeout(() => {
      timeoutRef.current = false;
    }, 1000);

    const tl = gsap.timeline();

    // Animations while opening the menubar
    if (menuOpen === false) {
      const values = getResponsiveValues();

      // Animate menu line expansion
      tl.to(menuLineRef.current, {
        width: values.width,
        y: values.y,
        x: values.x,
        height: values.height,
        padding: 30,
        duration: 0.3,
        ease: "none",
      });

      // Expand to full height
      tl.to(menuLineRef.current, {
        height: "96dvh",
        padding: 30,
        duration: 0.2,
        ease: "none",
      });

      // Animate hamburger to cross
      tl.to(
        firstLineRef.current,
        {
          rotation: -45,
          y: values.lineY,
          x: values.lineX,
          ease: "none",
        },
        "-=0.2"
      );

      tl.to(
        secondLineRef.current,
        {
          rotation: 45,
          y: -values.lineY,
          x: values.secondLineX,
          ease: "none",
        },
        "<"
      );

      // Show nav links
      tl.set(navLinksRef.current, {
        y: -20,
        display: "flex",
      });

      tl.to(navLinksRef.current, {
        opacity: 1,
        y: 0,
      });

      // Show footer
      tl.set(
        footerRef.current,
        {
          y: 50,
          display: "flex",
        },
        "<"
      );

      tl.to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "<"
      );
    }
    // Animations while closing the menubar
    else if (menuOpen === true) {
      const closeValues = getCloseValues();

      // Reset cross to hamburger
      tl.to(firstLineRef.current, {
        rotation: 0,
        y: 0,
        x: 0,
      });

      tl.to(
        secondLineRef.current,
        {
          rotation: 0,
          y: 0,
          x: 0,
        },
        "<"
      );

      // Hide footer
      tl.to(
        footerRef.current,
        {
          duration: 0.2,
          opacity: 0,
          y: 20,
          bottom: "3.125rem",
          display: "none",
        },
        "<"
      );

      // Hide nav links
      tl.to(
        navLinksRef.current,
        {
          duration: 0.2,
          display: "none",
          opacity: 0,
          y: -20,
        },
        "<"
      );

      // Collapse menu line height
      tl.to(
        menuLineRef.current,
        {
          height: 39,
          duration: 0.2,
          ease: "none",
        },
        "<"
      );

      // Collapse menu line to hamburger size
      tl.to(
        menuLineRef.current,
        {
          delay: 0.25,
          width: closeValues.width,
          height: closeValues.height,
          padding: 0,
          y: 0,
          x: 0,
          duration: 0.3,
          ease: "none",
        },
        "<"
      );
    }

    setMenuOpen((val) => !val);
  };

  // Handle menu repositioning when menuOpen changes or window resizes
  useEffect(() => {
    const handleMenuResize = () => {
      if (menuOpen) {
        const values = getResponsiveValues();
        gsap.set(menuLineRef.current, {
          width: values.width,
          x: values.x,
          y: values.y,
        });
      }
    };

    window.addEventListener("resize", handleMenuResize);
    return () => window.removeEventListener("resize", handleMenuResize);
  }, [menuOpen, pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setShowTemp(false);
      return;
    }

    // Reset showTemp on route change
    setShowTemp(true);
    const timer = setTimeout(() => setShowTemp(false), 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLoginButtonClick = () => {
    setShowModel(true);
  };

  return (
    <div
      className={`${styles.mainContainer} 
      ${menuOpen ? styles.openMenu : styles.closeMenu}
      ${
        showTemp
          ? styles.navTemp
          : !isScrolled && pathname === "/"
          ? styles.navTransparent
          : styles.navVisible
      }`}
    >
      <div className={styles.secondaryContainer}>
        {menuOpen && <div className={styles.navOverlay}></div>}

        {/* LOGO Container */}
        <div
          className={styles.logoContainer}
          onClick={(e) => {
            navigate("/");
            menuOpen ? handleClick(e) : "";
          }}
        >
          <svg
            ref={logoRef}
            width="50"
            height="44"
            viewBox="0 0 50 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.6399 36.2438L8.20064 24.4283L0 36.2438H8.31995H16.6399Z" />
            <path d="M33.1929 11.6343C28.0228 4.56672 25.1553 0 25.1553 0L8.93015 23.3773C12.2953 21.0214 14.6848 24.5733 14.6848 24.5733L28.1097 44C28.1097 44 34.3659 37.3311 32.5412 34.7941C30.7165 32.257 20.5066 17.9044 20.5066 17.9044L23.5478 13.0478C23.5478 13.0478 29.891 19.318 26.8497 22.6524C26.8497 22.6524 38.363 18.7018 33.1929 11.6343Z" />
            <path d="M40.3615 22.6524C37.2768 18.3165 27.3277 23.4498 27.3277 23.4498C34.3225 23.2685 35.1914 33.888 40.9698 36.2438L49.8762 36.0264L40.3615 22.6524Z" />
          </svg>
        </div>

        {/* ABHIRACHNAA HEADING */}
        <div className={styles.headingContainer} ref={headingContainerRef}>
          <h1>ABHIRACHNAA</h1>
        </div>

        {/* MenuBar Icon */}
        <div
          className={styles.menuContainer}
          ref={menuButttonRef}
          onClick={(e) => handleClick(e)}
        >
          <div ref={firstLineRef} className={styles.line1}></div>

          {/* MenuBar container */}
          <div
            ref={menuLineRef}
            className={`${styles.line2} ${styles.mainMenuContainer}`}
          >
            {/* Navigation links */}
            <div className={styles.navlinksContainer} ref={navLinksRef}>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </span>
              </label>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/about" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  {" "}
                  About Us
                </span>
              </label>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/testmonials" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/testmonials");
                  }}
                >
                  Testimonials
                </span>
              </label>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/gallery" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/gallery");
                  }}
                >
                  Gallery
                </span>
              </label>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/careers" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/careers");
                  }}
                >
                  Careers
                </span>
              </label>
              <label
                className={`${styles.label} label  menubarBlog ${
                  location.pathname === "/blogs" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/blogs");
                  }}
                >
                  Blogs
                </span>
              </label>
              <label
                className={`${styles.label} label ${
                  location.pathname === "/contact" ? "activeLabel" : ""
                }`}
              >
                <span
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact Us
                </span>
              </label>
            </div>

            {/* MenuBar Footer */}
            <div className={styles.menuBarFooter} ref={footerRef}>
              <div className={styles.basicDetails}>
                <div className={styles.phNo}>
                  <img src={contactpng} alt="" className="img" />
                  <a href="tel:+917341102563">
                    <p>+91 7341102563</p>
                  </a>
                </div>
                <div className={styles.email}>
                  <img src={emailpng} alt="" className="img" />
                  <a href="mailTo:sales@abhirachnaa.com">
                    <p>sales@abhirachnaa.com</p>
                  </a>
                </div>
                <div>
                  <img src={locationpng} alt="" className="img" />
                  <p>
                    SCO 63 Third Floor Commercial Pocket 2, Sector 66 First
                    Floor C, Mohali, Punjab - 160055, India
                  </p>
                </div>
              </div>
              <div className={styles.button}>
                <Button
                  onClick={() => {
                    navigate("/get-estimate");
                  }}
                  variant="gradient"
                >
                  Get Estimate
                </Button>
              </div>
              <div className={styles.userDetails}>
                {authUser ? (
                  <div className={styles.loggedInDetails}>
                    <div>
                      <p
                        onClick={() => navigate("/profile")}
                        className={`label-medium ${styles.userName}`}
                      >
                        {authUser?.name}
                      </p>
                      <img src={profilepng} alt="logo" className="logo" />
                    </div>
                    <div className={styles.userNo}>
                      <p className="label-medium">{authUser?.phone}</p>
                      <img src={contactpng} alt="logo" className="logo" />
                    </div>
                    <div>
                      <p
                        className={`label-medium ${styles.logout}`}
                        onClick={logout}
                      >
                        Logout
                      </p>
                      <img src={logoutpng} alt="logo" className="logo" />
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.loggedIOutDetails}
                    // onClick={() => navigate("/login")}
                    onClick={handleLoginButtonClick}
                  >
                    <p className={`label-medium ${styles.login}`}>Login</p>
                    <img src={logoutpng} alt="logo" className="logo" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div ref={secondLineRef} className={styles.line3}></div>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
