import React from "react";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  disable= false,
  ...rest
}) => {
  return (
    <button
      disabled={disable}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
