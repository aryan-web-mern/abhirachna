import FounderPageStyle from "./founders.module.css";
import FounderCard from "./FounderCard";
// import founder from "../../../assets/sliderDummyImages/founder.png";
import founder1 from "../../../assets/Founders/Founder1.jpeg";
import founder2 from "../../../assets/Founders/Founder2.jpeg";

function Founders() {
  return (
    <div className={FounderPageStyle.mainContainer}>
      <div className={FounderPageStyle.pageContainer}>
        <h3>Meet the Founders</h3>

        <div className={FounderPageStyle.foundersContainer}>
          <FounderCard
            name="Bhupinder Singh"
            occupation="Founder"
            image={founder1}
          />
          <FounderCard
            name="Pawan Girdhar"
            occupation="Founder"
            image={founder2}
          />
          {/* <FounderCard
            name="Suraj Singh"
            occupation="Co-Founder"
            image={founder}
          />
          <FounderCard
            name="Suraj Singh"
            occupation="Co-Founder"
            image={founder}
          />
          <FounderCard
            name="Suraj Singh"
            occupation="Co-Founder"
            image={founder}
          />
          <FounderCard
            name="Suraj Singh"
            occupation="Co-Founder"
            image={founder}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Founders;
