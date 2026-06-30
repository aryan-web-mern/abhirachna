import React from "react";
import Style from "./toast.module.css";
import successIcon from "../../../assets/toastSvgs/success.svg";
import errorIcon from "../../../assets/toastSvgs/error.svg";
import { useToast } from "../../../hooks/hooks";

const toastTypes = {
  success: {
    icon: successIcon,
    altText: "success",
  },
  error: {
    icon: errorIcon,
    altText: "error",
  },
};

function Toast({ type, heading, subtext, id }) {
  const { icon, altText } = toastTypes[type];

  const toast = useToast();

  function onClose() {
    toast.remove(id);
  }

  return (
    <div className={Style.toastContainer}>
      <div className={Style.innerContainer}>
        <div className={Style.msgBox}>
          <div className={Style.icon}>
            <img src={icon} alt={altText} />
          </div>
          <div
            className={`${Style.text} ${
              type === "error" ? Style.errorText : ""
            }`}
          >
            <label className="label-small">{heading}</label>
            <p className="paragraph-small">{subtext}</p>
          </div>
        </div>
        <div className={Style.crossIcon} onClick={onClose}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6654 1.33325L1.33203 10.6666M1.33203 1.33325L10.6654 10.6666"
              stroke="#3E0D0C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Toast;
