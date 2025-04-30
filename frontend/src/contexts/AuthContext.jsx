import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post("http://localhost:5000/api/auth/login", {
            email,
            password,
          })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("acme_user", JSON.stringify(user));
            localStorage.setItem("token", token);
            toast({
              title: "Login Successful",
              description: "Welcome back to your wellness dashboard!",
            });
            navigate("/dashboard");
            resolve(user);
          })
          .catch((error) => {
            toast({
              title: "Login Failed",
              description: "Please check your credentials and try again.",
              variant: "destructive",
            });
            reject(error);
          });
      } catch (error) {
        console.error("Error logging in:", error);
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        reject(error);
      }
    });
  };
  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post("http://localhost:5000/api/auth/register", {
            email,
            password,
          })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("acme_user", JSON.stringify(user));
            localStorage.setItem("token", token);
            toast({
              title: "Account Created",
              description: "Welcome to your wellness journey!",
            });
            navigate("/dashboard");
            resolve(user);
          })
          .catch((error) => {
            toast({
              title: "Signup Failed",
              description: "Please check your credentials and try again.",
              variant: "destructive",
            });
            reject(error);
          });
      } catch (error) {
        console.error("Error signing up:", error);
        toast({
          title: "Signup Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        reject(error);
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("acme_user");
    localStorage.removeItem("token");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
