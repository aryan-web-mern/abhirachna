import axios from "axios";
import { useLoading } from "../context/LoaderContext/LoaderContext";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

// axios.defaults.withCredentials = true;

// Request Interceptor
export const setupAxiosInterceptors = (setIsLoading, pathname) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.method?.toLowerCase() === "get" && pathname !== "/") {
        setIsLoading(true);
      }
      const isFormData = config.data instanceof FormData;
      if (isFormData) {
        const newFormData = new FormData();
        for (const [key, value] of Object.entries(config.data)) {
          newFormData.append(key, value);
        }
        config.data = newFormData;
      }

      const token = localStorage.getItem('authToken');
      
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.config.method?.toLowerCase() === "get") {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      return response;
    },
    (error) => {
      if (error.config?.method?.toLowerCase() === "get") {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      if (error.response?.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
