import React, { useEffect, useState } from "react";
import DateComp from "../DateComp/DateComp";
import styles from "../comp1/comp1.module.css";

const Comp1 = ({selected, setSelected, error, handleSubmit, handleDateTimeSelect}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.headingLeft}>
          <h3>
            Book Your <span className={styles.redHead}>Free Design</span>{" "}
            Consultation
          </h3>
          <p>Choose a time that works best for you — we’ll handle the rest.</p>
        </div>
      </div>
      <DateComp
        selectedDateTime={selected}
        setSelectedDateTime={setSelected}
        handleDateTimeSelect={handleDateTimeSelect}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default Comp1;
