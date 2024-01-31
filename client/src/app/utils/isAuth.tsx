"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const getAuthenticatedUser = () => {
  if (typeof window === "undefined") return false;

  const token = getToken();

  return isTokenValid(token);
};

export const isTokenValid = (token: string | null) => {
  if (!token) return false;
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded || !decoded.exp) return false;

    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    useEffect(() => {
      const token = getToken();

      const authenticated = isTokenValid(token);
      if (!authenticated) {
        return redirect("/");
      }
    }, []);

    return <Component {...props} />;
  };
}
