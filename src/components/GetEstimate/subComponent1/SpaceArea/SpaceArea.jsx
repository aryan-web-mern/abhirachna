import React, { useEffect, useState } from "react";
import Styles from "./spaceArea.module.css";
import { apartmentSizeRanges } from "../../../../utils/dataSet";

function SpaceArea({ ref, answers, setAnswers, selectedAreaType, handleNext }) {
  function handleChange(e) {
    const selectedValue = e.target.value;
    setAnswers((p) => {
      const alreadyExist = p.some((i) => i.ques_id === 2);
      if (!alreadyExist) {
        return [...p, { ques_id: 2, ans: selectedValue }];
      } else {
        const withUpdatedValue = p?.map((i) => {
          if (i.ques_id === 2) {
            return { ...i, ans: selectedValue };
          }
          return i;
        });
        return withUpdatedValue;
      }
    });
  }

  // custom handleNext function on radio buttons
  useEffect(() => {
    if (answers.length === 3) {
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  }, [answers]);

  return (
    <div
      className={Styles.customizeWrapper}
      ref={(el) => (ref.current[2] = el)}
    >
      <h5>Choose Your Carpet Area</h5>
      <div className={Styles.content}>
        {apartmentSizeRanges?.[selectedAreaType]?.map((item, index) => (
          <div key={index} className={Styles.detailRow}>
            <input
              className={Styles.input}
              type="radio"
              id={item.id}
              name="area"
              value={item.value}
              onChange={handleChange} // <-- this is enough
            />
            <label htmlFor={item.id} className={Styles.label}>
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaceArea;
