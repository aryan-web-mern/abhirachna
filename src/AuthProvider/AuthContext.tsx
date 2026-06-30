import { createAction } from "@reduxjs/toolkit";
import axios from "../api/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_ROUTES } from "../constants/apiRoutes";

import { useToast } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
}

//here is user
interface AuthContextType {
  authUser: User | null;
  phone: string;
  loading: boolean;
  login: (
    user: { name: string; phoneNumber: string },
    otp: number
  ) => Promise<void>;
  logout: (navigate: any) => Promise<void>;
  sendotp: (phoneNumber: number) => Promise<void>;
  resendotp: (phoneNumber: number) => Promise<void>;
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [onLogin, setOnLogin] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const navigate = useNavigate();

  const toast = useToast();

  const login = async (
    user: { name: string; phoneNumber: string },
    otp: number
  ): Promise<void> => {
    try {
      const { name, ...rest } = user;
      const data = { ...rest, otp, fullName: name };
      setLoading(true);

      const response = await axios.post(API_ROUTES.USER_LOGIN, data);

      console.log("Login response:", response.data);
      // Save token to localStorage
      const token = response?.data?.data; // Assuming token is returned in response.data
      localStorage.setItem("authToken", token); // Store token in localStorage

      setOnLogin((prev) => !prev);
      toast.success(
        "Login Successful",
        "You have just logged in successfully!"
      );

      if (location.pathname === '/') {
      navigate("/profile");
      }

      return response.data;
    } catch (err: any) {
      console.log({ err });

      toast.error("Login Failed", err.response.data.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get(API_ROUTES.LOG_OUT);

      localStorage.removeItem("authToken");

      setOnLogin((prev) => !prev);
      setAuthUser(null);

      toast.success("Logout Successful", "You have logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendotp = async (PhoneNumber: number): Promise<void> => {
    try {
      setLoading(true);
      return;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendotp = async (PhoneNumber: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post(API_ROUTES.RESEND_OTP, {
        PhoneNumber: PhoneNumber,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ROUTES.CHECK_AUTH);
        const user = response?.data?.data?.user;

        if (user) {
          setAuthUser({
            id: user._id || "",
            name: user.fullName || "",
            phone: user.phoneNumber || "",
            email: user.email || "",
          });
        }
      } catch (err) {
        console.error("User fetch failed", err);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [onLogin]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        phone,
        loading,
        login,
        logout,
        resendotp,
        sendotp,
        showModel,
        setShowModel,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
