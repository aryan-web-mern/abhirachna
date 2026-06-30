import React, { useEffect, useRef, useState } from "react";
import styles from "./Jobs.module.css";
import Button from "../ui/Button/Button";
import JobsNavbar from "./JobsNavbar";
import Navbar from "../Navbar/Navbar";
import GalleryFilter from "../Gallery/GalleryFilter/GalleryFilter";
import { Table } from "./Table";
import "./Jobsfilter.css";
import { data, redirect, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorHandler";
import { getJobsList } from "../../services/careerService";
import JobCard from "./JobCard/JobCard";

import { useToast } from "../../hooks/hooks";

export const filters = {
  "Room Type": [
    "Living Room",
    "Bedroom",
    "Bathroom",
    "Kitchen",
    "Dining Area",
    "Balcony / Utility",
    "Kids Room",
    "Foyer / Entrance",
    "Study Room / Home Office",
    "Servant Room",
    "Guest Room",
    "Pooja Ghar / Prayer Room",
  ],
  "Storage & Furniture": [
    "Modular Wardrobes",
    "Modular Kitchen Units",
    "Vanity Units",
    "Crockery Units",
    "Shoe Racks",
    "TV Units",
    "Bookshelves / Wall Storage",
  ],
};

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [filter, setFilter] = useState({});
  const [isAnyFilter, setIsAnyFilter] = useState(false);
  const [jobsData, setJobsData] = useState(null);
  const [filterJobsData, setFilterJobsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const filterRef = useRef();
  const filterButtonRef = useRef(null);

  function handleApplybtn(id) {
    navigate(`/apply-now/${id}`);
  }

  function handleViewBtn(id) {
    navigate(`/job-details/${id}`);
  }

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getJobsList();
        setJobsData(data?.data);
        console.log(data?.data);

        // setFilterJobsData(data?.data);
      } catch (err) {
        toast.error("Something went wrong!", err.response.data.message);
        setError(getErrorMessage(err));
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    function filterSearch() {
      setFilterJobsData(
        jobsData?.filter(
          (item) =>
            item.jobTitle.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            item.jobKey?.toLowerCase()?.startsWith(searchValue.toLowerCase())
        )
      );
    }

    filterSearch();
  }, [searchValue]);

  const columns = [
    {
      key: "jobTitle",
      label: "Job Role",
      className: "jobRoll",
    },
    {
      key: "jobKey",
      label: "Job ID",
      className: "dColor jobId",
    },
    {
      key: "experience",
      label: "Experience",
      className: "dColor experience",
    },
    {
      className: "viewBtnMain",
      renderCell: (_, row) => (
        <Button
          className={styles.viewBtn}
          onClick={() => handleViewBtn(row._id)}
        >
          View Details
        </Button>
      ),
    },
    {
      className: "applyBtnMain",
      renderCell: (_, row) => (
        <Button
          className={`label-medium ${styles.applyBtn}`}
          onClick={() => handleApplybtn(row._id)}
        >
          Apply Now
        </Button>
      ),
    },
  ];

  const handleFilterClick = () => {
    setIsFilterOpen((p) => !p);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    setFilter({});
  };

  useEffect(() => {
    let status = false;

    for (const key in filter) {
      if (filter[key]?.length > 0) {
        status = true;
        break;
      }
    }

    setIsAnyFilter(status);
  }, [filter]);

  const handleBack = () => navigate("/careers");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterButtonRef.current.contains(event.target) &&
        !filterRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <>
      <div className={styles.jobsmainContainer}>
        <JobsNavbar
          ref={filterButtonRef}
          noOfJobs={jobsData?.length}
          handleFilterClick={handleFilterClick}
          handleBack={handleBack}
          isAnyFilter={isAnyFilter}
          searchValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className={styles.jobTableContainer}>
          <GalleryFilter
            ref={filterRef}
            filter={filter}
            filters={filters}
            isOpen={isFilterOpen}
            onClose={handleCloseFilter}
            setFilter={setFilter}
            resetFilter={resetFilter}
            className="JobsListFilterPanel"
          />
          {
            <div className={styles.bigScreenJobListing}>
              <Table
                data={filterJobsData ? filterJobsData : jobsData}
                columns={columns}
                loading={loading}
              />
            </div>
          }
          {
            <div className={styles.smallScreenJobListing}>
              {filterJobsData ? (
                filterJobsData.length > 0 ? (
                  filterJobsData?.map((job) => (
                    <JobCard
                      key={job._id}
                      data={job}
                      handleViewBtn={handleViewBtn}
                    />
                  ))
                ) : (
                  <div className={styles.noJobsBox}>
                    <h4>No Job listing found!</h4>
                  </div>
                )
              ) : (
                jobsData?.map((job) => (
                  <JobCard
                    key={job._id}
                    data={job}
                    handleViewBtn={handleViewBtn}
                  />
                ))
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Jobs;
