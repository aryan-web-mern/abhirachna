import { useContext } from "react";
import { ToastContext } from "../context/ToastContext/ToastContext";

export const useToast = () => useContext(ToastContext);
