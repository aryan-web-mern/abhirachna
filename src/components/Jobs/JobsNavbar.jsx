import styles from "./Jobs.module.css";
import CircleButton from "../ui/CircleButton/CircleButton";
import Input from "../ui/NormalInput/Input";
import search from "../../assets/icons/search.svg";
import "../Gallery/Gallery.module.css";
import Back from "../../../src/assets/gallery/back.svg";
import Filter from "../../../src/assets/gallery/filter.svg";
import SearchInput from "../ui/SearchInput/SearchInput";
import { useEffect, useState } from "react";

const JobsNavbar = ({
  ref,
  noOfJobs,
  handleBack,
  handleFilterClick,
  isAnyFilter,
  searchValue,
  onChange,
}) => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeft}>
        <CircleButton
          src={Back}
          name={"Back"}
          direction={"right"}
          handleClick={handleBack}
        />
        <p className={styles.navTitle}>{noOfJobs} Jobs</p>
      </div>
      <div className={styles.searchInput}>
        <SearchInput
          placeholder="Search"
          icon={search}
          customclassname="jobSearchBox"
          value={searchValue}
          onChange={onChange}
        />
        {/* <div className={styles.searchIcon}>
          <img src={search} className={styles.jobSearchinput} alt="" />
        </div> */}
      </div>
      {/* <div className={styles.navRight} onClick={handleFilterClick}>
        <div id="filter" ref={ref}>
          <CircleButton
            src={Filter}
            name={"Filter"}
            direction={"left"}
            className={`${isAnyFilter ? styles.filterSelected : ""}`}
          />
        </div>
      </div> */}
    </div>
  );
};

export default JobsNavbar;
