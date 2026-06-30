import React, { useEffect, useRef, useState } from "react";
import InputStyles from "./input.module.css";
import search from "../../../assets/icons/search.svg";

function Input({ label, type, error, value, required, limit, ...props }) {
  // const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    if (type === "number") {
      const numericValue = e.target.value;

      if (numericValue === "") {
        if (props.onChange) props.onChange(e);
        return;
      }

      const isValidNumber = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(
        numericValue
      );

      if (isValidNumber) {
        if (limit && numericValue.replace(/[^0-9]/g, "").length > limit) {
          return;
        }

        if (props.onChange) {
          props.onChange(e);
        } else {
          e.target.value = value || "";
        }
      } else {
        if (props.onChange) props.onChange(e);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (type === "number") {
      const allowedKeys = {
        // Your existing allowed keys
        8: true, // backspace
        9: true, // tab
        13: true, // enter
        37: true, // left arrow
        39: true, // right arrow
        46: true, // delete
        190: true, // .
        69: false, // explicitly block 'e'
        187: true, // +(plus)
        107: true, // +(num pad plus)
      };

      if (allowedKeys[e.keyCode] !== undefined) {
        if (!allowedKeys[e.keyCode]) {
          e.preventDefault();
          return false;
        }
        return true;
      }

      if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) {
        return true;
      }

      if (
        (e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
        return false;
      }

      if (limit && e.target.value.length >= limit) {
        e.preventDefault();
        return false;
      }
    }
  };

  const isActive = isFocused || value?.length > 0 || props.defaultValue;
  const typed = isFocused === false && value?.length > 0;

  return (
    <div className={InputStyles.mainContainer}>
      <div
        className={`${InputStyles.container} ${
          error ? InputStyles.errorBorder : ""
        } ${value ? InputStyles.haveValue : ""} ${props?.classNames}`}
        style={props.style}
      >
        <div className={InputStyles.inputWrapper}>
          <input
            type={type === "number" ? "text" : type}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={InputStyles.floatingInput}
            required={required}
            maxLength={limit}
            inputMode={type === "number" ? "numeric" : undefined}
            onKeyDown={type === "number" ? (e) => handleKeyDown(e) : () => {}}
            {...(type !== "number" && { maxLength: limit })}
            {...props}
          />
          <div className="search-Icon-jobs-list">
            {props?.placeholder && <img src={search} alt="" />}
          </div>
          <label
            className={`${InputStyles.floatingLabel} 
              ${isActive ? `${InputStyles.active}` : ""} 
              ${typed ? InputStyles.typed : ""} 
              ${error ? InputStyles.errortext : ""}
              `}
          >
            {label}
            {required ? "*" : ""}
          </label>
        </div>
      </div>
      {error && <span className={InputStyles.error}>{error}</span>}
    </div>
  );
}

export default Input;
