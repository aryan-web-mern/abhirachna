import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthProvider/AuthContext.tsx";
import { ToastContextProvider } from "./context/ToastContext/ToastContext.jsx";
import { LoadingProvider } from "./context/LoaderContext/LoaderContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <LoadingProvider>
      <ToastContextProvider>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </ToastContextProvider>
    </LoadingProvider>
  </BrowserRouter>
  // </StrictMode>
);
