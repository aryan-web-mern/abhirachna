import React, { useEffect, useState, useRef } from "react";
import CarrierFormStyles from "./carrierjobform.module.css";
import Input from "../../ui/NormalInput/Input";
import FileInput from "../../ui/FIleInput/FileInput";
import Button from "../../ui/Button/Button";
import CircleButton from "../../ui/CircleButton/CircleButton";
import arrow from "../../../assets/Frame.svg";
import mail from "../../../assets/formSvg/mail.png";
import phone from "../../../assets/formSvg/phone.png";
import pin from "../../../assets/carrierSvgs/pin.png";
import calendar from "../../../assets/carrierSvgs/calendar.png";
import clock from "../../../assets/carrierSvgs/clock.png";
import {
  validateEmail,
  validatePhoneNo,
  validateName,
  validatePdfFile,
} from "../../../utils/formValidation";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorHandler";
import { applyJob, getJobDetails } from "../../../services/careerService";

import { useToast } from "../../../hooks/hooks";

function CarrierJobForm() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(undefined);
  const [jobDetails, setJobDetails] = useState(null);
  const { id } = useParams();

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    contact: "",
  });
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const submissionInProgress = useRef(false);
  const lastSubmitTime = useRef(0);
  const abortController = useRef(null);

  useEffect(() => {
    async function getJobData() {
      setLoading(true);
      try {
        const data = await getJobDetails(id);
        setJobDetails(data?.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getJobData();
  }, []);

  const handleFormSubmit = async () => {
    if (isSubmitting || submissionInProgress.current) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime.current < 1000) {
      return;
    }
    lastSubmitTime.current = now;

    if (abortController.current) {
      abortController.current.abort();
    }

    setIsSubmitting(true);
    submissionInProgress.current = true;

    try {
      setFormErrors({
        fullName: "",
        email: "",
        contact: "",
      });
      setFileError("");

      if (!validateName(formData.fullName)) {
        setFormErrors((formErrors) => ({
          ...formErrors,
          fullName: "Provide a valid name!",
        }));
        return;
      }

      if (!validateEmail(formData.email)) {
        setFormErrors((formErrors) => ({
          ...formErrors,
          email: "Provide a valid email address!",
        }));
        return;
      }

      if (!validatePhoneNo(formData.contact)) {
        setFormErrors((formErrors) => ({
          ...formErrors,
          contact: "Provide a valid phone number!",
        }));
        return;
      }

      if (!validatePdfFile(resumeFile)) {
        if (!resumeFile) setFileError("File is not selected!");
        else setFileError("File must be in pdf format!");
        return;
      }

      const NewFormData = new FormData();
      for (let [key, value] of Object.entries(formData)) {
        NewFormData[key] = value;
      }
      NewFormData["resume"] = resumeFile;
      NewFormData["jobId"] = id;

      abortController.current = new AbortController();

      setLoading(true);

      const data = await applyJob(NewFormData, {
        signal: abortController.current.signal,
      });

      setFormData({
        fullName: "",
        email: "",
        contact: "",
      });
      setResumeFile("");

      toast.success(
        "Submit Successful",
        "Congratulations, your resume is sent successfully!"
      );
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }

      toast.error(
        "Something went wrong!",
        err.response?.data?.message || err.message
      );
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      submissionInProgress.current = false;
      abortController.current = null;
    }
  };

  function handleBack() {
    navigate("/job-list");
  }

  useEffect(() => {
    const listener = async (event) => {
      const active = document.activeElement;
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          formData.fullName &&
          formData.email &&
          formData.contact &&
          active.type !== "file"
        ) {
          event.preventDefault();
          handleFormSubmit();
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [resumeFile, formData, isSubmitting]);

  return (
    <div className={CarrierFormStyles.mainContainer}>
      <div
        className={CarrierFormStyles.carrierFormContainer}
        onSubmit={(e) => e.preventDefault()}
      >
        <CircleButton
          direction={"right"}
          src={arrow}
          name={"Back"}
          handleClick={handleBack}
        />
        <div className={CarrierFormStyles.carrierMainContainer}>
          <div className={CarrierFormStyles.carrierLeft}>
            <div className={CarrierFormStyles.carrierHeader}>
              <h3>{jobDetails?.jobTitle}</h3>
              <p className="paragraph-medium">
                <img src={pin} /> {jobDetails?.jobLocation}
              </p>
              <p className="paragraph-medium">
                <img src={clock} /> Full-time
              </p>
              <p className="paragraph-medium">
                <img src={calendar} /> {jobDetails?.experience}
              </p>
            </div>
            <div className={CarrierFormStyles.carrierFooter}>
              <div className={CarrierFormStyles.carrierContactDetails}>
                <img src={phone} alt="" />
                <label className="label-medium">
                  <a href="tel:+917341102563">+91 7341102563</a>
                </label>
              </div>
              <div className={CarrierFormStyles.carrierContactDetails}>
                <img src={mail} alt="" />
                <label className="label-medium">
                  <a href="mailTo:sales@abhirachnaa.com">
                    sales@abhirachnaa.com
                  </a>
                </label>
              </div>
            </div>
          </div>

          <form className={CarrierFormStyles.carrierRight}>
            <Input
              label={"Full Name"}
              required={true}
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              limit={50}
              error={formErrors.fullName}
              disabled={isSubmitting}
            />
            <Input
              label={"Email"}
              required={true}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={formErrors.email}
              disabled={isSubmitting}
            />
            <Input
              label={"Contact"}
              required={true}
              type="number"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              limit={10}
              error={formErrors.contact}
              disabled={isSubmitting}
            />
            <FileInput
              label={"Resume"}
              required={true}
              type="application/pdf"
              selectedFile={resumeFile}
              setSelectedFile={setResumeFile}
              error={fileError}
              disabled={isSubmitting}
            />

            <div className={CarrierFormStyles.carrierBtnContainer}>
              <Button
                children={
                  isSubmitting
                    ? "Submitting..."
                    : loading
                    ? "Loading..."
                    : "Send Resume"
                }
                onClick={handleFormSubmit}
                disabled={isSubmitting || loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CarrierJobForm;
