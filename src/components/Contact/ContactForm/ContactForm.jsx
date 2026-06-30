import React, { useState, useEffect } from "react";
import formStyles from "./contactform.module.css";
import PlaneAnimation from "../../ui/FormPlaneAnimation/PlaneAnimation";
import { validateName, validatePhoneNo } from "../../../utils/formValidation";
import Input from "../../ui/NormalInput/Input";
import Button from "../../ui/Button/Button";
import Otp from "../../ui/Otp/Otp";
import phone from "../../../assets/formSvg/phone.png";
import mail from "../../../assets/formSvg/mail.png";
import TextArea from "../../ui/TextAreaInput/TextArea";
import { sendSupportMsg } from "../../../services/supportService";
import { getErrorMessage } from "../../../utils/errorHandler";

import { useAuth } from "../../../AuthProvider/AuthContext";

import { useToast } from "../../../hooks/hooks";

function ContactForm() {
  const [otppage, setOtpPage] = useState(true);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { sendotp, resendotp, login, authUser } = useAuth();

  // const authUser = true;

  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });
  const [otp, setOtp] = useState([]);

  const [otpError, setOtpError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const handleFormSubmit = () => {
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
        message: "Message is required!",
      }));
      return;
    }

    //TODO: Hit Apis
    async function handleSendOTP() {
      if (!authUser) {
        const res = await sendotp(formData.phoneNumber);

        // if(res?.success){
        //   toast.success("OTP", "otp sent!")
        // }
      }

      if (authUser) {
        const res = await sendSupportMsg(formData);

        if (res)
          toast.success(
            "Submit Successful",
            "Congratulations, your form is submitted!"
          );

        setFormData({
          name: "",
          phoneNumber: "",
          message: "",
        });
        setOtp([]);
        setOtpPage(true);
        setAnimationPlaying(true);
      }
    }

    handleSendOTP();
    setOtpPage(false);
  };

  const handleVerifyOtp = () => {
    setOtpError("");

    if (!otp?.[0]) {
      setOtpError("Enter a otp!");
      return;
    }

    if (otp.join("").length < 4) {
      setOtpError("Enter a valid Otp!");
      return;
    }

    const OTP = otp.join("");
    //TODO: hit Api
    async function postJobForm() {
      setLoading(true);
      try {
        const loginRes = await login(
          { name: formData.name, phoneNumber: formData.phoneNumber },
          OTP
        );

        if (loginRes?.success) {
          const res = await sendSupportMsg(formData);

          if (res)
            toast.success(
              "Submit Successful",
              "Congratulations, your form is submitted!"
            );

          setFormData({
            name: "",
            phoneNumber: "",
            message: "",
          });
          setOtp([]);
          setOtpPage(true);
          setAnimationPlaying(true);
        }
      } catch (err) {
        toast.error("Something went wrong!", err.response.data.message);
        return setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    postJobForm();
  };

  useEffect(() => {
    const listener = async (event) => {
      const active = document.activeElement;

      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          otppage &&
          formData.name &&
          formData.phoneNumber &&
          formData.message &&
          active.type !== "textarea"
        ) {
          handleFormSubmit();
        } else if (otp.length > 0) {
          handleVerifyOtp();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formData, otppage, otp]);

  function addPlaneAnimation() {
    setAnimationPlaying(true);
    setFormData({
      name: "",
      phoneNumber: "",
      message: "",
    });
    setOtpPage(true);
  }

  return (
    <div className={formStyles.mainContainer}>
      {animationPlaying ? (
        <PlaneAnimation setAnimationPlaying={setAnimationPlaying} />
      ) : (
        <div className={formStyles.formContainer}>
          <div className={formStyles.leftContainer}>
            <div className={formStyles.formHeader}>
              <h3>Let’s Create Something Beautiful Together</h3>
              <p className="paragraph-medium">
                Have a design idea in mind or need expert guidance? Whether it’s
                a question, a vision, or a challenge — the Abhirachnaa team is
                just a message away. We’re here to listen, support, and turn
                your dream space into reality.
              </p>
            </div>

            <div className={formStyles.formFooter}>
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

          {otppage ? (
            <form
              className={formStyles.rightContainer}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={formStyles.inputs}>
                <Input
                  label={"Full name"}
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required={true}
                  limit={50}
                  error={formErrors.name}
                />
                <Input
                  label={"Phone Number"}
                  type="number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required={true}
                  limit={10}
                  error={formErrors.phoneNumber}
                />
                <TextArea
                  label={"Message"}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required={true}
                  error={formErrors.message}
                />
              </div>

              <div className={formStyles.btnContainer}>
                <Button onClick={handleFormSubmit}>Send Message</Button>
              </div>
            </form>
          ) : authUser ? (
            addPlaneAnimation()
          ) : (
            <form
              className={formStyles.rightContainer}
              onSubmit={(e) => {
                e.preventDefault();
                // handleVerifyOtp();
              }}
            >
              <Otp
                phoneNumber={formData.phoneNumber}
                otps={setOtp}
                resendOtp={resendotp}
                error={otpError}
                setError={setOtpError}
              />
              <div className={formStyles.btnContainer}>
                <Button
                  children={loading ? "verifying" : "Verify & Send"}
                  onClick={handleVerifyOtp}
                  type="submit"
                />
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactForm;
