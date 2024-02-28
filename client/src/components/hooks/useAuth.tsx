// hooks/useAuth.tsx

"use client";
import { getAuthenticatedUser, isTokenValid } from "@/app/utils/isAuth";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    setIsAuthenticatedUser(getAuthenticatedUser());
  }, []);

  const login = (email: string, name: string) => {
    const userInfo = { email, name };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout, isAuthenticatedUser };
};

export default useAuth;
