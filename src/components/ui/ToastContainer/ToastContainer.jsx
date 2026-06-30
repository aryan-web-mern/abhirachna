import { useEffect } from "react";
import Toast from "../ToastMsg/Toast";
import Style from "./toastcontainer.module.css";
import { useToast } from "../../../hooks/hooks";

const ToastsContainer = ({ toasts }) => {
  const toast = useToast();

  useEffect(() => {
    if (toasts.length <= 0) return;
    const timeout = setTimeout(() => {
      toasts.forEach(() => toast.pop());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [toasts]);

  return (
    <div className={Style.toastContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;
