import React from "react";
import styles from "./Profile.module.css";
import Back from "../../assets/Frame.svg";
import info from "../../assets/profile/infoSquare.svg";
import arrow from "../../assets/profile/rightArrow.svg";
import images from "../../assets/profile/images.svg";
import leads from "../../assets/profile/leads.svg";

import { useNavigate } from "react-router-dom";
import CircleButton from "../ui/CircleButton/CircleButton";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { useAuth } from "../../AuthProvider/AuthContext";
import { getInitials } from "./UserLeads/LeadCard/LeadCard";

const Profile = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      {/* Navbar */}
      <ProfileNavbar name="Profile" handleClick={() => navigate("/")} />

      {/* Main Profile */}
      <div className={styles.profileContainer}>
        {/*  User Info */}
        <section className={styles.userInfo}>
          <div className={styles.imgContainer}>
            <p>{getInitials(authUser?.name)}</p>
          </div>
          <div className={styles.details}>
            <h3>{authUser?.name}</h3>
            <p className="paragraph-medium">{authUser?.email}</p>
          </div>
        </section>

        {/* Cards Container */}
        <section className={styles.profileInfo}>
          {/* Profile Card */}
          <div className={styles.infoCard} onClick={() => navigate("user")}>
            <div className={styles.cardLeft}>
              <img src={info} alt="info" />
              <p>User Info</p>
            </div>
            <div className={styles.cardRight}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>

          {/* Gallery Card */}
          <div className={styles.infoCard} onClick={() => navigate("gallery")}>
            <div className={styles.cardLeft}>
              <img src={images} alt="info" />
              <p>Saved gallery images</p>
            </div>
            <div className={styles.cardRight}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>

          {/* Blogs Card */}
          <div className={styles.infoCard} onClick={() => navigate("blogs")}>
            <div className={styles.cardLeft}>
              <img src={images} alt="info" />
              <p>Saved blogs</p>
            </div>
            <div className={styles.cardRight}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>

          {/* Generated Leads Card */}
          <div
            className={styles.infoCard}
            onClick={() => navigate("generated-leads")}
          >
            <div className={styles.cardLeft}>
              <img src={leads} alt="info" />
              <p>Generated leads</p>
            </div>
            <div className={styles.cardRight}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
