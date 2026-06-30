import React, { useEffect, useRef } from "react";
import otpStyles from "./otp.module.css";
import { useState } from "react";

function Otp({ phoneNumber, otps, resendOtp, className, error, setError }) {
  const [isError, setIsError] = useState("");
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [counter, setIsCounter] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    handleResendOTP();
  }, []);

  useEffect(() => {
    setIsError(error);
  }, [error]);

  useEffect(() => {
    let interval;

    // Countdown timer
    if (counter > 0) {
      interval = setInterval(() => {
        setIsCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }

    // Focus/blur handlers setup
    const handleFocus = (e) => {
      const parent = e.target.parentElement;
      if (parent) {
        parent.classList.add("focused");
        parent.classList.remove("blurred");
      }
    };

    const handleBlur = (e) => {
      const value = e.target.value.trim();
      const parent = e.target.parentElement;

      if (parent) {
        parent.classList.remove("focused");

        // if (value !== '') {
        //   parent.classList.add('blurred');
        // } else {
        //   parent.classList.remove('blurred');
        // }
      }
    };

    // Add listeners
    inputRefs.current.forEach((input) => {
      if (!input) return;
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    // Cleanup
    return () => {
      clearInterval(interval);
      inputRefs.current.forEach((input) => {
        if (!input) return;
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [counter, isResendDisabled, otp]);

  const handleResendOTP = () => {
    setIsCounter(30);
    setIsResendDisabled(true);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    setIsError(undefined);
    setError(undefined);
    if (resendOtp) {
      resendOtp(phoneNumber);
    }
  };

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      otps(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={`${otpStyles.otpContainer} ${className}`}>
      <p className={`${otpStyles.heading} paragraph-large`}>Enter OTP</p>
      <div className={otpStyles.otps}>
        {otp.map((digit, index) => (
          <div
            className={`${otpStyles.otp} ${isError && otpStyles.error} ${
              otp[index] !== "" ? otpStyles.haveValue : ""
            }`}
            key={index}
          >
            <input
              type="text"
              value={digit}
              maxLength={1}
              inputMode="numeric"
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          </div>
        ))}
      </div>
      <div className={otpStyles.textContainer}>
        {isError ? (
          <p className={`${otpStyles.error} paragraph-small`}>{isError}</p>
        ) : (
          <p className={`${otpStyles.text} paragraph-small`}>
            A verification code has need to your phone{" "}
            {phoneNumber.length > 10 ? "" : "+91"}
            {phoneNumber}
          </p>
        )}
        <button
          className={`${
            isResendDisabled ? otpStyles.resendDis : otpStyles.resend
          }  paragraph-small`}
          disabled={isResendDisabled}
          onClick={handleResendOTP}
        >
          {isResendDisabled ? `Resend in ${formatTime(counter)}` : "Resend"}
        </button>
      </div>
    </div>
  );
}

export default Otp;
