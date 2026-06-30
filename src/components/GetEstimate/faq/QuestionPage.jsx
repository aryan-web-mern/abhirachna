import React from "react";
import Question from "./Question";
import Styles from "./QuestionPage.module.css";

function QuestionPage({
  ref,
  setDesignQues,
  currentQuesIndex,
  designCategories,
  designOptionsByCategory,
  designAns,
  handleNext,
  lastDesignQuesIndex,
}) {
  return (
    <div
      className={`${Styles.content} ${
        currentQuesIndex > 2 ? Styles.setViewtrue : Styles.setViewfalse
      }`}
    >
      {designCategories.map((category, i) => {
        return (
          <React.Fragment key={category}>
            <div
              className={`${Styles.outer} ${i === 0 ? "" : Styles.setPosition}`}
              ref={(el) => (ref.current[i + 3] = el)}
            >
              <div className={Styles.QuesHead}>{category}</div>
              <Question
                currentQuesIndex={currentQuesIndex}
                setDesignQues={setDesignQues}
                id={i + 3}
                category={category}
                options={designOptionsByCategory[category] || []}
                designAns={designAns}
                handleNext={handleNext}
                lastDesignQuesIndex={lastDesignQuesIndex}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default QuestionPage;
