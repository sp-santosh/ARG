"use client"; 
import React, { useState } from 'react';

const CollagePage: React.FC = () => {
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    // Replace the options with your actual data
    const facultyOptions = ['Faculty 1', 'Faculty 2', 'Faculty 3'];
    const teacherOptions = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
    const subjectOptions = ['Subject 1', 'Subject 2', 'Subject 3'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center">Collage Page</h1>

                <div className="flex flex-col items-start mb-4 w-full">
                    <label htmlFor="faculty" className="mb-2 font-bold text-lg text-gray-900">Faculty:</label>
                    <select
                        id="faculty"
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
                    >
                        <option value="">Select Faculty</option>
                        {facultyOptions.map((faculty) => (
                            <option key={faculty} value={faculty}>
                                {faculty}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-start mb-4 w-full">
                    <label htmlFor="teacher" className="mb-2 font-bold text-lg text-gray-900">Teacher:</label>
                    <select
                        id="teacher"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
                    >
                        <option value="">Select Teacher</option>
                        {teacherOptions.map((teacher) => (
                            <option key={teacher} value={teacher}>
                                {teacher}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-start mb-4 w-full">
                    <label htmlFor="subject" className="mb-2 font-bold text-lg text-gray-900">Subject:</label>
                    <select
                        id="subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
                    >
                        <option value="">Select Subject</option>
                        {subjectOptions.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollagePage;