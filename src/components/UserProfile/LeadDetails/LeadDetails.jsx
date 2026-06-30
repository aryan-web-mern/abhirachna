import React, { useEffect, useState } from "react";
import styles from "./LeadDetails.module.css";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import location from "../../../assets/profile/location.svg";
import phoneIcon from "../../../assets/profile/phoneIcon.svg";
import folderIcon from "../../../assets/profile/folderIcon.svg";
import bed from "../../../assets/profile/bed.svg";
import kitchen from "../../../assets/profile/kitchen.svg";
import bathroom from "../../../assets/profile/bathroom.svg";
import servant from "../../../assets/profile/servant.svg";
import livingRoom from "../../../assets/profile/livingRoom.svg";
import arrow from "../../../assets/profile/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { leadDetailData, siteInfoImages } from "../../../utils/constantData";
import { fetchSingleLeadData } from "../../../services/profileService";
import { getErrorMessage } from "../../../utils/errorHandler";
import { getFormattedTime } from "../../../utils/functions";

function TickSVG({ color = "#E74C21" }) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3594 1C15.3299 1 19.3594 5.02944 19.3594 10C19.3594 14.9706 15.3299 19 10.3594 19C5.38881 19 1.35938 14.9706 1.35938 10C1.35938 5.02944 5.38881 1 10.3594 1ZM14.874 6.23828C14.6556 6.23828 14.469 6.3154 14.3154 6.46875L8.87109 11.9131L6.41113 9.45312C6.26454 9.30681 6.08025 9.23206 5.8584 9.22852C5.63657 9.22516 5.44845 9.29977 5.29492 9.45312C5.1416 9.60665 5.06543 9.79327 5.06543 10.0117C5.0655 10.2299 5.14179 10.4159 5.29492 10.5693L8.20117 13.4746C8.39264 13.6659 8.61592 13.7617 8.87109 13.7617C9.1262 13.7617 9.34959 13.6659 9.54102 13.4746L15.4316 7.58398C15.578 7.43736 15.6527 7.25317 15.6562 7.03125C15.6596 6.80956 15.5848 6.62222 15.4316 6.46875C15.2782 6.31548 15.0923 6.23836 14.874 6.23828Z"
        fill={color}
      />
    </svg>
  );
}

const LeadDetails = () => {
  const [leadData, setLeadData] = useState({});
  const [selectedItem, setSelectedItem] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Image letters
  function getInitials(name) {
    if (!name) return "";

    const words = name.trim().split(/\s+/).filter(Boolean);

    let initials = words.map((word) => word[0].toUpperCase()).join("");

    if (initials.length < 2 && words[0]) {
      const firstWord = words[0].toUpperCase();
      initials = firstWord.slice(0, 2);
    }

    return initials.slice(0, 2);
  }

  const toggleItem = (id) => {
    setSelectedItem(
      (prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id) // remove if already open
          : [...prev, id] // add if not open
    );
  };

  useEffect(() => {
    const fetchData = async (id) => {
      setLoading(true);
      try {
        const response = await fetchSingleLeadData(id);
        if (response.success) {
          setLeadData(response?.data[0]);
        }
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData(id);
  }, []);

  // Extracting Lead Data
  const leadDetails = leadData?.leadDetails;
  const siteInformation = leadData?.siteInformation;
  const designOptions = leadData?.designOptions;

  return (
    <div className={styles.mainContainer}>
      <ProfileNavbar
        name={"Lead Details"}
        handleClick={() => navigate("/profile/generated-leads")}
      />
      <div className={styles.leadDetailsContainer}>
        {/* User Details */}
        <div className={styles.userDetailsContainer}>
          {/* Name */}
          <div className={styles.nameContainer}>
            <div className={styles.nameLeftContainer}>
              <div className={styles.textContainer}>
                <span>{getInitials(leadDetails?.name)}</span>
              </div>

              <div className={styles.nameTime}>
                <div className="paragraph-medium">{leadDetails?.name}</div>
                <span className="paragraph-small">
                  {getFormattedTime(leadDetails?.createdAt)}
                </span>
              </div>
            </div>

            {/* Folder Icon */}
            <div
              onClick={() => navigate("uploaded-files")}
              className={styles.folderIconContainer}
            >
              <img src={folderIcon} />
            </div>
          </div>

          {/* Email and Phone */}
          <div className={styles.contactDetailsContainer}>
            <div className={styles.numberContainer}>
              <div className={styles.iconContainer}>
                <img src={phoneIcon} />
              </div>
              <p>{leadDetails?.mobile}</p>
            </div>
            <div className={styles.emailContainer}>
              <div className={styles.iconContainer}>
                <img src={phoneIcon} />
              </div>
              <p>Himanshu21@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div className={styles.addressContainer}>
            <div className={styles.iconContainer}>
              <img src={location} />
            </div>
            <p>{leadDetails?.address}</p>
          </div>
        </div>

        <div className={styles.leadInfoContainer}>
          {/* Site InfoContainer */}
          <section className={styles.topContainer}>
            <h2>Site Information</h2>
            <div className={styles.roomTypesContainer}>
              {/* Room Type */}
              {Object.keys(siteInformation || {})?.map((room, index) => (
                <div className={styles.roomType} key={index}>
                  <div className={styles.roomImgContainer}>
                    <img src={siteInfoImages[room]} />
                  </div>
                  <p className={styles.roomTypeText}>
                    {siteInformation[room]} {room}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Lead Details */}
          {designOptions?.length > 0 ? (
            <section className={styles.bottomContainer}>
              {/* Lead Data section */}
              {designOptions?.map((lead) => (
                <React.Fragment key={lead._id}>
                  <div
                    className={styles.leadDataContainer}
                    onClick={() => toggleItem(lead._id)}
                  >
                    <div className={styles.leadDataHeading}>
                      <h3>{lead?.category}</h3>
                      <span>{lead?.details?.length || 0}</span>
                    </div>
                    <div
                      className={`${styles.arrowContainer} ${
                        selectedItem.includes(lead?._id) ? styles.selected : ""
                      }`}
                    >
                      <img src={arrow} alt="" />
                    </div>
                  </div>
                  {/* Item Details */}
                  {selectedItem?.includes(lead?._id) && (
                    <div className={styles.infoChecks}>
                      {lead?.details?.map((subItem, i) => (
                        <label key={i} className="label-x-small">
                          <TickSVG color={"#E74C21"} />
                          {subItem}
                        </label>
                      ))}
                    </div>
                  )}
                  <hr />
                </React.Fragment>
              ))}
            </section>
          ) : (
            <div>Not Estimated Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
