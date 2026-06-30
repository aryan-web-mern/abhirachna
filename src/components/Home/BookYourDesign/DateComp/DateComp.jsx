import React, { useEffect } from "react";
import { getfuture7Dates, getTimeList, times } from "../../../../utils/dataSet";
import styles from "../DateComp/DateComp.module.css";
import Button from "../../../ui/Button/Button";

const DateComp = ({
  selectedDateTime,
  setSelectedDateTime,
  handleDateTimeSelect,
  handleSubmit,
  error,
}) => {
  const selecteddate = Number(selectedDateTime?.date?.split(" ")?.[0]);

  useEffect(() => {
    const listener = async (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (selectedDateTime?.time && selectedDateTime.date) {
          handleSubmit();
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [selectedDateTime, handleDateTimeSelect]);
  return (
    <div className={styles.rightContainer}>
      <div className={styles.datesContainer}>
        <h4>When should we meet?</h4>
        <div className={styles.dates}>
          {getfuture7Dates().map((date, index) => {
            const [day, dateStr] = date.split("  ");
            return (
              <div
                key={index}
                className={`${styles.dateContainer} ${
                  selectedDateTime?.["date"]?.includes(dateStr)
                    ? styles.selected
                    : ""
                }`}
                onClick={(e) => handleDateTimeSelect(dateStr, "date")}
              >
                <div className={styles.Context}>
                  <div
                    className={`${styles.day} label-small ${
                      selectedDateTime?.["date"]?.includes(dateStr)
                        ? styles.selectedDay
                        : ""
                    }`}
                  >
                    {day}
                  </div>
                  <div className={`label-medium ${styles.datelabel} `}>
                    {dateStr}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.timeContainer}>
        <h4>Select time of day</h4>
        <div className={styles.timeContainers}>
          {(selecteddate === new Date().getDate() ? getTimeList() : times)?.length === 0 ? (
            <div className={styles.noSlots}>
              <h4>No Slots available for now.</h4>
            </div>
          ) : (
            (selecteddate === new Date().getDate()
              ? getTimeList()
              : times
            )?.map((i, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.timeContent} ${
                    selectedDateTime?.["time"] === i ? styles.selected : ""
                  }`}
                  onClick={(e) => handleDateTimeSelect(i, "time")}
                >
                  <div className={`${styles.timetext} label-medium`}>{i}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className={styles.error}>
        {error ? (
          <span className={styles.errorMsg}>{error}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className={styles.confirmButton}>
        <Button onClick={handleSubmit}>
          <label className={styles.confirmButton}>Confirm My Call</label>
        </Button>
      </div>
    </div>
  );
};

export default DateComp;
