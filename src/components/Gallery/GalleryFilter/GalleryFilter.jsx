import Cross from "../../../assets/icons/Cross-Icon.svg";
import styles from "./GalleryFilter.module.css";

const GalleryFilter = ({
  isOpen,
  onClose,
  filters = [],
  setFilter,
  filter,
  resetFilter,
  className,
  ref,
}) => {
  function OnSelect(option, sectionTitle) {
    setFilter((prevFilter) => {
      const currentSectionOptions = prevFilter[sectionTitle] || [];
      const updatedSet = new Set(currentSectionOptions);
      updatedSet.add(option);
      const updatedArray = Array.from(updatedSet);
      return {
        ...prevFilter,
        [sectionTitle]: updatedArray,
      };
    });
  }

  const removeItem = (e, option, sectionTitle) => {
    e.stopPropagation();
    setFilter((prevFilter) => {
      const array = prevFilter[sectionTitle];
      const updatedArr = array.filter((i) => i !== option);
      return {
        ...prevFilter,
        [sectionTitle]: updatedArr,
      };
    });
  };

  return (
    <div
      ref={ref}
      className={`${styles.filterPanel} ${className}  ${
        isOpen ? styles.open : ""
      }`}
    >
      <div className={styles.filterHeader}>
        <h3 className="label">Filter</h3>
        <button className={`${styles.clearAllBtn} label`} onClick={resetFilter}>
          Clear All
        </button>
      </div>

      {Object.entries(filters).map(([sectionTitle, options]) => (
        <div className={styles.filterSection} key={sectionTitle}>
          <h5>{sectionTitle}</h5>
          <div className={styles.filterOptions}>
            {options.map((option, index) => {
              return (
                <div className="main-option" key={index}>
                  <button
                    key={option}
                    className={`${styles.filterOption} ${
                      filter?.[sectionTitle]?.includes(option)
                        ? styles.selected
                        : styles.notSelected
                    }`}
                    onClick={() => OnSelect(option, sectionTitle)}
                  >
                    <p className="label-small">{option}</p>
                    <img
                      className={styles.crossIcon}
                      src={Cross}
                      alt=""
                      onClick={(e) => {
                        e.stopPropagation(); // <- important!
                        removeItem(e, option, sectionTitle);
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryFilter;
