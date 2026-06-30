import Cross from "../../assets/icons/Cross-Icon.svg";
import styles from "./GalleryFilter.module.css";

const GalleryFilter = ({
  isOpen,
  onClose,
  filters = [],
  setFilter,
  filter,
  resetFilter,
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
    <>
      {isOpen && <div className={styles.filterOverlay} onClick={onClose}></div>}
      <div className={`${styles.filterPanel} ${isOpen ? styles.open : ""}`}>
        <div className={styles.filterHeader}>
          <h3>Filter</h3>
          <button className={styles.clearAllBtn} onClick={resetFilter}>
            <strong>Clear All</strong>
          </button>
        </div>

        {Object.entries(filters).map(([sectionTitle, options]) => (
          <div className={styles.filterSection} key={sectionTitle}>
            <h4>{sectionTitle}</h4>
            <div className={styles.filterOptions}>
              {options.map((option, index) => {
                return (
                  <div className="main-option" key={index}>
                    <button
                      key={option}
                      className={`${styles.filterSection} ${
                        filter?.[sectionTitle]?.includes(option)
                          ? styles.selected
                          : styles.notSelected
                      }`}
                      onClick={() => OnSelect(option, sectionTitle)}
                    >
                      {option}
                      {filter?.[sectionTitle]?.includes(option) && (
                        <div>
                          <img
                            src={Cross}
                            alt=""
                            onClick={(e) => removeItem(e, option, sectionTitle)}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryFilter;
