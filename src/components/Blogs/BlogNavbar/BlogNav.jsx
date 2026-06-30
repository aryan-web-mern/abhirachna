import styles from "./Nav.module.css";
import CircleButton from "../../ui/CircleButton/CircleButton";
import savedBlack from "../../../assets/icons/savedBlack.svg";
import Back from "../../../assets/Frame.svg";
import navstyles from "../BlogNavbar/Nav.module.css";
import { forwardRef } from "react";

const BlogNav = forwardRef(
  (
    {
      onFilterClick,
      handleBack,
      handleSaved,
      openSaved,
      showSaved = false,
      className = "",
      openBlog,
      isSaved,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`${styles.navContainer} ${
          openSaved ? styles.onSavednavContainer : ""
        } ${className}`}
        ref={ref}
      >
        <div className={styles.navLeft}>
          {(openSaved || openBlog) && (
            <CircleButton
              src={Back}
              name={"Back"}
              direction={"right"}
              handleClick={handleBack}
            />
          )}
          <p className={styles.navTitle}>{props?.count} </p>
        </div>
        {(showSaved || openBlog) && (
          <div className={styles.navRight}>
            <div
              id="filter"
              className={`${styles.leftItem} ${styles.textSaved}`}
              onClick={handleSaved}
            >
              {!openBlog && (
                <CircleButton
                  className={openSaved ? "savedSelected" : ""}
                  src={savedBlack}
                  name={"Save"}
                  direction={"left"}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default BlogNav;
