import React, { useState } from "react";
import Style from "./textarea.module.css";

function TextArea({ label, error, value, required, limit, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isActive = isFocused || value?.length > 0;
  const typed = isFocused === false && value?.length > 0;

  return (
    <div className={Style.mainContainer}>
      <div
        className={`${Style.textAreaContainer} ${
          error ? Style.errorBorder : ""
        } ${value ? Style.haveValue : ""}`}
      >
        <div className={Style.textWrapper}>
          <div className={Style.textareabox}>
            <textarea
              className={Style.textArea}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              maxLength={limit}
              value={value}
              {...props}
            ></textarea>
          </div>
          <label
            className={`${Style.floatingLabel} ${isActive ? Style.active : ""} 
            ${typed ? Style.typed : ""} 
            ${error ? Style.errortext : ""}
            `}
          >
            {label}{required ? "*" : ""}
          </label>
        </div>
      </div>
      {error && <span className={Style.error}>{error}</span>}
    </div>
  );
}

export default TextArea;
