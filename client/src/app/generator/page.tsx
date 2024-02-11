"use client";
import { useQuery } from "react-query";
import { generateRoutine } from "../utils/auth.api";


const GenerateRoutine = () => {
  const {
  } = useQuery("generator", generateRoutine);


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>
      </div>
    </div>
      
  );
};

export default GenerateRoutine;
