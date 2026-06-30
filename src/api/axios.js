import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

// axios.defaults.withCredentials = true;

// These are updated by React (via setupAxiosInterceptors) but default to safe
// no-ops so the interceptors work even before React mounts.
let setLoadingState = () => {};
let getCurrentPathname = () => "/";

// IMPORTANT: interceptors are registered ONCE at import time (not inside a React
// effect). On a hard refresh, child components / AuthProvider fire their first
// requests before App's effect runs. If the interceptor isn't registered yet,
// the auth token never gets attached and those requests fail (data "disappears"
// until you navigate away and back). Registering here guarantees the token is
// attached to the very first request.
axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.method?.toLowerCase() === "get" &&
      getCurrentPathname() !== "/"
    ) {
      setLoadingState(true);
    }

    const isFormData = config.data instanceof FormData;
    if (isFormData) {
      const newFormData = new FormData();
      for (const [key, value] of Object.entries(config.data)) {
        newFormData.append(key, value);
      }
      config.data = newFormData;
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    setLoadingState(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.method?.toLowerCase() === "get") {
      setLoadingState(false);
    }
    return response;
  },
  (error) => {
    if (error.config?.method?.toLowerCase() === "get") {
      setLoadingState(false);
    }
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

// React calls this to wire up the loader state and a live pathname getter.
// It no longer registers interceptors, so it is safe to call multiple times.
export const setupAxiosInterceptors = (setIsLoading, pathname) => {
  setLoadingState = typeof setIsLoading === "function" ? setIsLoading : () => {};
  if (typeof pathname === "function") {
    getCurrentPathname = pathname;
  } else {
    getCurrentPathname = () => pathname;
  }
};

export default axiosInstance;
