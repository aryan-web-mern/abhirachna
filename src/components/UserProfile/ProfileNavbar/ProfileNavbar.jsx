import React from "react";
import styles from "./ProfileNavbar.module.css";
import Back from "../../../assets/Frame.svg";
import CircleButton from "../../ui/CircleButton/CircleButton";

const ProfileNavbar = ({ name, handleClick }) => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.backButton}>
        <CircleButton
          src={Back}
          name={"Back"}
          direction="right"
          className={styles.profileButton}
          handleClick={handleClick}
        />
      </div>
      <div className={`${styles.navTitle}`}>{name}</div>
    </div>
  );
};

export default ProfileNavbar;
