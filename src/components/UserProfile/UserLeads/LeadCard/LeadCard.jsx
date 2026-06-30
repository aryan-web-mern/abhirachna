import styles from "./LeadCard.module.css";
import location from "../../../../assets/profile/location.svg";
import price from "../../../../assets/profile/price.svg";
import time from "../../../../assets/profile/time.svg";
import { useNavigate } from "react-router-dom";
import {
  formatEstimateRange,
  getFormattedTime,
} from "../../../../utils/functions";
import { statusColors } from "../../../../utils/constantData";
import Button from "../../../ui/Button/Button";

// To get first two name letters
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/).filter(Boolean);

  let initials = words.map((word) => word[0].toUpperCase()).join("");

  if (initials.length < 2 && words[0]) {
    const firstWord = words[0].toUpperCase();
    initials = firstWord.slice(0, 2);
  }

  return initials.slice(0, 2);
};

// To get formatted time

const LeadCard = ({ lead }) => {
  const navigate = useNavigate();

  // If the name id Too Big
  function truncateName(name) {
    if (!name) return "";

    const trimmed = name.trim();

    return trimmed.length > 12 ? trimmed.slice(0, 12) + "..." : trimmed;
  }

  const handleLeadClick = (id) => {
    navigate(id);
  };

  return (
    <div className={styles.leadCard} onClick={() => handleLeadClick(lead._id)}>
      <section className={styles.cardTop}>
        {/* User Details */}
        <div className={styles.userDetails}>
          <div className={styles.nameIcon}>
            <span className="label-small">{getInitials(lead?.name)}</span>
          </div>

          <div className={styles.nameContact}>
            <div className={styles.name}>{truncateName(lead?.name)}</div>
            <div className={styles.contact}>{lead?.mobile}</div>
          </div>
        </div>

        {/* Lead Status */}
        {/* <div className={styles.leadStatus}>
          <span style={{ backgroundColor: lead?.statusColor }}></span>
          <p>{lead?.leadStatus} </p>
        </div> */}

        <div className={styles.leadStatus}>
          <span style={{ backgroundColor: statusColors[lead?.status] }}></span>
          <p>{lead?.status} </p>
        </div>
      </section>

      {/* Lead Details */}
      <section className={styles.leadDetails}>
        {/* Address  */}
        <div className={styles.address}>
          <div className={styles.imgIcon}>
            <img src={location} alt="location" />
          </div>
          <span>{lead?.address}</span>
        </div>

        <div className={styles.priceTime}>
          {/* Estimate Value */}

          {lead?.minEstimate && lead?.maxEstimate ? (
            <div className={styles.estimate}>
              <div className={styles.imgIcon}>
                <img src={price} alt="price" />
              </div>
              <span>
                {formatEstimateRange(lead?.minEstimate, lead?.maxEstimate)}
              </span>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/get-estimate");
              }}
              className={styles.estimateButton}
              children={"Get Estimate"}
            />
          )}

          {/* Time */}
          <div className={styles.time}>
            <div className={styles.imgIcon}>
              <img src={time} alt="time" />
            </div>
            <span>{getFormattedTime(lead?.createdAt)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadCard;
