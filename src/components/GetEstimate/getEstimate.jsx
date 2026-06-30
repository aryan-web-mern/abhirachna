import React, { useEffect, useState, useRef, useCallback } from "react";
import img1 from "../../assets/getEstimate/img1.svg";
import home from "../../assets/getEstimate/home.webp";
import img2 from "../../assets/getEstimate/img2.svg";
import img3 from "../../assets/getEstimate/img3.svg";
import img4 from "../../assets/getEstimate/img4.svg";
import backButton from "../../assets/getEstimate/Frame.svg";
import styles from "./getEstimation.module.css";
import gsap from "gsap";
import Button from "../ui/Button/Button";
import QuestionPage from "./faq/QuestionPage";
import GetEstimateForm from "./form/GetEstimateForm";
import CircleButton from "../ui/CircleButton/CircleButton";
import FlatType from "./subComponent1/FlatType/FlatType";
import CustomizeDetails from "./subComponent1/CustomizeDetails/CustomizeDetails";
import SpaceArea from "./subComponent1/SpaceArea/SpaceArea";
import { getEstimateQues, sendEstimate } from "../../services/estimateService";
import { getErrorMessage } from "../../utils/errorHandler";
import {
  getSelectedDesignOptionIds,
  parseDesignOptionsResponse,
} from "../../utils/estimateDesignOptions";
import InteriorEstimate from "./InteriorEstimate/InteriorEstimate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useToast } from "../../hooks/hooks";

function GetEstimate() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [designAns, setDesignQues] = useState([]);
  const [anySelect, setAnySelect] = useState(false);
  const homeQuesRef = useRef(null);
  const leftContainerRef = useRef(null);
  const QuesRefs = useRef({});
  const mainRef = useRef(null);
  const [selectedAreaType, setSelectedAreaType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [designCategories, setDesignCategories] = useState([]);
  const [designOptionsByCategory, setDesignOptionsByCategory] = useState({});
  let highestZIndex = useRef(10);
  const timeoutId = useRef(null);
  const { authUser, setShowModel } = useAuth();

  const toast = useToast();

  const lastDesignQuesIndex = 2 + designCategories.length;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const [formVisible, setFormVisible] = useState(false);

  console.log(currentQuesIndex, "Ques");
  console.log(activePage, "activer page");

  const tween = gsap;
  // GSAP Animationn
  function firstSelectAnimation() {
    gsap.to(homeQuesRef.current, {
      duration: 1,
      ease: "none",
    });
    gsap.to(leftContainerRef.current, {
      scale: 1,
      opacity: 1,
      ease: "none",
      // transform: "translateX(40px)",
      transformOrigin: "top right",
    });
    // gsap.set()
    // gsap.fromTo([QuesRefs.current[0], QuesRefs.current[1]],{
    //   x: 100, duration: 1, ease:'elastic'
    // })
    gsap.set(leftContainerRef.current, { duration: 1, position: "static" });
    setAnySelect(true);
    handleNext();
  }
  useEffect(() => {
    let allCards = Object.values(QuesRefs?.current);

    allCards.forEach((card, index) => {
      if (index === 0 || index === 3) return;
      let top = 0;
      if (window.screen.width < 624) top = 459;
      top =
        index === 0
          ? 0
          : index > 3
          ? window.screen.width < 624
            ? 247
            : 301
          : index === 2
          ? 388
          : 322;
      gsap.set(card, {
        top: top,
        position: "absolute",
        // width: 522,
        // right: 0,
        boxShadow: "0px 0px 40px 0px rgba(254, 244, 238, 1)",
        zIndex: allCards.length - index,
      });
    });
  }, [designCategories]);

  async function setQuestions() {
    setLoading(true);
    try {
      const data = await getEstimateQues();
      const { categories, optionsByCategory } = parseDesignOptionsResponse(
        data?.data
      );
      setDesignCategories(categories);
      setDesignOptionsByCategory(optionsByCategory);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQuestions();
  }, []);

  const handleEnterAction = useCallback(() => {
    const totalQuestions = Object.keys(QuesRefs.current || {}).length;

    if (activePage < 1) return;
    if (!totalQuestions) {
      console.warn("Questions not ready yet");
      return;
    }

    if (activePage === 2 && designAns.length + 3 === currentQuesIndex) {
      return toast.error("Field Missing!", "Please Select any option");
    }

    if (currentQuesIndex === totalQuestions - 1) {
      setFormVisible(true);
    } else {
      handleNext();
    }
  }, [activePage, currentQuesIndex, designAns.length, handleNext]);

  // enter pe next chlana tha isliye
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Enter") return;

      // avoid double-firing if a real button is focused
      const ae = document.activeElement;
      if (
        ae &&
        (ae.tagName === "BUTTON" || ae.getAttribute("role") === "button")
      )
        return;

      // optional: don’t advance when typing in a textarea
      if (e.target && e.target.tagName === "TEXTAREA") return;

      e.preventDefault();
      handleEnterAction();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleEnterAction]);

  function handleNext() {
    if (answers?.length < 3 && currentQuesIndex === 2) {
      return toast.error("Please Provide all information", "");
    }

    if (!authUser && currentQuesIndex === 2) {
      setShowModel(true);
      return;
    }

    

    if (timeoutId.current) {
      return;
    }

    timeoutId.current = true;
    setTimeout(() => {
      timeoutId.current = false;
    }, 700);

    let currI = currentQuesIndex + 1;
    if (currI === 3) setAnySelect(false);

    if (currI < 3) {
      if (currI === 0 || currI === 3) return;
      const prevCard = QuesRefs?.current[currI - 2];
      const currentCard = QuesRefs?.current[currI];

      const prevZIndex = prevCard
        ? parseInt(window.getComputedStyle(prevCard).zIndex) || 0
        : 0;

      const myArray = isMobile ? [320, 230, 300] : [289, 270, 300];
      let yOffset = -myArray[currI - 1];

      highestZIndex.current += 1;
      if (window.screen.width <= 769) {
        yOffset = -320;
        const prevCard = QuesRefs?.current[currI - 1];
        gsap.to(prevCard, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            prevCard.style.display = "none";
          },
        });
      }
      gsap.set(currentCard, { zIndex: highestZIndex.current });

      gsap.to(currentCard, {
        y: yOffset,
        duration: 0.6,
        ease: "power2.inOut",
      });
    } else if (currI > 3) {
      if (currI >= 5) {
        let allCards = Object.values(QuesRefs.current);
        allCards.length = currI;

        allCards.forEach((card, i) => {
          const currentY = gsap.getProperty(card, "y");
          let prevy = currentY - 45;
          if (window.screen.width < 1159) prevy = currentY - 47;
          gsap.to(card, {
            y: prevy,
            duration: 0.4,
          });
        });
      }

      const prevCard = QuesRefs?.current[currI - 1];
      const currentCard = QuesRefs?.current[currI];

      if (!currentCard) return;

      const prevZIndex = prevCard
        ? parseInt(window.getComputedStyle(prevCard).zIndex) || 0
        : 0;

      const myArray = [260, 251];
      const yOffset =
        currI <= 5 ? -myArray[(currI - 3) % myArray.length] : -268;
      highestZIndex.current += 1;
      gsap.set(currentCard, { zIndex: highestZIndex.current });
      gsap.to(currentCard, {
        y: window.screen.width < 624 ? -249 : yOffset,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }

    setCurrentQuesIndex((p) => p + 1);
  }

  function handleback() {
    if (timeoutId.current) {
      return;
    }

    timeoutId.current = true;
    let currI = currentQuesIndex;

    setTimeout(() => {
      timeoutId.current = false;
    }, 700);

    if (window.screen.width <= 769) {
      const prevCard = QuesRefs?.current[currentQuesIndex - 1];
      const currentCard = QuesRefs?.current[currentQuesIndex];
      gsap.to(prevCard, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          prevCard.style.display = "";
        },
      });
    }

    if (currI === 0) {
      navigate(-1);
      return;
    }

    const currentCard = QuesRefs?.current[currI];
    const prevCard = QuesRefs?.current[currI - 1];

    const prevZIndex = prevCard
      ? parseInt(window.getComputedStyle(prevCard).zIndex) || 0
      : 0;

    if (currI >= 5) {
      let allCards = Object.values(QuesRefs.current);
      allCards.length = currI;

      allCards.forEach((card, i) => {
        const currentY = gsap.getProperty(card, "y");
        gsap.to(card, {
          y: currentY + 45,
          duration: 0.4,
        });
      });
    }

    highestZIndex.current += 1;
    gsap.set(currentCard, { zIndex: highestZIndex.current });
    let yUnit = currI === 1 ? -12 : 0;
    if (window.screen.width < 624) {
      yUnit = currentQuesIndex === 1 ? 50 : -0;
    }
    gsap.to(currentCard, {
      y: yUnit,
      duration: 0.6,
      ease: "power2.inOut",
    });

    if (currI - 1 === 2) setAnySelect(true);

    setCurrentQuesIndex((p) => p - 1);
  }

  async function sendEstimateForm(data) {
    setLoading(true);
    try {
      if (designAns.length < designCategories.length) {
        toast.error("Please Provide all information", "");
        return;
      }
      const setpayload = {
        name: formData.name,
        mobile: formData.phoneNumber,
        address: formData.message,
        selectedDesignOptions: getSelectedDesignOptionIds(designAns),
        leadtype: "customer",
        AreaDetails: answers.find((i) => i.ques_id == 1).ans,
        squareFeetRange: answers.find((i) => i.ques_id === 2)?.ans,
        layoutType: answers.find((i) => i.ques_id === 0)?.ans,
      };

      if (!authUser) {
        setShowModel(true);
        return;
      }
      const res = await sendEstimate(setpayload);
      const id = res.data;
      navigate(`/interior-estimate/${id}`);
    } catch (err) {
      return setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentQuesIndex >= 3) {
      setActivePage(2);
    } else if (currentQuesIndex < 3 && currentQuesIndex > 0) {
      setActivePage(1);
    } else {
      setActivePage(0);
    }
  }, [currentQuesIndex]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.icons}>
          <div className={`${styles.iconBox}`}>
            <img src={img1} alt="" />
          </div>
          <div
            className={`${currentQuesIndex > 0 ? styles.loaderLine : ""} ${
              styles.line
            }`}
          ></div>
          <div
            className={`${
              currentQuesIndex > 0 ? styles.currAndPrevStates : ""
            } ${styles.iconBox}`}
          >
            <img src={img2} alt="" />
          </div>
          <div
            className={`${currentQuesIndex >= 3 ? styles.loaderLine : ""} ${
              styles.line
            }`}
          ></div>
          <div
            className={`${
              currentQuesIndex >= 3 ? styles.currAndPrevStates : ""
            } ${styles.iconBox}`}
          >
            <img src={img3} alt="" />
          </div>
          <div
            className={`${formVisible ? styles.loaderLine : ""} ${styles.line}`}
          ></div>
          <div
            className={`${formVisible ? styles.currAndPrevStates : ""} ${
              styles.iconBox
            }`}
          >
            <img src={img4} alt="" />
          </div>
        </div>

        <div className={styles.BackButton}>
          <CircleButton
            src={backButton}
            name="Back"
            direction={"right"}
            handleClick={() =>
              formVisible ? setFormVisible(false) : navigate(-1)
            }
          />
        </div>

        <div className={formVisible ? styles.setVisible : styles.setHide}>
          <GetEstimateForm
            sendEstimateForm={sendEstimateForm}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <div
          className={`${formVisible ? styles.setHide : styles.setVisible}  ${
            styles.centerdata
          }`}
        >
          <div className={styles.heading}>
            <h2 className={styles.headingLarger}>
              Start with Your
              {window.screen.width >= 1024 ? <br /> : ""} Home Layout!
            </h2>
            <p
              className={`${styles.paragraphMedium} ${styles.headingSmaller} ${
                currentQuesIndex > 0 ? styles.parahead : ""
              }`}
            >
              Every space tells a story. Choose your home type so we can start
              designing yours — with thoughtful touches, timeless design, and
              spaces that feel truly yours.
            </p>
          </div>

          <div
            className={`${
              !anySelect && currentQuesIndex < 2
                ? styles.beforeAnimation
                : styles.afterAnimation
            } ${styles.mainContext}`}
          >
            <div className={styles.leftContainer} ref={leftContainerRef}>
              <div className={styles.leftImageContainer}>
                <img src={home} alt="" className={styles.leftImage} />
              </div>
              {currentQuesIndex > 2 && <div className={styles.shadow}></div>}

              <div
                className={`${styles.buttons} ${
                  currentQuesIndex === 0 ? styles.hideButton : ""
                }`}
              >
                <Button className={styles.backButton} onClick={handleback}>
                  <p>
                    &lt; <span className={styles.texthidemobile}>Back</span>
                  </p>
                </Button>

                <Button
                  className={styles.ButtonContainer}
                  onClick={handleEnterAction}
                >
                  <p className={styles.ButtonText}>
                    <span className={styles.texthidemobile}>
                      {currentQuesIndex === lastDesignQuesIndex &&
                      designAns.length === designCategories.length
                        ? "Submit"
                        : "Next"}
                    </span>{" "}
                    <span> &gt;</span>
                  </p>
                </Button>
              </div>
            </div>

            <div className={styles.selectionContaner} ref={homeQuesRef}>
              <div
                className={`${styles.selectionBox}
                ${currentQuesIndex > 2 ? styles.selectionBoxWid : ""}  
                ${activePage === 0 ? styles.selectionBoxActive0 : ""}
                ${activePage === 1 ? styles.selectionBoxActive1 : ""}
                ${activePage === 2 ? styles.selectionBoxActive2 : ""}
                `}
                ref={mainRef}
              >
                <div
                  style={{ display: currentQuesIndex <= 2 ? "block" : "none" }}
                >
                  <div className={styles.flatTypecard}>
                    <FlatType
                      firstSelectAnimation={firstSelectAnimation}
                      setAnswers={setAnswers}
                      ref={QuesRefs}
                      answers={answers}
                      setSelectedAreaType={setSelectedAreaType}
                    />
                  </div>

                  {!anySelect && window.screen.width > 769 && (
                    <>
                      <div className={styles.gradientCard1}>
                        <FlatType
                          firstSelectAnimation={firstSelectAnimation}
                          setAnswers={setAnswers}
                          ref={QuesRefs}
                          answers={answers}
                          setSelectedAreaType={setSelectedAreaType}
                        />
                      </div>
                      <div className={styles.gradientCard2}>
                        <FlatType
                          firstSelectAnimation={firstSelectAnimation}
                          setAnswers={setAnswers}
                          ref={QuesRefs}
                          answers={answers}
                          setSelectedAreaType={setSelectedAreaType}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`${
                      anySelect
                        ? styles.setTruebookType
                        : styles.setfalseBookType
                    }`}
                  >
                    <CustomizeDetails
                      setAnswers={setAnswers}
                      setCurrentQuesIndex={setCurrentQuesIndex}
                      ref={QuesRefs}
                      areaType={selectedAreaType}
                    />
                    <SpaceArea
                      handleNext={handleNext}
                      setAnswers={setAnswers}
                      answers={answers}
                      setCurrentQuesIndex={setCurrentQuesIndex}
                      ref={QuesRefs}
                      selectedAreaType={selectedAreaType}
                    />
                  </div>
                </div>

                <QuestionPage
                  ref={QuesRefs}
                  setDesignQues={setDesignQues}
                  currentQuesIndex={currentQuesIndex}
                  designCategories={designCategories}
                  designOptionsByCategory={designOptionsByCategory}
                  designAns={designAns}
                  handleNext={handleNext}
                  lastDesignQuesIndex={lastDesignQuesIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetEstimate;
