// hooks/useAuth.tsx

"use client";
import { isTokenValid } from "@/app/utils/isAuth";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const getToken = (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      const token = localStorage.getItem("token");

      return token;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  };

  const login = (email: string, name: string) => {
    const userInfo = { email, name };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getAuthenticatedUser = () => {
    if (typeof window === "undefined") return false;

    const token = getToken();

    const test = isTokenValid(token);
    console.log(test);

    return isTokenValid(token);
  };

  const isAuthenticatedUser = getAuthenticatedUser();

  return { user, login, logout, isAuthenticatedUser, getToken };
};

export default useAuth;
