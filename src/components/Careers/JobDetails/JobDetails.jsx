import React, { useEffect, useRef, useState } from "react";
import "./JobDetails.css";
import JobFactor from "./JobFactor";
import CircleButton from "../../ui/CircleButton/CircleButton";
import Button from "../../ui/Button/Button";
import pin from "../../../assets/carrierSvgs/pin.png";
import calendar from "../../../assets/carrierSvgs/calendar.png";
import clock from "../../../assets/carrierSvgs/clock.png";
import Frame from "../../../assets/Frame.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetails } from "../../../services/careerService";
import { getErrorMessage } from "../../../utils/errorHandler";
import { Link } from "react-router-dom";

import { useToast } from "../../../hooks/hooks";
import { JobDetailDataSet, SalaryLocDataSet } from "../../../utils/dataSet";

const JobDetails = () => {
  const [activeTab, setActiveTab] = useState("0");
  const navigate = useNavigate();
  const [isSalarySelected, setIsSalarySelected] = useState(false);
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [requirementsData, setRequirementsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function getJobData() {
      setLoading(true);
      try {
        const data = await getJobDetails(id);
        setJobDetails(data?.data);
        // const scrollData = jobDetailsData(data?.data);
        // setRequirementsData(scrollData || []);
      } catch (err) {
        toast.error("Something went wrong!", err.response.data.message);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    getJobData();
  }, []);

  const contentRefs = {
    0: useRef(null),
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
  };
  const rightSectionRef = useRef(null); // Add this ref for the right section container

  // Scroll to content when tab changes
  useEffect(() => {
    if (contentRefs[activeTab]?.current && rightSectionRef.current) {
      const container = rightSectionRef.current;
      const element = contentRefs[activeTab].current;
      const isLastTab = activeTab === "3";
      // Calculate positions relative to container
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate scroll position within container
      const scrollPosition =
        elementRect.top - containerRect.top + container.scrollTop;

      // if (false) {
      //   // For last tab, align to top of container with some padding
      //   container.scrollTo({
      //     top: 100, // 20px padding
      //     behavior: "smooth",
      //   });
      // } else {
      // For other tabs, center in container
      const centerPosition =
        scrollPosition - container.clientHeight / 2 + element.clientHeight / 2;
      container.scrollTo({
        top: centerPosition + (isSalarySelected ? 200 : +20),
        behavior: "smooth",
      });
      // }
    }
  }, [activeTab]);

  function handleBack() {
    navigate("/job-list");
  }
  return (
    <div className="job-details-main-container">
      <div className="details-container">
        <div className="back-button">
          <CircleButton
            src={Frame}
            name={"Back"}
            direction={"right"}
            handleClick={handleBack}
          />
        </div>

        <div className="introduction">
          <section className="left-section">
            <div className="job-meta">
              <h3>{jobDetails?.jobTitle}</h3>
              <p className="paragraph-medium">
                <img src={pin} /> <span> {jobDetails?.jobLocation}</span>
              </p>
              <p className="paragraph-medium">
                <img src={clock} /> <span> {jobDetails?.jobType}</span>
              </p>
              <p className="paragraph-medium">
                <img src={calendar} /> <span>{jobDetails?.experience}</span>
              </p>
              <Link to={`/apply-now/${jobDetails?._id}`}>
                <Button>Apply Now</Button>
              </Link>
            </div>

            <div>
              {JobDetails &&
                JobDetailDataSet.map(
                  (item, index) =>
                    jobDetails?.[item.key]?.length > 0 && (
                      <React.Fragment key={index}>
                        <div className="features-list" key={index}>
                          {
                            <JobFactor
                              id={index}
                              name={item.label}
                              activeTab={activeTab}
                              setIsSalarySelected={setIsSalarySelected}
                              setActiveTab={setActiveTab}
                            />
                          }

                          <div
                            className={`job-factor-content ${
                              String(activeTab) === index.toString()
                                ? "open"
                                : ""
                            } ${
                              jobDetails[item.key]
                                ? "details-section-mobile"
                                : ""
                            }`}
                          >
                            <div>
                              <h3 className="title">
                                {JobDetailDataSet[item.key]?.label}
                              </h3>

                              {item.key !== "jobLocation" && (
                                <div>
                                  <ul className="line-Content-mobile">
                                    {jobDetails[item.key]?.map((i, indx) => (
                                      <li
                                        className="paragraph-small"
                                        key={indx}
                                      >
                                        {i}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {item.key === "jobLocation" &&
                                SalaryLocDataSet.map((i, index) => {
                                  return (
                                    jobDetails?.[i.key]?.length > 0 && (
                                      <div key={index}>
                                        <h3 className="title">{i.icon}</h3>
                                        <p className="paragraph-small">
                                          {jobDetails[i.key]}
                                        </p>
                                      </div>
                                    )
                                  );
                                })}
                            </div>

                            {/* {item.key === "jobLocation" &&
                        requirementsData[4]?.details && (
                          <div>
                            <h3 className="title">
                              {requirementsData[4]?.title}
                            </h3>
                            <div>
                              <p className="paragraph-small">
                                {requirementsData[4].details[0]}
                              </p>
                              <p className="paragraph-small">
                                {requirementsData[4].details[1]}
                              </p>
                            </div>
                          </div>
                        )} */}
                            {/* <ul className="paragraph-small">
                        {requirementsData[index]?.description?.map(
                          (desc, idx) => desc && <li key={idx}>{desc}</li>
                        )}
                      </ul> */}
                          </div>
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </section>

          <section className="right-section" ref={rightSectionRef}>
            {JobDetailDataSet?.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.key === "jobLocation" && (
                  <div className="loc-card">
                    {SalaryLocDataSet.map((i, index) => {
                      return (
                        jobDetails?.[i.key]?.length > 0 && (
                          <div key={index} style={{ width: "100%" }}>
                            <div
                              key={index}
                              ref={contentRefs[idx + index]}
                              className={`content-card  location-card ${
                                activeTab === idx + index ? "active" : ""
                              }   `}
                            >
                              <h3 className="title">{i.icon}</h3>

                              <div>
                                <h4 className="paragraph-medium">
                                  {jobDetails[i.key]}
                                </h4>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                )}

                {item.key !== "jobLocation" &&
                  jobDetails?.[item.key]?.length > 0 && (
                    <div
                      key={idx}
                      ref={contentRefs[idx]}
                      className={`content-card ${
                        activeTab === idx ? "active" : ""
                      }   `}
                    >
                      <h3 className="title">{item.label}</h3>
                      {/* {item.key === 'salary&location' && (
                        <div>
                          <h4 className="paragraph-medium">{jobDetails[item]?.[0]}</h4>
                          <h4 className="paragraph-medium">{data.details[1]}</h4>
                        </div>
                      )} */}
                      <ul className="description paragraph-medium">
                        {jobDetails?.[item.key]?.map(
                          (desc, idx) => desc && <li key={idx}>{desc}</li>
                        )}
                      </ul>
                    </div>
                  )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
