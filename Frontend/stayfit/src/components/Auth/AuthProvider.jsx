import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext({
  authenticated: false,
  role: "",
  status: "",
  loading: true,
  login: () => {},
  register: () => {},
  pay: () => {},
  logout: () => {},
  checkAuth: () => {},
  checkStatus: () => {},
});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/check-authentication",
        { withCredentials: true }
      );
      setAuthenticated(response.data.authenticated);
      setRole(response.data.role);
    } catch (error) {
      setAuthenticated(false);
      console.error("Error checking authentication status:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/check-status",
        { withCredentials: true }
      );
      setStatus(response.data);
    } catch (error) {
      setAuthenticated(false);
      console.error("Error checking status:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials, rememberMe) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        credentials,
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem("username", credentials.username);
          localStorage.setItem("password", credentials.password);
        }
        navigate("/payment");
        console.log("Registration successful!");
      }
    } catch (error) {
      console.log("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const pay = async (membershipType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/payment",
        membershipType,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAuthenticated(true);
        setRole("CUSTOMER");
        setStatus("ACTIVE");
        navigate("/dashboard");
        console.log("Payment successful!");
      } else {
        setStatus("INACTIVE");
      }
    } catch (error) {
      console.log("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, rememberMe) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem("username", credentials.username);
          localStorage.setItem("password", credentials.password);
        }
        setAuthenticated(true);
        setRole(response.data.role);
        if (response.data.role === "CUSTOMER") {
          setStatus(response.data.status);
          if (response.data.status === "ACTIVE") {
            navigate("/dashboard");
          } else {
            navigate("/payment");
          }
        } else if (response.data.role === "COACH") {
          navigate("/clients");
        } else if (response.data.role === "SYS_ADMIN") {
          navigate("/management");
        }
        console.log("Login successful!");
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log("Authentication failed ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAuthenticated(false);
        setRole("");
        setStatus("");
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!["/", "/login", "/register", "/payment"].includes(location.pathname)) {
      checkAuth();
      checkStatus();
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        role,
        status,
        loading,
        login,
        register,
        pay,
        logout,
        checkAuth,
        checkStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
