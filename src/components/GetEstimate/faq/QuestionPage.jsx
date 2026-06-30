import React from "react";
import Question from "./Question";
import Styles from "./QuestionPage.module.css";
import { getEstQueSerial } from "../../../utils/dataSet";
// const heading = [
//   { label: "Flooring Work" },
//   { label: "Wall Tiles Work " },
//   { label: "Door & Windows" },
//   { label: "False Ceiling Work" },
//   { label: "Electrical Work k" },
//   { label: "Wooden Work" },
//   { label: "Wall Treatments" },
//   { label: "Paint Work " },
//   { label: "Plumbing & Sanitory Work " },
//   { label: "Decore / Curtains" },
// ];

function QuestionPage({
  ref,
  setDesignQues,
  currentQuesIndex,
  getEstimateQue,
  designAns,
  handleNext,
  setFormVisible,
}) {
  return (
    <div
      className={`${Styles.content} ${
        currentQuesIndex > 2 ? Styles.setViewtrue : Styles.setViewfalse
      }`}
    >
      {getEstQueSerial.map((key, i) => {
        return (
          <React.Fragment key={i}>
            <div
              className={`${Styles.outer} ${i === 0 ? "" : Styles.setPosition}`}
              ref={(el) => (ref.current[i + 3] = el)}
            >
              <div className={Styles.QuesHead}>{key}</div>
              <Question
                currentQuesIndex={currentQuesIndex}
                setDesignQues={setDesignQues}
                id={i + 3}
                options={getEstimateQue?.[key]?.[0]?.items}
                designAns={designAns}
                handleNext={handleNext}
                setFormVisible={setFormVisible}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default QuestionPage;
