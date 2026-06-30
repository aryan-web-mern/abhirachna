import React, { useEffect, useRef, useState } from "react";
import formStyles from "./testimonialform.module.css";
import phone from "../../../assets/formSvg/phone.png";
import mail from "../../../assets/formSvg/mail.png";
import Input from "../../ui/NormalInput/Input";
import Button from "../../ui/Button/Button";
import FileInput from "../../ui/FIleInput/FileInput";
import {
  validateEmail,
  validatePhoneNo,
  validateName,
  validateImageAndVideoFile,
} from "../../../utils/formValidation";
import TextArea from "../../ui/TextAreaInput/TextArea";

import TestimonialFormAnimation from "./TestimonialFormAnimation";
import gsap from "gsap";
import { postTestimonial } from "../../../services/testimonials";
import { getErrorMessage } from "../../../utils/errorHandler";

import { useToast } from "../../../hooks/hooks";

function TestimonialForm() {
  const [animatioPlaying, setAnimationPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const compRef = useRef();

  const [fileSelected, setFileSelected] = useState(undefined);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    // email: "",
    text: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    phoneNumber: "",
    // email: "",
  });

  const [fileError, setFileError] = useState("");

  const handleFormSubmit = () => {
    // setting errors false
    setFormErrors({
      fullName: "",
      phoneNumber: "",
    });
    setFileError("");

    if (!validateName(formData.fullName)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        fullName: "Provide a valid name!",
      }));
      return;
    }
    if (!validatePhoneNo(formData.phoneNumber)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        phoneNumber: "Provide a valid phone number!",
      }));
      return;
    }

    if (!formData.text.trim()) {
      if (!fileSelected) {
        toast.error(
          "Field is Required!",
          "Testimonial text or file is required!"
        );
        return;
      }
    }

    const setFormData = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      setFormData[key] = value;
    }

    let typ_of_file = fileSelected?.type;
    if (typ_of_file?.includes("image")) setFormData["image"] = fileSelected;
    if (typ_of_file?.includes("video")) setFormData["video"] = fileSelected;
    setFormData["email"] = "default@gmail.com";
    async function saveTestimonial() {
      setLoading(true);
      try {
        await postTestimonial(setFormData);
        setafterSubmitState();
        toast.success(
          "Testimonial Uploaded",
          "Your testimonial is uploaded successfully!"
        );
      } catch (err) {
        setError(getErrorMessage(err));
        console.log({ err });

        toast.error("Something went wrong!", err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    saveTestimonial();
  };

  function setafterSubmitState() {
    const container = document.getElementById("testContainer");
    gsap.to(container, {
      duration: 0.5,
      scrollTop: container.scrollHeight - container.clientHeight,
      ease: "power2.inOut",
    });

    setFormData({
      fullName: "",
      phoneNumber: "",
      // email: "",
      text: "",
    });

    setFileSelected(undefined);

    setAnimationPlaying(true);

    setTimeout(() => {
      compRef.current.style.display = "none";
    }, 1300);
  }

  useEffect(() => {
    const listener = async (event) => {
      const active = document.activeElement;
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          formData.fullName &&
          formData.phoneNumber &&
          active.type !== "textarea"
        ) {
          handleFormSubmit();
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formData]);

  return (
    <div className={formStyles.mainContainer} id="testimonailForm">
      <div className={`${formStyles.container}`} id="testContainer">
        <div className={formStyles.testmonialFormContainer} ref={compRef}>
          <div className={formStyles.testmonialLeftContainer}>
            <div className={formStyles.testmonialHeader}>
              <h3>Share Your Abhirachnaa Experience</h3>
              <p className="paragraph-medium">
                Every space we design reflects a unique story — yours. If we’ve
                helped shape your dream home, we’d love to hear how it made a
                difference.
              </p>
            </div>

            <div className={formStyles.testmonialFooter}>
              <div>
                <img src={phone} alt="Phone" />
                <label className="label-medium">
                  <a href="tel:+917341102563">+91 7341102563</a>
                </label>
              </div>

              <div>
                <img src={mail} alt="Mail" />
                <label className="label-medium">
                  <a href="mailto:sales@abhirachnaa.com">
                    sales@abhirachnaa.com
                  </a>
                </label>
              </div>
            </div>
          </div>

          <form
            className={formStyles.testmonialRight}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={formStyles.testmonialRightContainer}>
              <Input
                label={"Full Name"}
                type="text"
                required={true}
                value={formData.fullName}
                error={formErrors.fullName}
                limit={50}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <Input
                label={"Phone Number"}
                type="number"
                required={true}
                value={formData.phoneNumber}
                error={formErrors.phoneNumber}
                limit={10}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              <TextArea
                label={"Testimonial Text"}
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
              />
              <FileInput
                label={"Image/Video"}
                fileType="image/*,video/*"
                selectedFile={fileSelected}
                error={fileError}
                setSelectedFile={setFileSelected}
              />
            </div>
            <div className={formStyles.testimonialBtnContainer}>
              {/* {error && <p className="error-msg">{error}</p>} */}
              <Button
                children={loading ? "Submitting..." : "Submit Review"}
                onClick={handleFormSubmit}
                disable={loading ? true : false}
              />
            </div>
          </form>
        </div>

        <TestimonialFormAnimation />
      </div>
    </div>
  );
}

export default TestimonialForm;
