import React, { useRef, useState } from "react";
import styles from "../FAQ/faq.module.css";
import { faqs } from "../../../utils/constantData";
// import dropDown from "../../../assets/FAQ/FaqDropdown.svg";
import dropDown1 from "../../../assets/FAQ/FAQIcon.svg";

export const FAQ = () => {
  const [openItemIds, setOpenItemIds] = useState([]);
  const contentRefs = useRef([]);
  const handleToggle = (itemId) => {
    setOpenItemIds((p) => {
      const selected = p[0] === itemId ? [] : [itemId];

      setTimeout(() => {
        const questionIndex = faqs.findIndex((faq) => faq.id === itemId);
        const contentElement = contentRefs.current[questionIndex];

        if (contentElement && selected.length > 0) {
          contentElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 50);

      return selected;
    });
  };

  function formatStringContent(input, key) {
    const urlPattern = /(https?:\/\/[^\s]+)/gi;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi;
    const phonePattern =
      /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

    const combinedPattern = new RegExp(
      `${urlPattern.source}|${emailPattern.source}|${phonePattern.source}`,
      "gi"
    );

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = combinedPattern.exec(input)) !== null) {
      const { index } = match;
      if (index > lastIndex) {
        parts.push(input.slice(lastIndex, index));
      }

      const matchedText = match[0];

      // Determine type of match
      if (urlPattern.test(matchedText)) {
        parts.push(
          <a
            href={matchedText}
            target="_blank"
            rel="noopener noreferrer"
            key={parts.length}
          >
            {matchedText}
          </a>
        );
      } else if (emailPattern.test(matchedText)) {
        parts.push(
          <a href={`mailto:${matchedText}`} key={parts.length}>
            {matchedText}
          </a>
        );
      } else if (phonePattern.test(matchedText)) {
        const telNumber = matchedText.replace(/[^\d+]/g, "");
        parts.push(
          <a href={`tel:${telNumber}`} key={parts.length}>
            {matchedText}
          </a>
        );
      }

      lastIndex = index + matchedText.length;

      // Reset lastIndex of individual patterns
      urlPattern.lastIndex = 0;
      emailPattern.lastIndex = 0;
      phonePattern.lastIndex = 0;
    }

    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }

    return <p key={key}>{parts}</p>;
  }

  return (
    <div className={styles.parentContainer}>
      <div className={styles.faqContainer}>
        <div className={styles.questionContainer}>
          {faqs.map((ques, index) => {
            return (
              <React.Fragment key={ques.id}>
                <div className={styles.question}>
                  <div
                    className={styles.questionHead}
                    onClick={() => handleToggle(ques.id)}
                  >
                    <div className={styles.context}>
                      <div className={`label ${styles.lineContent}`}>
                        <span>{ques?.icon}</span>
                        <span className={styles.questionInline}>
                          {ques.question}
                        </span>
                      </div>
                    </div>
                    <div key={ques.id} className={styles.accordionContainer}>
                      <button
                        className={styles.accordion}
                        aria-expanded={openItemIds.includes(ques.id)}
                      >
                        <div
                          className={`${styles.toggleIcon} ${
                            openItemIds.includes(ques.id) ? styles.rotate : ""
                          }`}
                        >
                          <img src={dropDown1} alt="" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className={`${styles.accordionContent} ${
                    openItemIds.includes(ques.id) ? styles.open : ""
                  }`}
                  style={
                    openItemIds.includes(ques.id)
                      ? {
                          minHeight: `${contentRefs.current[index]?.scrollHeight}px`,
                        }
                      : {}
                  }
                >
                  {typeof ques.answer === "string" ? (
                    // <p>{ques.answer}</p>
                    formatStringContent(ques.answer)
                  ) : (
                    <ul>
                      {ques.answer.map((ans, idx) =>
                        // <p key={idx}>{ans}</p>
                        formatStringContent(ans, idx)
                      )}
                    </ul>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className={styles.rigntContent}>
          <h3 className={styles.head}>Frequently Asked Questions</h3>
          <div className={`${styles.paragraphMedium} paragraph-medium`}>
            Find quick, clear responses to common queries about our process,
            pricing, timelines, services, and more.
          </div>
        </div>
      </div>
    </div>
  );
};
