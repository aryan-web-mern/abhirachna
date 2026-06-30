import React from "react";
import Style from "./style.module.css";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/Contact/ContactForm/ContactForm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ContactUs() {
  //   useGSAP(() => {
  //   gsap.to("#contactpage-page1", {
  //     scrollTrigger: {
  //       trigger: "#contactpage-page2",
  //       start: "top 20%",
  //       end: "+=900",
  //       pin: true,
  //       pinSpacing: false,
  //       markers: true
  //     }
  //   });
  // });
  return (
    <div className={Style.contactUs} id="contactpage-page1">
      <ContactForm />
    </div>
  );
}

export default ContactUs;
