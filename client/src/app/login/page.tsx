"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import isAuth from "../utils/isAuth";
import { login } from "../utils/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await login(email, password);

      if (result) {
        localStorage.setItem("token", result.token);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
