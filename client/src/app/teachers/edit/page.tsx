"use client";
import TeacherForm from "../../../components/TeacherForm";
import isAuth from "../../utils/isAuth";

const AddTeacher = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md"> 
      Add Teachers </h1>
      <TeacherForm />
    </div>
  );
};

export default isAuth(AddTeacher);