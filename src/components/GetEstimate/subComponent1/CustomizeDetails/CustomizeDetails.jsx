import React, { useEffect, useState } from "react";
import Styles from "./CustomizeDetails.module.css";
import DetailRow from "./DetailRow";
import bed from "../../../../assets/getEstimate/CustomizeDetails/bed.svg"; // Assuming you have an SVG for the bed icon
import fork from "../../../../assets/getEstimate/CustomizeDetails/forkAndKnife.svg"; // Assuming you have an SVG for the bed icon
import room from "../../../../assets/getEstimate/CustomizeDetails/room.svg"; // Assuming you have an SVG for the bed icon
import towel from "../../../../assets/getEstimate/CustomizeDetails/towel.svg"; // Assuming you have an SVG for the bed icon
import toaster from "../../../../assets/getEstimate/CustomizeDetails/toaster.svg"; // Assuming you have an SVG for the bed icon

const detailsConfig = [
  { id: "SleepingArea", label: "Bedroom", icon: bed, defaultCount: 1 },
  { id: "Bathroom", label: "Bathroom", icon: towel, defaultCount: 1 },
  { id: "Kitchen", label: "Kitchen", icon: toaster, defaultCount: 1 },
  { id: "Dining", label: "Dining", icon: fork, defaultCount: 1 },
  { id: "UtilityArea", label: "Utility Area", icon: room, defaultCount: 0 },
];

export default function CustomizeDetails({ setAnswers, ref, areaType }) {
  const [counts, setCounts] = useState(
    Object.fromEntries(
      detailsConfig.map((item) => [item.id, item.defaultCount])
    )
  );

  console.log(counts);

  const handleIncrement = (id) => {
    setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1),
    }));
  };

  useEffect(() => {
    console.log(counts);
    
    function handleRoomNumber(selectedAreaType) {
      switch (true) {
        case selectedAreaType === "2BHK":
          setCounts((prev) => ({
            ...prev,
            SleepingArea: 2,
          }));
          return;
        case selectedAreaType === "3BHK":
          setCounts((prev) => ({
            ...prev,
            SleepingArea: 3,
          }));
          return;
        case selectedAreaType === "4+BHK":
          setCounts((prev) => ({
            ...prev,
            SleepingArea: 4,
          }));
          return;
      }
    }

    handleRoomNumber(areaType);
  }, [areaType]);

  useEffect(() => {
    setAnswers((p) => {
      const alreadyExist = p.some((i) => i.ques_id === 1);
      if (!alreadyExist) {
        return [...p, { ques_id: 1, ans: counts }];
      } else {
        const withUpdatedCount = p?.map((i) => {
          if (i.ques_id === 1) {
            return { ...i, ans: counts };
          }
          return i;
        });
        return withUpdatedCount;
      }
    });
  }, [counts]);

  return (
    <div
      className={`${Styles.customizeWrapper}`}
      ref={(el) => (ref.current[1] = el)}
      id="customize-card"
    >
      <h5>Customize Details</h5>
      <div className={Styles.content}>
        {detailsConfig.map((item) => (
          <DetailRow
            key={item.id}
            icon={item.icon}
            label={item.label}
            count={counts[item.id]}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
