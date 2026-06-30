import styles from "./UserLeads.module.css";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import plus from "../../../assets/profile/plus.svg";
import { useNavigate } from "react-router-dom";
import LeadCard from "./LeadCard/LeadCard";
import { fetchAllLeadsData } from "../../../services/profileService";
import { getErrorMessage } from "../../../utils/errorHandler";
import { useEffect, useState, useRef } from "react";

const UserLeads = () => {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const fetchLeadsData = async (pageNo, limit) => {
    setLoading(true);
    try {
      const response = await fetchAllLeadsData(pageNo, limit);
      if (response?.success) {
        const newLeads = response?.data?.data || [];
        setLeadsData((prev) => [...prev, ...newLeads]);
        setHasMore(newLeads.length > 0);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData(pageNo, 10);
  }, [pageNo]);

  // Intersection Observer setup
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNo((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className={styles.mainContainer}>
      <ProfileNavbar
        name={"Past Estimate"}
        handleClick={() => navigate("/profile")}
      />

      {/* Leads Card Container */}
      <section className={styles.leadCardsContainer}>
        {/* Lead add Card */}
        <div
          className={styles.addCard}
          onClick={() => navigate("/get-estimate")}
        >
          <div className={styles.plusIcon}>
            <img src={plus} alt="plus" />
          </div>
          <div className="label-medium">Create new leads</div>
        </div>

        {/* Lead cards */}
        {leadsData?.map((lead, index) => (
          <LeadCard key={index} lead={lead} />
        ))}

        {/* Loader div */}
        {hasMore && !error && (
          <div
            ref={loaderRef}
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {loading && <span>Loading...</span>} */}
          </div>
        )}

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </div>
  );
};

export default UserLeads;
