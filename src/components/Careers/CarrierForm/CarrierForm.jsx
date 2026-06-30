import React, { useEffect, useRef, useState } from "react";
import FormStyle from "./carrierform.module.css";
import mailsvg from "../../../assets/formSvg/mail.png";
import phonesvg from "../../../assets/formSvg/phone.png";
import Input from "../../ui/NormalInput/Input";
import FileInput from "../../ui/FIleInput/FileInput";
import Button from "../../ui/Button/Button";
import {
  validateEmail,
  validatePhoneNo,
  validateName,
  validatePdfFile,
} from "../../../utils/formValidation";
import { getErrorMessage } from "../../../utils/errorHandler";
import { applyJob } from "../../../services/careerService";

import { useToast } from "../../../hooks/hooks";

function CarrierForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    role: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    contact: "",
  });

  const [selectedFile, setSelectedFile] = useState(undefined);
  const [fileError, setFileError] = useState("");

  const lastSubmitRef = useRef(0);

  const throttle = (func, limit = 1000) => {
    return (...args) => {
      const now = Date.now();
      if (now - lastSubmitRef.current >= limit) {
        func(...args);
        lastSubmitRef.current = now;
      }
    };
  };

  const throttledSubmit = throttle(() => handleFormSubmit(), 1000);

  const handleFormSubmit = () => {
    setFormErrors({ fullName: "", email: "", contact: "", role: "" });
    setFileError("");

    if (!validateName(formData.fullName)) {
      setFormErrors((prev) => ({ ...prev, fullName: "Provide a valid name!" }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Provide a valid email address!",
      }));
      return;
    }
    if (!validatePhoneNo(formData.contact)) {
      setFormErrors((prev) => ({
        ...prev,
        contact: "Provide a valid contact number!",
      }));
      return;
    }
    if (!validatePdfFile(selectedFile)) {
      if (!selectedFile) setFileError("File is not selected!");
      else setFileError("File must be in pdf format!");
      return;
    }

    const NewFormData = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      NewFormData[key] = value;
    }
    NewFormData["resume"] = selectedFile;

    async function postJobForm() {
      setLoading(true);
      try {
        const res = await applyJob(NewFormData);
        if (res.success) {
          setFormData({ fullName: "", email: "", contact: "", role: "" });
          setSelectedFile("");
          toast.success(
            "Submit Successful",
            "Congratulations, your form is submitted!"
          );
        }
      } catch (err) {
        toast.error("Something went wrong!", err.response?.data?.message);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    postJobForm();
  };

  useEffect(() => {
    const listener = (event) => {
      const active = document.activeElement;

      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          formData.fullName &&
          formData.email &&
          formData.contact &&
          selectedFile &&
          active.type !== "file"
        ) {
          throttledSubmit();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formData, selectedFile]);

  return (
    <div className={FormStyle.mainContainer}>
      <div className={FormStyle.container}>
        <div className={FormStyle.leftSection}>
          <div className={FormStyle.infoContainer}>
            <h3>Want to Work with Us?</h3>
            <p className="paragraph-medium">
              Send us your resume and we’ll connect when there’s a good fit.
            </p>
          </div>

          <div className={FormStyle.infoContainer}>
            <div className={FormStyle.contacts}>
              <img src={phonesvg} alt="Phone" />
              <label className="label-medium">
                <a href="tel:+917341102563">+91 7341102563</a>
              </label>
            </div>
            <div className={FormStyle.contacts}>
              <img src={mailsvg} alt="Mail" />
              <label className="label-medium">
                <a href="mailto:sales@abhirachnaa.com">
                  sales@abhirachnaa.com
                </a>
              </label>
            </div>
          </div>
        </div>

        <form
          className={FormStyle.rightSection}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label={"Full Name"}
            type="text"
            value={formData.fullName}
            required={true}
            error={formErrors.fullName}
            limit={50}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <Input
            label={"Email ID"}
            type="email"
            value={formData.email}
            required={true}
            error={formErrors.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label={"Contact Number"}
            type="number"
            value={formData.contact}
            error={formErrors.contact}
            required={true}
            limit={10}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
          <Input
            label={"Preferred Department/Role"}
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <FileInput
            label={"Resume"}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            required={true}
            error={fileError}
          />

          <div className={FormStyle.carrierBtnContainer}>
            <Button
              children={loading ? "Sending..." : "Send Message"}
              onClick={throttledSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarrierForm;
