import styles from "./UserDetails.module.css";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/NormalInput/Input";
import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import {
  validateEmail,
  validatePhoneNo,
  validateName,
} from "../../../utils/formValidation";
import { useToast } from "../../../hooks/hooks";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import { useAuth } from "../../../AuthProvider/AuthContext";
import { getInitials } from "../UserLeads/LeadCard/LeadCard";
import { updatingFormData } from "../../../services/profileService";
import { getErrorMessage } from "../../../utils/errorHandler";

const UserDetails = () => {
  const { authUser, setAuthUser } = useAuth();
  const [formError, setFormError] = useState(null);
  const [isEditable, setIsEditable] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    setFormData({
      fullName: authUser?.name,
      phoneNumber: String(authUser?.phone),
      email: authUser?.email,
    });
  }, [authUser]);

  const toast = useToast();

  const updateData = async (data) => {
    try {
      const response = await updatingFormData(data);

      if (response.success) {
        setAuthUser((prev) => ({
          ...prev,
          ...("fullName" in data ? { name: data.fullName } : {}),
          ...("email" in data ? { email: data.email } : {}),
        }));

        toast.success(
          "Profile Updated",
          "Your Profile is Updated Successfully"
        );
      }
    } catch (error) {
      const errMsg = getErrorMessage(error);
      setFormError(errMsg);
      toast.error("Submission Failed", errMsg);
    }
  };

  const handleFormSubmit = () => {
    // setting errors false
    setFormErrors({
      fullName: "",
      email: null,
      phoneNumber: "",
    });

    if (!validateName(formData.fullName)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        fullName: "Provide a valid name!",
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
    if (formData.email && !validateEmail(formData.email)) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        email: "Provide a valid email address!",
      }));
      return;
    }

    if (
      formData.email === authUser.email &&
      formData.fullName === authUser.name
    ) {
      toast.error("No Changes Made");
      setIsEditable(false);
      return;
    }
    setIsEditable(false);
    updateData(formData);
  };

  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      {/* Navbar */}
      <ProfileNavbar
        name={"Profile"}
        handleClick={() => {
          navigate("/profile");
        }}
      />

      {/* User Profile */}
      <div className={styles.profileContainer}>
        <div className={styles.userInfo}>
          <div className={styles.imgContainer}>
            <p>{getInitials(authUser?.name)}</p>
          </div>

          <form
            className={styles.inputFeilds}
            onSubmit={(e) => {
              e.preventDefault();
              if (isEditable) {
                handleFormSubmit();
              }
            }}
            noValidate
          >
            <Input
              label={"Full Name"}
              type="text"
              value={formData?.fullName}
              required={true}
              error={formErrors?.fullName}
              limit={50}
              disabled={isEditable ? false : true}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <Input
              label={"Mobile No"}
              type="number"
              value={formData?.phoneNumber}
              error={formErrors?.phoneNumber}
              required={true}
              limit={10}
              disabled={true}
            />
            <Input
              label={"Email ID"}
              type="email"
              value={formData?.email}
              required={false}
              disabled={isEditable ? false : true}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={formErrors.email}
            />

            {/* Edit Button  */}
            {/* Submit button inside form so Enter works */}
            <Button
              type="submit"
              className={styles.submitButton}
              variant={isEditable ? "primary" : "secondary"}
              onClick={
                !isEditable
                  ? (e) => {
                      e.preventDefault();
                      setIsEditable(true);
                    }
                  : undefined
              }
            >
              {isEditable ? "Save Changes" : "Edit Details"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
