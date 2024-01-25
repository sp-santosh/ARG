// pages/add-teacher.js
"use client";
import TeacherForm from "../../components/TeacherForm";

export default function AddTeacher() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md">
        Add New Teacher
      </h1>
      <TeacherForm />
    </div>
  );
}