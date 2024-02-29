"use client";
import { useState } from "react";

import { generateRoutineApiCall } from "../utils/auth.api";
import Navbar from "@/components/Navigation/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from "../../../assets/generate.gif";

const GenerateRoutine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await generateRoutineApiCall();
      setIsLoading(false);
      router.push("/view-routine");
    } catch (err) {
      router.push("/view-routine");

      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <Image src={img} alt="Your Image" className="mb-4" />
          <div className="p-8 bg-white shadow-md rounded-md text-center">

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
               Generate Routine
            </h2>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
              ) : (
                "Generate"
              )}
            </button>
            {isLoading && (
              <div className="flex justify-center items-center mt-4">
                <div className="text-gray-600">Generating routine...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateRoutine;
