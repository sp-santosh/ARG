"use client";
import React, { useState } from "react";
import {
  fetchFaculties,
  fetchSubjects,
  fetchTeachers,
} from "../utils/auth.api";
import { useQuery } from "react-query";
import { authHttp } from "../utils/http";
import Navbar from "@/components/Navigation/Navbar";

const CollagePage: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Replace the options with your actual data

  const {
    data: subjectsList,
    isLoading,
    isError,
  } = useQuery("subject", fetchSubjects);

  const { data: teachersList, isLoading: teacherLoading } = useQuery(
    "teachers",
    fetchTeachers
  );

  const { data: facultiesList, isLoading: facultyLoading } = useQuery(
    "faculties",
    fetchFaculties
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authHttp({
        url: "/api/college",
        method: "POST",
        data: {
          faculty: selectedFaculty,
          teacher: selectedTeacher,
          subject: selectedSubject,
        },
      });

      alert("College added successfully!");
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.error("There was an error adding the college:", error);
      alert("Error adding college.");
      // Handle error
    }
  };

  const facultyOptions =
    facultiesList?.map((e: any) => ({
      value: e.className,
      id: e.id,
    })) ?? [];

  const teacherOptions =
    teachersList?.map((e: any) => ({
      value: e.name,
      id: e.id,
    })) ?? [];

  const subjectOptions =
    subjectsList?.map((e: any) => ({
      value: e.name,
      id: e.id,
    })) ?? [];

  if (isLoading || teacherLoading || facultyLoading) {
    return "Loading...";
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            College Assign Page
          </h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
            <div className="flex flex-col items-start mb-4 w-full">
              <label
                htmlFor="faculty"
                className="mb-2 font-bold text-lg text-gray-900"
              >
                Faculty:
              </label>
              <select
                required
                id="faculty"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
              >
                <option value="" disabled selected>
                  Select your option
                </option>{" "}
                {facultyOptions.map((faculty: any) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start mb-4 w-full">
              <label
                htmlFor="teacher"
                className="mb-2 font-bold text-lg text-gray-900"
              >
                Teacher:
              </label>
              <select
                required
                id="teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
              >
                <option value="" disabled selected>
                  Select your option
                </option>

                {teacherOptions.map((teacher: any) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start mb-4 w-full">
              <label
                htmlFor="subject"
                className="mb-2 font-bold text-lg text-gray-900"
              >
                Subject:
              </label>
              <select
                id="subject"
                required
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
              >
                <option value="" disabled selected>
                  Select your option
                </option>{" "}
                {subjectOptions.map((subject: any) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CollagePage;
