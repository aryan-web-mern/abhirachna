import "./Menubar.css";
import contactpng from "../../assets/icons/contact.png";
import emailpng from "../../assets/icons/email.png";
import locationpng from "../../assets/icons/location.png";
import profilepng from "../../assets/icons/profile.png";
import logoutpng from "../../assets/icons/logout.png";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../ui/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import { useAuth } from "../../AuthProvider/AuthContext";

export default function MenuBar({ menuOpen, setMenuOpen }) {
  const isScrolled = useSelector((state) => state.scroll.isScrolled);
  const menuRef = useRef(null);
  const menuRefItem = useRef(null);
  const menuFooterRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { authUser, setShowModel, logout } = useAuth();

  //menubar gsap animation
  useEffect(() => {
    const tl = gsap.timeline();
    let mm = gsap.matchMedia();

    if (menuOpen) {
      tl.set(menuRef.current, { display: "flex", x: 0, y: 0 });
      //  when width is greater than 1400
      mm.add("(min-width:1400px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "55px",
          x: 70,
          y: -30,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      //  when width is less that 1400
      mm.add("(min-width:1025px) and (max-width:1400px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "55px",
          x: 75,
          y: -30,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      mm.add("(min-width:800px) and (max-width:1024px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "30px",
          x: 28,
          y: -20,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      mm.add("(min-width:650px) and (max-width:800px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "30px",
          x: 30,
          y: -20,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      mm.add("(min-width:590px) and (max-width:650px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "30px",
          x: 32,
          y: -20,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      mm.add("(max-width:590px)", () => {
        tl.to(menuRef.current, {
          width: "97.2%",
          height: "30px",
          x: 9,
          y: -20,
          duration: 0.4,
          ease: "none",
        }).to(menuRef.current, {
          // height: "96.14%",
          height: "95.72%",
          duration: 0.4,
          ease: "none",
        });
      });
      tl.set(menuRefItem.current, { display: "flex" }).from(
        menuRefItem.current.children,
        {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
        },
        "<"
      );
      //  Footer animation (comes from bottom)
      tl.set(menuFooterRef.current, { display: "flex" }, "<").from(
        menuFooterRef.current.children,
        {
          delay: 0.3,
          y: 30,
          opacity: 0,
          ease: "none",
        },
        "<"
      );
    } else {
      tl.set(menuFooterRef.current, { display: "none" })
        .to(menuRef.current, {
          // height: "96.14%",
          height: "59px",
          duration: 0.3,
          ease: "none",
        })
        .to(menuRef.current, {
          // width: "97.55%",
          width: 22,
          height: 0,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "none",
        })
        .set(menuRef.current, { display: "none" });
    }
  }, [menuOpen]);

  // scroll prevent if menubar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <div className="menubar_mainContainer">
      <div
        className={`menubar_container ${
          isScrolled ? "" : menuOpen ? "open_menubar" : ""
        } `}
        ref={menuRef}
      >
        <div className="menubar_contain" ref={menuRefItem}>
          <label
            className={`label ${
              location.pathname === "/" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Home
          </label>
          <label
            className={`label ${
              location.pathname === "/about" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/about");
              setMenuOpen(false);
            }}
          >
            About Us
          </label>
          <label
            className={`label ${
              location.pathname === "/testmonials" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/testmonials");
              setMenuOpen(false);
            }}
          >
            Testimonials
          </label>
          <label
            className={`label ${
              location.pathname === "/gallery" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/gallery");
              setMenuOpen(false);
            }}
          >
            Gallery
          </label>
          <label
            className={`label ${
              location.pathname === "/careers" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/careers");
              setMenuOpen(false);
            }}
          >
            Careers
          </label>
          <label
            className={`label  menubarBlog ${
              location.pathname === "/blogs" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/blogs");
              setMenuOpen(false);
            }}
          >
            Blogs
          </label>
          <label
            className={`label ${
              location.pathname === "/contact" ? "activeLabel" : ""
            }`}
            onClick={() => {
              navigate("/contact");
              setMenuOpen(false);
            }}
          >
            Contact Us
          </label>
        </div>

        <div className="menubar_footer" ref={menuFooterRef}>
          <div className="menuabr_footer_left">
            <div className="menuabr_footer_left_top">
              <img src={contactpng} alt="" className="img" />
              <label className="label-medium">+91 7341102563</label>
            </div>
            <div className="menuabr_footer_left_middle">
              <img src={emailpng} alt="" className="img" />
              <label className="label-medium">
                sales@abhirachnaa.com
              </label>
            </div>
            <div className="menuabr_footer_left_bottom">
              <img src={locationpng} alt="" className="img" />
              <label className="label-medium">
                E-27 E26, Phase 7, Industrial Area, Sector 73, Sahibzada Ajit
                Singh Nagar, Punjab 160055
              </label>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              navigate("/get-estimate");
              setMenuOpen(false);
            }}
          >
            Get Estimate
          </Button>

          <div className="menuabr_footer_right">
            {authUser ? (
              <div className="on-login">
                <div className="menuabr_footer_right_top">
                  <label className="label-medium  footerName">
                    {authUser?.name}
                  </label>
                  <img src={profilepng} alt="logo" className="logo" />
                </div>
                <div className="menuabr_footer_right_middle ">
                  <label className="label-medium">{authUser?.phone}</label>
                  <img src={contactpng} alt="logo" className="logo" />
                </div>
                <div className="menuabr_footer_right_bottom ">
                  <label className="label-medium logout" onClick={logout}>
                    Logout
                  </label>
                  <img src={logoutpng} alt="logo" className="logo" />
                </div>
              </div>
            ) : (
              <div className="on-login">
                <div className="menuabr_footer_right_bottom ">
                  <label
                    className="label-medium logout"
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </label>
                  <img src={logoutpng} alt="logo" className="logo" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
