import { useState } from "react";
import styles from "./CircleButton.module.css";

const CircleButton = ({
  src,
  name,
  direction,
  handleClick = null,
  selected,
  className = "",
}) => {
  const [showText, setShowText] = useState(false);
  // const [selected, setSelected] = useState(false);
  return (
    <button
      className={`${styles.circleBtn} ${styles[direction]} ${
        showText ? styles.expanded : ""
      } ${selected ? styles.selected : ""} ${className}`}
      onMouseOver={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      {direction === "left" && <h5 className={styles.btnText}>{name}</h5>}
      <img src={src} />
      {direction === "right" && <h5 className={styles.btnText}>{name}</h5>}
    </button>
  );
};

export default CircleButton;
