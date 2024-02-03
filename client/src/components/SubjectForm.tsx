
import { useEffect, useState } from "react";
import axios from "axios";
import { authHttp } from "@/app/utils/http";
import { fetchSubjectsById, fetchTeachersById } from "@/app/utils/auth.api";
import { useQuery } from "react-query";
import { useParams, useRouter } from "next/navigation";

function SubjectForm() {
  const [subject, setSubject] = useState({
    name: "",
    faculty: "",
    semester: "",
    code: "",
  });

  const params = useParams();

  const {
    data: subjectsDetails,
    isLoading,
    isError,
  } = useQuery(["subjectedit", { id: params.id }], fetchSubjectsById, {
    enabled: !!params.id,
  });

  useEffect(() => {
    if (subjectsDetails) {
      setSubject({
        name: subjectsDetails.name,
        faculty: subjectsDetails.faculty,
        semester: subjectsDetails.semester,
        code: subjectsDetails.code
       
      });
    }
  }, [subjectsDetails]);

  const handleChange = (e: any) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authHttp({
        url: "/api/subjects",
        method: "POST",
        data: subject,
      });

      alert("Subject added successfully!");
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.error("There was an error adding the subject:", error);
      alert("Error adding subject.");
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
          value={subject.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Faculty */}
      <div className="mb-4">
        <label
          htmlFor="faculty"
          className="block text-sm font-medium text-gray-600"
        >
          Faculty:
        </label>
        <input
          type="text"
          id="faculty"
          name="faculty"
          value={subject.faculty}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Semester */}
      <div className="mb-4">
        <label
          htmlFor="semester"
          className="block text-sm font-medium text-gray-600"
        >
          Semester:
        </label>
        <input
          type="number"
          id="semester"
          name="semester"
          value={subject.semester}
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
          value={subject.code}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* Submit button */}
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Subject
        </button>
      </div>
    </form>
  );
}

export default SubjectForm;
