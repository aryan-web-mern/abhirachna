import React, { useEffect, useRef, useState } from "react";
import AboutFormStyle from "./aboutform.module.css";
import phone from "../../../assets/formSvg/phone.png";
import mail from "../../../assets/formSvg/mail.png";
import Input from "../../ui/NormalInput/Input";
import { validateName, validatePhoneNo } from "../../../utils/formValidation";
import Otp from "../../ui/Otp/Otp";
import { Form, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import PlaneAnimation from "../../ui/FormPlaneAnimation/PlaneAnimation";
import TextArea from "../../ui/TextAreaInput/TextArea";
import { sendSupportMsg } from "../../../services/supportService";
import { useAuth } from "../../../AuthProvider/AuthContext";
import { useToast } from "../../../hooks/hooks";

function AboutForm() {
  const toast = useToast();
  const { sendotp, resendotp, login, authUser } = useAuth();

  // const authUser = false;

  const [otppage, setOtpPage] = useState(true);
  const navigate = useNavigate();
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        phoneNumber: "Provide a valid phoneNumber number!",
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

    async function postJobForm() {
      setLoading(true);
      try {
        const loginRes = await login(
          { name: formData.name, phoneNumber: formData.phoneNumber },
          OTP
        );

        if (loginRes?.success) {
          const res = await sendSupportMsg(formData);
          setFormData({
            name: "",
            phoneNumber: "",
            message: "",
          });
          toast.success("Form submitted", "Your form is sent successfully!");
          setOtp([]);
          setOtpPage(true);
          setAnimationPlaying(true);
        }
      } catch (err) {
        // toast.error("Something went wrong!", err.response.data.message);
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
  }, [formData, otp]);

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
    <div className={AboutFormStyle.mainContainer}>
      {animationPlaying ? (
        <PlaneAnimation setAnimationPlaying={setAnimationPlaying} />
      ) : (
        <div className={AboutFormStyle.formContainer}>
          <div className={AboutFormStyle.leftContainer}>
            <div className={AboutFormStyle.formHeader}>
              <h3>Let’s Talk</h3>
              <p className="paragraph-medium">
                If you have questions about your project, our services, we are
                here for you, friendly, responsive, and ready to assist. Get in
                touch with us today!
              </p>
            </div>

            <div className={AboutFormStyle.formFooter}>
              <div>
                <img src={phone} alt="Phone" />
                <label className="label-medium">
                  <a href="tel:+917341102563">+91 7341102563</a>
                </label>
              </div>

              <div>
                <img src={mail} alt="Mail" />

                <label className="label-medium">
                  <a href="mailTo:sales@abhirachnaa.com">
                    sales@abhirachnaa.com
                  </a>
                </label>
              </div>
            </div>
          </div>

          {otppage ? (
            <form
              className={AboutFormStyle.rightContainer}
              onSubmit={(e) => {
                e.preventDefault();
                // handleFormSubmit();
              }}
            >
              <div className={AboutFormStyle.inputs}>
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

              <div className={AboutFormStyle.btnContainer}>
                <Button onClick={handleFormSubmit} type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          ) : authUser ? (
            addPlaneAnimation()
          ) : (
            <form
              className={AboutFormStyle.rightContainer}
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
              <div className={AboutFormStyle.btnContainer}>
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

export default AboutForm;
