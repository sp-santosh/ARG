"use client";
import React, { useState } from "react";
import axios from "axios";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send the hashed password instead of the plain one
      const response = await axios.post("http://127.0.0.1:80/api/auth/register", {
        email,
        password,
        userName,
      });
      console.log(response.data);

      // Clear the input fields
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
