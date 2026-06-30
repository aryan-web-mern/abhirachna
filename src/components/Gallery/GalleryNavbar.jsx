import styles from "./Gallery.module.css";
import { filters } from "../../components/Jobs";
import CircleButton from "../ui/CircleButton/CircleButton";
// import Save from "../../../src/assets/Like.svg";
// import Filter from "../../../src/assets/Bar.svg";
import Filter from "../../../src/assets/gallery/filter.svg";
import Save from "../../assets/icons/savedBlack.svg";
import Back from "../../../src/assets/gallery/back.svg";

import { useEffect, useRef, useState } from "react";
import GalleryFilter from "./GalleryFilter/GalleryFilter";
import { useAuth } from "../../AuthProvider/AuthContext";

const GalleryNavbar = ({ setOpenSaved, openSaved, noOfItems }) => {
  const [filter, setFilter] = useState({});
  const [selected, setSelected] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { authUser, setShowModel } = useAuth();

  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

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

  useEffect(() => {
    const filterArrays = Object.values(filter);
    const hasActiveFilters = filterArrays.some(
      (arr) => Array.isArray(arr) && arr.length > 0
    );
    if (hasActiveFilters) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [filter]);

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    setFilter({});
  };

  const handleFilterClick = () => {
    setIsFilterOpen((val) => !val);
  };
  return (
    <div className={styles.navContainer}>
      <GalleryFilter
        ref={filterRef}
        filter={filter}
        filters={filters}
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        setFilter={setFilter}
        resetFilter={resetFilter}
      />
      <div className={styles.navLeft}>
        {openSaved && (
          <CircleButton
            src={Back}
            name="Back"
            direction="right"
            handleClick={() => setOpenSaved(false)}
          />
        )}
        <p className={`${styles.navTitle} label-medium`}>
          {noOfItems} Home Interior
        </p>
      </div>
      <div className={styles.navRight}>
        <div className={styles.save}>
          <CircleButton
            src={Save}
            name="Save"
            direction="right"
            handleClick={() =>
              setOpenSaved((p) => {
                if (!authUser) {
                  setShowModel(true);
                  return p;
                }
                return !p;
              })
            }
            className={openSaved ? "savedSelected" : ""}
          />
        </div>
        <div
          className={styles.filter}
          onClick={handleFilterClick}
          ref={filterButtonRef}
        >
          <CircleButton
            src={Filter}
            name="Filter"
            direction="left"
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryNavbar;
