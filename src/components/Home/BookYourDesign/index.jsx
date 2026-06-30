import React, { useState } from "react";
import Comp1 from "./comp1/Comp1";
import styles from "../BookYourDesign/BookYourDesign.module.css";
import BookYourDesignForm from "./BookYourDesignForm";
import { validateName, validatePhoneNo } from "../../../utils/formValidation";
import { getErrorMessage } from "../../../utils/errorHandler";
import { postTestimonial } from "../../../services/testimonials";
import { scheduleMeeting } from "../../../services/supportService";
import moment from "moment";
import { useToast } from "../../../hooks/hooks";
import { getCurrentTimeZone } from "../../../utils/functions";

const BookYourDesign = () => {
  const toast = useToast();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selecetedDateTime, setSelectedDateTime] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  function handleDateTimeSelect(value, key) {
    setSelectedDateTime((p) => {
      if (p?.[key] === value) {
        return {
          ...p,
          [key]: "",
        };
      }
      return {
        ...p,
        [key]: value,
        ...(p?.date === null || "" || key === "date" ? { time: "" } : {}),
      };
    });
  }
  function checkTimeSelect() {
    if (selecetedDateTime?.time && selecetedDateTime?.date) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit() {
    const valid = checkTimeSelect();
    if (valid) {
      setSubmitError(null);
      setShowForm(true);
    } else {
      setSubmitError("Please Select Date and Time");
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleFormSubmit = () => {
    setFormErrors({
      name: "",
      phone: "",
      message: "",
    });

    if (!validateName(formData.name)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        name: "Provide a valid name!",
      }));
      return;
    }

    if (!validatePhoneNo(formData.phone)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        phone: "Provide a valid phone number!",
      }));
      return;
    }

    if (!formData.message.trim()) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        message: "Message is required!",
      }));
      return;
    }
    const dateAndTime =
      Object.values(selecetedDateTime)[0] +
      "," +
      Object.values(selecetedDateTime)[1];
    const parsed = moment(dateAndTime, "DD MMM,hh:mm A");

    const isoString = parsed.toISOString();
    async function scheduleUserMeeting() {
      setLoading(true);
      try {
        const res = await scheduleMeeting({
          ...formData,
          dateAndTime: isoString,
          customerTimeZone: getCurrentTimeZone(),
        });
        if (res.success) {
          toast.success(
            "Meeting Scheduled",
            "Your meeting has been scheduled successfully!"
          );
        }
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
        setSelectedDateTime(null);
        setShowForm(false);
      } catch (err) {
        setError(getErrorMessage(err));
        toast.error("Something went wrong!", err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    scheduleUserMeeting();
  };

  return (
    <div className={styles.mainConatiner}>
      {showForm ? (
        <BookYourDesignForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          handleSubmit={handleFormSubmit}
          loading={loading}
          error={error}
        />
      ) : (
        <Comp1
          selected={selecetedDateTime}
          setSelected={setSelectedDateTime}
          error={submitError}
          handleDateTimeSelect={handleDateTimeSelect}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default BookYourDesign;
