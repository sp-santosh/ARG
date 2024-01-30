"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import useAuth from "@/components/hooks/useAuth";

export const isTokenValid = (token: any) => {
  if (!token) return false;
  try {
    const decoded = jwt.decode(token);
    if (!decoded) return false;
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export default function isAuth(Component: any) {
  const { getToken } = useAuth();

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
