import React from "react";
import Button from "../../ui/Button/Button";
import styles from "../JobCard/JobCard.module.css";

const JobCard = ({ data, handleViewBtn }) => {
  return (
    <div className={styles.jobCardContainer}>
      <div className={styles.cardContext}>
        <div className={styles.Role}>
          <h5>{data?.jobTitle}</h5>
        </div>
        <div className={styles.jobId}>
          Job ID :&nbsp;
          <span className={`${styles.jobIdVal} paragraph-small`}>
            {" "}
            {data?.jobKey}
          </span>
        </div>
        <div className={styles.experience}>
          Experience :&nbsp;
          <span className={`${styles.expVal} paragraph-small`}>
            {" "}
            {data?.experience}
          </span>
          <div></div>
        </div>
      </div>
      <div className={styles.viewDetailBtn}>
        <Button
          className={styles.viewBtn}
          onClick={() => handleViewBtn(data?._id)}
        >
          <p>View Details</p>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
