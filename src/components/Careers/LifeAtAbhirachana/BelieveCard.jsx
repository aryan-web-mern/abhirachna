import React from "react";
import BelieveStyle from "./believecard.module.css";

function BelieveCard() {
  return (
    <div className={BelieveStyle.container}>
      <div>
        <h4>What We Believe In</h4>
      </div>

      <div className={BelieveStyle.contentBox}>
        <div>
          <label className="label">🧠 Bold Vision, Strategic Execution</label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            We don’t just solve problems, we innovate with intent. Bold ideas
            meet refined detail to create meaningful design.
          </p>
        </div>
        <div>
          <label className="paragraph-medium label">
            🧩 Harmony in Every Action
          </label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            Embracing fairness, kindness, and integrity—encouraging dramafree
            collaboration that builds trust, respect, and lasting success.
          </p>
        </div>
        <div>
          <label className="paragraph-medium label">
            🌱 Talent Over Titles
          </label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            We value skill, ownership, and creative thinking. Impact matters
            more than job titles or hierarchy.
          </p>
        </div>
        <div>
          <label className="paragraph-medium label">
            🔍 Growth Is a Mindset
          </label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            We embrace continuous learning and evolution. Excellence is a
            journey, never a fixed point.
          </p>
        </div>
        <div>
          <label className="paragraph-medium label">🙌 Karma Over Chaos</label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            Fairness, honesty, and kindness shape our culture. Drama-free
            teamwork leads to lasting success.
          </p>
        </div>
        <div>
          <label className="paragraph-medium label">
            🎉 Joyful Focus, Balanced Flow
          </label>
          <p className={`${BelieveStyle.contentText} paragraph-small`}>
            Great design lives in balance and intention. We blend passion with
            play, and work with joy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BelieveCard;
