import "./JobDetails.css"; // Assuming you have a CSS file for styling

const JobFactor = ({
  id,
  name,
  activeTab,
  setActiveTab,
  setIsSalarySelected,
}) => {
  const isActive = String(activeTab) === String(id);
  const handleClick = (id) => {
    if (name === "Salary & Location") {
      setIsSalarySelected(true);
    } else {
      setIsSalarySelected(false);
    }
    setActiveTab(id);
  };

  return (
    <div
      className={`factor ${isActive ? "active" : ""}`}
      onClick={() => handleClick(id)}
    >
      <p className="label">{name}</p>
      <span>
        <svg
          className={`plus-icon ${isActive ? "active" : ""}`}
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.25 7.25H0.5V5.75H6.25V0H7.75V5.75H13.5V7.25H7.75V13H6.25V7.25Z" />
        </svg>
      </span>
    </div>
  );
};
export default JobFactor;
