import React, { useEffect, useState, useRef } from "react";
import Styles from "./Login.module.css";
import logoblue from "../../assets/icons/logoblue.png";
import backIcon from "../../assets/icons/backIcon.svg";
import Input from "../ui/NormalInput/Input";
import Button from "../ui/Button/Button";
import Otp from "../ui/Otp/Otp";
import { validateName, validatePhoneNo } from "../../utils/formValidation";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [otppage, setOtpPage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [otp, setOtp] = useState([]);
  const { sendotp, login, resendotp, showModel, setShowModel } = useAuth();
  const [otpError, setOtpError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (showModel) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "scroll");
  }, [showModel]);

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    setFormErrors({
      name: "",
      phoneNumber: "",
    });
    if (!validateName(formData.name)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        name: "Provide a valid name!",
      }));
      return;
    }

    if (!validatePhoneNo(formData.phoneNumber)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        phoneNumber: "Provide a valid phone number!",
      }));
      return;
    }
    const res = await sendotp(formData.phoneNumber);
    //skip for now send otp
    setOtpPage(true);
    // if (res.success) {
    //   setOtpPage(true);
    // }

    //if failed for send otp use toast here for failed to send otp try again later
  };

  const handleLogin = async (e) => {
    // e.preventDefault();
    setFormErrors({
      name: "",
      phoneNumber: "",
    });

    if (!validateName(formData.name)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        name: "Provide a valid name!",
      }));
      return;
    }

    if (!validatePhoneNo(formData.phoneNumber)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        phoneNumber: "Provide a valid phoneNumber number!",
      }));
      return;
    }

    let finalOtp;
    if (Array.isArray(otp)) {
      finalOtp = otp.join("");
    } else {
      finalOtp = otp;
    }
    finalOtp = 1234;

    const loginapi = await login(formData, finalOtp);

    if (loginapi.success) {
      setShowModel(false);
      setFormData({
        name: "",
        phoneNumber: "",
      });
      if(location.pathname === '/') {
   navigate("/profile");
      }
   
    }
  };

  // const handleVerifyOtp = () => {
  //   // not use otp verify whith login api
  //   setOtpError("");

  //   if (!otp?.[0]) {
  //     setOtpError("Enter a otp!");
  //     return;
  //   }

  //   if (otp.join("").length < 4) {
  //     console.log("here");
  //     setOtpError("Enter a valid Otp!");
  //     return;
  //   }

  //   const OTP = otp.join("");

  //   async function postJobForm() {
  //     setLoading(true);
  //     try {
  //       const res = await sendSupportMsg(formData);
  //       setFormData({
  //         name: "",
  //         phoneNumber: "",
  //         message: "",
  //       });
  //       setOtp([]);
  //       setOtpPage(true);
  //       setAnimationPlaying(true);
  //     } catch (err) {
  //       return setError(getErrorMessage(err));
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   postJobForm();
  // };

  const setNewOtpFromChild = (otp) => {
    setOtp(otp);
  };

  const resendOtpFomChild = async () => {
    // const res= await resendotp(formData.phoneNumber);
    //skip for now send otp
    // setOtpPage(true);
    // if(res.success){
    //   setOtpPage(true);
    // }
    //if failed for send otp use toast here for failed to send otp try again later
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.classList.contains(Styles.mainWrapper)
      ) {
        setShowModel(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, setShowModel]);

  const myFunctionToExecute = async () => {
    otppage ? await handleLogin() : await handleFormSubmit();
    // Add your logic here, e.g., submitting a form, searching, etc.
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  useEffect(() => {
    const listener = async (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        otppage ? await handleLogin() : await handleFormSubmit();
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [otppage, formData, otp]);

  return (
    <>
      <div className={`${Styles.mainWrapper} `}>
        <div className={Styles.mainComponent} ref={modalRef}>
          {otppage && (
            <div
              className={Styles.backbutton}
              onClick={() => setOtpPage(false)}
              style={{ cursor: "pointer" }}
            >
              <img src={backIcon} alt="" />
            </div>
          )}

          <div className={Styles.upper}>
            {!otppage && (
              <div
                className={Styles.backbutton}
                onClick={() => setShowModel(false)}
                style={{ cursor: "pointer" }}
              >
                <img src={backIcon} alt="" />
              </div>
            )}

            <img src={logoblue} alt="" className={Styles.img} />
            <div className={Styles.loginContent}>
              <h3>Login to Abhirachnaa</h3>
              <p className={`paragraph-medium ${Styles.text}`}>
                Access your dashboard, track your dream home’s journey, and stay
                connected throughout.
              </p>
            </div>
          </div>

          <div className={Styles.lower}>
            {false ? (
              <Otp
                phoneNumber={formData.phoneNumber}
                otps={setNewOtpFromChild}
                resendOtp={resendotp}
                className={Styles.otpCustomStyles}
                error={otpError}
                setError={setOtpError}
              />
            ) : (
              <div className={Styles.form}>
                <Input
                  label={"Full Name"}
                  required={true}
                  limit={50}
                  type={"text"}
                  name={"name"}
                  style={{ width: "100%" }}
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formErrors.name}
                />
                <Input
                  label={"Phone Number"}
                  required={true}
                  limit={10}
                  name={"phoneNumber"}
                  type={"number"}
                  style={{ width: "100%" }}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={formErrors.phoneNumber}
                />
              </div>
            )}

            <Button
              className={Styles.button}
              // type="submit"
              onClick={true ? handleLogin : handleFormSubmit}
            >
              <label style={{ cursor: "pointer" }}>Continue</label>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
