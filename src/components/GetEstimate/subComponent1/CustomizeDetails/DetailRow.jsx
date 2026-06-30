// DetailRow.jsx
import React from "react";
import Styles from"./CustomizeDetails.module.css";
import { handleKeyPress } from "../../../../utils/functions";

export default function DetailRow({ icon, label, count, onIncrement, onDecrement }) {
  return (
    <div className={Styles.detailRow}>
      <div className={Styles.detailLabel}>
        <img src={icon} alt="" className={Styles.icon}/>
       
        <p className={Styles.label}>{label}</p>
      </div>
      <div className={Styles.counter}>
        <button className={Styles.btn} onClick={onDecrement}  onKeyPress={handleKeyPress}>−</button>
        <label className={Styles.count}>{count}</label>
        <button className={Styles.btn} onClick={onIncrement}  onKeyPress={handleKeyPress}>+</button>
      </div>
    </div>
  );
}
