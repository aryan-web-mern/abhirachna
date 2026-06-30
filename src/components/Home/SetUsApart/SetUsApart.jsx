import React, { useEffect, useRef } from "react";
import Style from "./setusapart.module.css";
import Button from "../../ui/Button/Button";
import SetUsApartCard from "./SetUsApartCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useState } from "react";

gsap.registerPlugin(ScrollToPlugin);
import { useNavigate } from "react-router-dom";

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

function SetUsApart() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const isAnimating = useRef(false);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // useGSAP(() => {
  //   const cards = cardsRef.current;
  //   if (cards.length === 0) return;

  //   const slideNext = () => {
  //     if (isAnimating.current) return;
  //     isAnimating.current = true;

  //     const topCard = cards[0];

  //     gsap.to(cards[2 + 1], {
  //       scale: window.screen.width <= 375 ? 1.07 : 1.1,
  //       // duration: 0.5,
  //       yoyo: true,
  //       repeat: 1,
  //       repeatDelay: 1.5,
  //     });

  //     gsap.to(cards[2 + 1], {
  //       delay: 0.5,
  //       opacity: "100%",
  //       duration: "none",
  //       onComplete: () => {
  //         gsap.to(cards[2 + 1], {
  //           delay: 2,
  //           opacity: "60%",
  //           duration: "none",
  //         });
  //       },
  //     });

  //     cards.forEach((card, index) => {
  //       gsap.to(card, {
  //         y:
  //           window.screen.width <= 425
  //             ? window.screen.width <= 375
  //               ? "-=192"
  //               : "-=192"
  //             : window.screen.width <= 1023
  //             ? "-=190"
  //             : "-=260",
  //         duration: 0.8,
  //         ease: "power2.inOut",
  //       });
  //     });

  //     gsap.to(topCard, {
  //       y:
  //         window.screen.width <= 425
  //           ? window.screen.width <= 375
  //             ? "+=960"
  //             : "+=960"
  //           : window.screen.width <= 1023
  //           ? "+=950"
  //           : "+=1300",
  //       duration: 0.001,
  //       delay: 0.8,
  //       onComplete: () => {
  //         cards.push(cards.shift());
  //         isAnimating.current = false;
  //       },
  //     });
  //   };

  //   const interval = setInterval(slideNext, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useGSAP(() => {
    const cards = cardsRef.current;
    if (cards.length === 0) return;

    const slideNext = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const topCard = cards[0];
      const screenWidth = window.innerWidth; 

      gsap.to(cards[2 + 1], {
        scale: screenWidth <= 375 ? 1.07 : 1.1,
        yoyo: true,
        repeat: 1,
        repeatDelay: 1.5,
      });

      gsap.to(cards[2 + 1], {
        delay: 0.5,
        opacity: "100%",
        duration: "none",
        onComplete: () => {
          gsap.to(cards[2 + 1], {
            delay: 2,
            opacity: "60%",
            duration: "none",
          });
        },
      });

      cards.forEach((card, index) => {
        gsap.to(card, {
          y:
            screenWidth <= 425
              ? screenWidth <= 375
                ? "-=192"
                : "-=192"
              : screenWidth <= 1023
              ? "-=190"
              : "-=260",
          duration: 0.8,
          ease: "power2.inOut",
        });
      });

      gsap.to(topCard, {
        y:
          screenWidth <= 425
            ? screenWidth <= 375
              ? "+=960"
              : "+=960"
            : screenWidth <= 1023
            ? "+=950"
            : "+=1300",
        duration: 0.001,
        delay: 0.8,
        onComplete: () => {
          cards.push(cards.shift());
          isAnimating.current = false;
        },
      });
    };

    const interval = setInterval(slideNext, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={Style.mainContainer}>
      <div className={Style.container}>
        <div className={Style.textContainer}>
          <div className={Style.text}>
            <h3>
              What Sets Us {window.screen.width <= 1023 ? "" : <br />} Apart
            </h3>
            <p className="paragraph-medium">
              What sets us apart goes beyond design —{" "}
              {window.screen.width <= 1024 ? "" : <br />} it’s our promise to
              it’s our commitment to deliver on time, on budget, and beyond
              expectations. We blend creativity and precision to elevate every
              inch of your space.
            </p>
          </div>

          <Button
            children={"Get Estimate"}
            className="btn-gradient-cta"
            onClick={() => navigate("/get-estimate")}
          />
        </div>

        <div className={Style.sliderContainer}>
          <div className={Style.cardsBox} ref={containerRef}>
            <SetUsApartCard
              className={"cards"}
              number={5}
              heading={"Trusted by 200+ Homeowners"}
              subtext={
                "With over 200 successful projects completed, we’ve built lasting client relationships through thoughtful design, expert execution, and beautiful spaces that truly feel like home."
              }
              ref={addToRefs}
            />
            <SetUsApartCard
              className={"cards"}
              number={1}
              heading={"Premium Design, Smart Budget"}
              subtext={
                "Luxury living shouldn’t be out of reach. We blend elegant, modern design with smart, efficient budgeting — no hidden costs, only high-quality finishes tailored to your unique needs."
              }
              ref={addToRefs}
            />
            <SetUsApartCard
              className={"cards"}
              number={2}
              heading={"Stress-Free, Start to Finish"}
              subtext={
                "Sit back and relax while we handle it all — from detailed planning to seamless execution. Our fully managed process ensures a smooth, worry-free journey to your perfect dream home."
              }
              ref={addToRefs}
            />
            <SetUsApartCard
              className={"cards"}
              number={3}
              heading={"On Time, Every Time"}
              subtext={
                "We deliver exactly as promised — on time, every time. Our strict no-delay policy ensures timely handovers, with unmatched quality and complete satisfaction guaranteed from day one."
              }
              ref={addToRefs}
            />
            <SetUsApartCard
              className={"cards"}
              number={4}
              heading={"Warranty You Can Trust"}
              subtext={
                "Every home includes a solid structural warranty, offering long-term peace of mind and a strong promise of enduring quality that stands the test of time."
              }
              ref={addToRefs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetUsApart;
