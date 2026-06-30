import Style from "./bookyourdesignform.module.css";
import phone from "../../../assets/formSvg/phone.png";
import mail from "../../../assets/formSvg/mail.png";
import Input from "../../ui/NormalInput/Input";
import Button from "../../ui/Button/Button";
import TextArea from "../../ui/TextAreaInput/TextArea";
import { useEffect, useRef } from "react";

function BookYourDesignForm({
  formData,
  setFormData,
  formErrors,
  handleSubmit,
  loading,
  error,
}) {
  const lastSubmitRef = useRef(0);

  const throttle = (func, limit = 1000) => {
    return (...args) => {
      const now = Date.now();
      if (now - lastSubmitRef.current >= limit) {
        func(...args);
        lastSubmitRef.current = now;
      }
    };
  };

  const throttledSubmit = throttle(() => {
    handleSubmit();
  }, 1000);

  useEffect(() => {
    const listener = (event) => {
      const active = document.activeElement;
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (
          formData.name &&
          formData.phone &&
          formData.message &&
          active.type !== "textarea"
        ) {
          throttledSubmit();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formData]);

  return (
    <div className={Style.formContainer}>
      <div className={Style.leftContainer}>
        <div className={Style.formHeader}>
          <h3>Get in Touch</h3>
          <p>
            We just need a few quick details to reach out and consult you at
            your preferred time and date.
          </p>
        </div>

        <div className={Style.formFooter}>
          <div>
            <img src={phone} alt="Phone" />
            <label className="label-medium">+91 7341102563</label>
          </div>

          <div>
            <img src={mail} alt="Mail" />
            <label className="label-medium">
              sales@abhirachnaa.com
            </label>
          </div>
        </div>
      </div>

      <form
        className={Style.rightContainer}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={Style.inputs}>
          <Input
            label={"Full name"}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required={true}
            limit={50}
            error={formErrors.name}
          />
          <Input
            label={"Phone Number"}
            type="number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required={true}
            limit={10}
            error={formErrors.phone}
          />
          <TextArea
            label={"Message"}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required={true}
            error={formErrors.message}
          />
        </div>

        <div className={Style.btnContainer}>
          <Button onClick={throttledSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BookYourDesignForm;
