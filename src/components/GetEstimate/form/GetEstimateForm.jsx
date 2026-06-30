import React, { useState, useEffect, useRef } from "react";
import Input from "../../ui/NormalInput/Input";
import styles from "./GetEstimateForm.module.css";
import TextArea from "../../ui/TextAreaInput/TextArea";
import Button from "../../ui/Button/Button";
import { validateName, validatePhoneNo } from "../../../utils/formValidation";

function GetEstimateForm({ sendEstimateForm, formData, setFormData }) {
  const [formErrors, setFormErrors] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const lastSubmitTime = useRef(0);

  const handleFormSubmit = () => {
    const now = Date.now();
    if (now - lastSubmitTime.current < 1000) {
      return;
    }
    lastSubmitTime.current = now;
    setFormErrors({
      name: "",
      phoneNumber: "",
      message: "",
    });

    if (!validateName(formData.name)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        name: "Provide a valid name!",
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

    if (!formData.message.trim()) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        message: "Address is required!",
      }));
      return;
    }

    sendEstimateForm(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({
      name: "",
      phoneNumber: "",
      message: "",
    });
  };

  useEffect(() => {
    const listener = (event) => {
      const active = document.activeElement;
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          formData.name &&
          formData.phoneNumber &&
          formData.message &&
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
    <div className={styles.centerdata}>
      <div className={styles.heading}>
        <h2 className={styles.headingLarger}>
          Your estimate is ready! Where should we send it?
        </h2>
        <p className={`${styles.paragraphMedium} ${styles.headingSmaller}`}>
          Just share a few quick details so we can deliver your personalized
          estimate straight to you.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className={styles.mainformContext}
      >
        <div className={styles.mainContextInput}>
          <Input
            label={"Full name"}
            type="text"
            name={"name"}
            value={formData.name}
            onChange={handleInputChange}
            required={true}
            limit={50}
            error={formErrors.name}
          />
          <Input
            label={"Phone Number"}
            type="number"
            name={"phoneNumber"}
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required={true}
            limit={10}
            error={formErrors.phoneNumber}
          />
          <TextArea
            label={"Address"}
            value={formData.message}
            name={"message"}
            onChange={handleInputChange}
            required={true}
            error={formErrors.message}
          />
        </div>
        <div className={styles.btn1}>
          <Button
            className={styles.ButtonContainer}
            onClick={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            Get Estimate
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GetEstimateForm;
