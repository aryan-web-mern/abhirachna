import React from "react";
import style from "./FlatType.module.css";

const roomTypes = [
  "Studio Room",
  "1\nBHK",
  "2\nBHK",
  "3\nBHK",
  "4+\nBHK",
  "PENTHOUSE",
];

function FlatType({
  firstSelectAnimation,
  setAnswers,
  ref,
  answers,
  setSelectedAreaType,
}) {
  function handleChange(value) {
    setSelectedAreaType(value.replace(/[\n\s]/g, ""));
    let updatedVal = value;
    setAnswers((p) => {
      const alreadyExist = p.some((i) => i.ques_id === 0);
      if (!alreadyExist) {
        return [...p, { ques_id: 0, ans: updatedVal }];
      } else {
        const withUpdatedValue = p?.map((i) => {
          if (i.ques_id === 0) {
            return { ...i, ans: updatedVal };
          }
          return i;
        });
        return withUpdatedValue;
      }
    });
  }
  const activeState = answers?.find((i) => i.ques_id === 0)?.ans || false;
  return (
    <div className={style.flatType} ref={(el) => (ref.current[0] = el)}>
      <h5>Select Your Type</h5>
      <div className={style.bhkbox}>
        {roomTypes.map((room, index) => {
          return (
            <div
              key={index}
              className={`${style.roomCount} ${
                activeState
                  ? activeState === room
                    ? style.selectedBlock
                    : ""
                  : ""
              }`}
              onClick={(e) => {
                firstSelectAnimation(), handleChange(room);
              }}
            >
              {room.split("\n").map((line, i) => (
                <div key={i}>
                  {line}
                  {i !== room.split("\n").length - 1 && <br />}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FlatType;
