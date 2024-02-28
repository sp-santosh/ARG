"use client";
import Navbar from "@/components/Navigation/Navbar";
import TeacherForm from "../../../components/TeacherForm";
import isAuth from "../../utils/isAuth";

const AddTeacher = () => {
  return (
    <>
      <Navbar />

      <div>
        <h1 className="text-2xl font-bold text-center my-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md">
          Add Teachers{" "}
        </h1>
        <TeacherForm />
      </div>
    </>
  );
};

export default isAuth(AddTeacher);
