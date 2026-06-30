import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routes/Routing";
import { useAuth } from "./AuthProvider/AuthContext";
import Login from "./components/login/Login";
import Loader from "./components/common/Loader/GlobalLoader";
import { useLoading } from "./context/LoaderContext/LoaderContext";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./api/axios";
import { useLocation } from "react-router-dom";

function App() {
  const { authUser, showModel, setShowModel } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);

    if (window.screenX !== 0 || window.screenY !== 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
    }

    const timer2 = setTimeout(() => {
      if (window.screenX !== 0 || window.screenY !== 0) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    }, 1000);

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    };
  }, [pathname]);

  // user profile updates by gurinder
  useEffect(() => {
    setupAxiosInterceptors(setIsLoading, pathname);
  }, [setIsLoading]);
  return (
    <>
      {isLoading && (
        <div className="globalLoader">
          <Loader />
        </div>
      )}
      <div className={`scale-wrapper ${isLoading ? "setAppOpacity" : ""}`}>
        <Routing />
        {!authUser && showModel && <Login />}
      </div>
    </>
  );
}

export default App;
