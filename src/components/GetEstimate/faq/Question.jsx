import React, { useEffect, useState } from "react";
import Styles from "./Question.module.css";
import { blockKeys } from "../../../utils/functions";

function EIcon() {
  return (
    <svg
      // width="24"
      className={Styles.svg}
      // height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        stroke="#E74C21"
        stroke-width="1.5"
      />
      <path
        d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
        stroke="#E74C21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.992 8H12.001"
        stroke="#E74C21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Question({
  setDesignQues,
  options,
  designAns,
  currentQuesIndex,
  id,
  handleNext,
}) {
  const [elementId, setElementId] = useState("");

  function handleChange(id, cat, label) {
    setDesignQues((p) => {
      const alreadyExist = p.some((i) => cat in i);
      if (!alreadyExist) {
        return [...p, { [cat]: { id, label } }];
      } else {
        const withUpdatedValue = p?.map((i) => {
          if (cat in i) {
            return { [cat]: { label, id } };
          }
          return i;
        });
        return withUpdatedValue;
      }
    });
  }

  console.log(options);

  const isIdPresent = (targetId) =>
    designAns.some((item) => {
      const key = Object.keys(item)[0];
      return item[key].id === targetId;
    });

  return (
    <div className={Styles.content}>
      <div className={Styles.ContentWrapper}>
        {options?.map((type, index) => {
          return (
            <div className={Styles.innerContent} key={index}>
              <div className={Styles.options}>
                <label title="item" className={Styles.label}>
                  <input
                    id={`option-${type._id}`}
                    onClick={
                      currentQuesIndex < 12
                        ? () => setTimeout(() => handleNext(), 200)
                        : null
                    }
                    onKeyDown={(e) => blockKeys(e)}
                    type="radio"
                    name="foo"
                    disabled={currentQuesIndex === id ? false : true}
                    style={
                      currentQuesIndex === id
                        ? { cursor: "pointer" }
                        : { cursor: "default" }
                    }
                    className={
                      isIdPresent(type?._id) ? Styles.selectedOptionClass : ""
                    }
                    onChange={() =>
                      setTimeout(
                        () =>
                          handleChange(type._id, type.category, type?.label),
                        200
                      )
                    }
                  />

                  <img alt="" />
                </label>

                <label
                  htmlFor={`option-${type._id}`}
                  className={Styles.optionsLabel}
                  onClick={() =>
                    handleChange(type._id, type.category, type?.label)
                  }
                >
                  {type.label}
                </label>
              </div>

              {type?.label !== "None" && (
                <div
                  className={Styles.icon}
                  onMouseEnter={() => setElementId(type?._id)}
                  onMouseLeave={() => setElementId("")}
                >
                  <EIcon />

                  {elementId === type?._id && (
                    <div className={Styles.hoverBox}>{type?.extraDetails}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
