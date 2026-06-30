import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Style.css"; // Assuming you have a CSS file for styling
import TestimonialsHome from "../../components/Testimonials/TestimonialHome/TestimonialsHome";
import TestimonialsPage from "../../components/Testimonials/TestimonialGridView/TestimonialsPage";
import TestimonialForm from "../../components/Testimonials/TestmonialForm/TestimonialForm";
import Footer from "../../components/Footer/Footer";

const Testimonials = () => {
  const formRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const scrollToForm = () => {
    // Same scroll logic as above
  };
  // useGSAP(() => {
  //   gsap.to("#test-page1", {

  //     scrollTrigger: {
  //       trigger: "#test-page1",
  //       start: "top 13%",
  //       end: "+=1000",
  //       pin: true,
  //     },
  //   });
  //   gsap.to("#test-page2", {

  //     scrollTrigger: {
  //       trigger: "#test-page2",
  //       start: "top -80%",
  //       end: "+=500",
  //       pin: true,
  //     },
  //   });

  //   gsap.to("#test-page3", {

  //     scrollTrigger: {
  //       trigger: "#test-page3",
  //       start: "10% top",
  //       end: "+=550",
  //       pin: true,

  //     },
  //   });

  // }, []);

  return (
    <div className="testimonials-page">
      <div id="test-page1">
        <TestimonialsHome onClick={scrollToForm} />
      </div>
      <div id="test-page2">
        <TestimonialsPage />
      </div>

      <div id="test-page3">
        <TestimonialForm ref={formRef} />
      </div>
    </div>
  );
};

export default Testimonials;
