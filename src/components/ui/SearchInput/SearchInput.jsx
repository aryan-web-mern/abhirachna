import InputStyles from "./searchInput.module.css";
import search from "../../../assets/icons/search.svg";

function SearchInput({ type, value, ...props }) {
  return (
    <div className={InputStyles.mainContainer}>
      <div
        className={`${InputStyles.container} ${
          value ? InputStyles.haveValue : ""
        } ${props?.customclassname}`}
        style={props.style}
      >
        <div className={InputStyles.inputWrapper}>
          <input type={type} className={InputStyles.floatingInput} {...props} />
          <div className="search-Icon-jobs-list">
            {props?.placeholder && <img src={search} alt="" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
