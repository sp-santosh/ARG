"use client";

import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useQuery } from "react-query";
import { fetchFaculties, fetchRoutine } from "../utils/auth.api";

const slots = [
  { startTime: "07:10:00", endTime: "08:45:00" },
  { startTime: "08:45:00", endTime: "10:15:00" },
  { startTime: "11:00:00", endTime: "12:30:00" },
  { startTime: "12:30:00", endTime: "14:00:00" },
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

type DayOfWeek = (typeof days)[number];

interface RoutineSlot {
  id: string;
  day: DayOfWeek;
  subjectName: string;
  teacherName: string;
  faculty: string;
  startTime: string;
  endTime: string;
}

interface MappedSlot {
  Sunday?: RoutineSlot[];
  Monday?: RoutineSlot[];
  Tuesday?: RoutineSlot[];
  Wednesday?: RoutineSlot[];
  Thursday?: RoutineSlot[];
  Friday?: RoutineSlot[];
}

const ViewRoutine = () => {
  const tableRef = useRef(null);

  const [selectedFaculty, setSelectedFaculty] = useState("");

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Routine",
    sheet: "routine",
  });

  const { data: facultiesList, isLoading: facultyLoading } = useQuery(
    "faculties",
    fetchFaculties
  );

  const { data: routineData, isLoading } = useQuery(
    ["routines", { faculty: selectedFaculty }],
    fetchRoutine,
    {
      enabled: !!selectedFaculty,
    }
  );

  const facultyOptions =
    facultiesList?.map((e: any) => ({
      value: e.className,
      id: e.id,
    })) ?? [];

  const mapper = () => {
    const rawData: MappedSlot = {};
    const typedData = routineData as RoutineSlot[];

    if (typedData) {
      typedData.forEach((item) => {
        const { day, ...rest } = item;

        if (!rawData[day]) {
          rawData[day] = [];
        }

        rawData[day]?.push({ ...rest, day });
      });
    }

    return rawData;
  };
  const groupedData = mapper();

  const renderDays = (day: DayOfWeek) => {
    return slots.map((slot) => {
      const respectiveSlot = groupedData[day]?.find(
        (item) => item.startTime === slot.startTime
      );

      return (
        <td
          className=" font-light text-black dark:text-white border text-center"
          key={slot.startTime}
        >
          {respectiveSlot ? (
            <>
              <p>{respectiveSlot.subjectName}</p>
              <p>({respectiveSlot.teacherName})</p>
            </>
          ) : (
            "-"
          )}
        </td>
      );
    });
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option
        </label>
        <select
          id="faculty"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose Faculty</option>
          {facultyOptions.map((faculty: any) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.value}
            </option>
          ))}
        </select>
      </form>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto" ref={tableRef}>
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 ">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Day
                </th>

                {slots.map((slot) => (
                  <th
                    className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white border"
                    key={slot.startTime}
                  >
                    {slot.startTime}-{slot.endTime}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border">
                  <td className="py-4 px-4 font-medium text-black dark:text-white ">
                    {day}
                  </td>
                  {renderDays(day)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onDownload}
      >
        Export excel
      </button>
    </>
  );
};

export default ViewRoutine;
