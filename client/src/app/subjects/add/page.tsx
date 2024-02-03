// pages/add-teacher.js
"use client";
import SubjectForm from "../../../components/SubjectForm";
import isAuth from "../../utils/isAuth";

const AddSubject = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md">
        Add New Subject
      </h1>
      <SubjectForm/>
    </div>
  );
};

export default isAuth(AddSubject);
