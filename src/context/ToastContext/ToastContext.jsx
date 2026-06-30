import { createContext, useReducer } from "react";
import { toastReducer } from "./toastReducer";
import ToastsContainer from "../../components/ui/ToastContainer/ToastContainer";

export const ToastContext = createContext();

const initialState = {
  toasts: [],
};

export const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, heading, subtext) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, heading, subtext, type } });
  };

  const success = (heading, subtext) => {
    addToast("success", heading, subtext);
  };

  const error = (heading, subtext) => {
    addToast("error", heading, subtext);
  };

  const remove = (id) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };

  const pop = () => {
    dispatch({ type: "POP_TOAST" });
  };

  const value = { success, error, remove, pop };

  return (
    <ToastContext.Provider value={value}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
