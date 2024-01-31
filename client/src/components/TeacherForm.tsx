// components/TeacherForm.js
import { useState } from "react";
import axios from "axios";
import { authHttp } from "@/app/utils/http";

function TeacherForm() {
  const [teacher, setTeacher] = useState({
    name: "",
    shortName: "",
    address: "",
    phoneNumber: "",
    type: "",
    specialization: "",
    code: "",
    sunStartTime: "",
    sunEndTime: "",
    monStartTime: "",
    monEndTime: "",
    tueStartTime: "",
    tueEndTime: "",
    wedStartTime: "",
    wedEndTime: "",
    thurStartTime: "",
    thurEndTime: "",
    friStartTime: "",
    friEndTime: "",
  });

  const handleChange = (e: any) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authHttp({
        url: "/api/teachers",
        method: "POST",
        data: teacher,
      });

      alert("Teacher added successfully!");
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.log("hello", teacher);
      console.error("There was an error adding the teacher:", error);
      alert("Error adding teacher.");
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
      {/* Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Short Name */}

      <div className="mb-4">
        <label
          htmlFor="shortName"
          className="block text-sm font-medium text-gray-600"
        >
          Short Name:
        </label>
        <input
          type="text"
          id="shortName"
          name="shortName"
          value={teacher.shortName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-600"
        >
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={teacher.address}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-600"
        >
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={teacher.phoneNumber}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Type */}
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-600"
        >
          Type:
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={teacher.type}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Specialization */}
      <div className="mb-4">
        <label
          htmlFor="specialization"
          className="block text-sm font-medium text-gray-600"
        >
          Specialization:
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={teacher.specialization}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Code */}
      <div className="mb-4">
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-600"
        >
          Code:
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={teacher.code}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Sunday Start Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sunStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Sunday Start Time:
          </label>
          <input
            type="time"
            id="sunStartTime"
            name="sunStartTime"
            value={teacher.sunStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Sunday End Time */}
        <div>
          <label
            htmlFor="sunEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Sunday End Time:
          </label>
          <input
            type="time"
            id="sunEndTime"
            name="sunEndTime"
            value={teacher.sunEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Monday Start Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="monStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Monday Start Time:
          </label>
          <input
            type="time"
            id="monStartTime"
            name="monStartTime"
            value={teacher.monStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Monday End Time */}
        <div>
          <label
            htmlFor="monEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Monday End Time:
          </label>
          <input
            type="time"
            id="monEndTime"
            name="monEndTime"
            value={teacher.monEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Tuesday Start Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="tueStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Tuesday Start Time:
          </label>
          <input
            type="time"
            id="tueStartTime"
            name="tueStartTime"
            value={teacher.tueStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Tuesday End Time */}
        <div>
          <label
            htmlFor="tueEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Tuesday End Time:
          </label>
          <input
            type="time"
            id="tueEndTime"
            name="tueEndTime"
            value={teacher.tueEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Wednesday Start Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="wedStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Wednesday Start Time:
          </label>
          <input
            type="time"
            id="wedStartTime"
            name="wedStartTime"
            value={teacher.wedStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Wednesday End Time */}
        <div>
          <label
            htmlFor="wedEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Wednesday End Time:
          </label>
          <input
            type="time"
            id="wedEndTime"
            name="wedEndTime"
            value={teacher.wedEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Thursday Start Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="thurStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Thursday Start Time:
          </label>
          <input
            type="time"
            id="thurStartTime"
            name="thurStartTime"
            value={teacher.thurStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Thursday End Time */}
        <div>
          <label
            htmlFor="thurEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Thursday End Time:
          </label>
          <input
            type="time"
            id="thurEndTime"
            name="thurEndTime"
            value={teacher.thurEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Friday Start Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="friStartTime"
            className="block text-sm font-medium text-gray-600"
          >
            Friday Start Time:
          </label>
          <input
            type="time"
            id="friStartTime"
            name="friStartTime"
            value={teacher.friStartTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Friday End Time */}
        <div>
          <label
            htmlFor="friEndTime"
            className="block text-sm font-medium text-gray-600"
          >
            Friday End Time:
          </label>
          <input
            type="time"
            id="friEndTime"
            name="friEndTime"
            value={teacher.friEndTime}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Teacher
        </button>
      </div>
    </form>
  );
}

export default TeacherForm;
