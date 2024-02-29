"use client";

import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useQuery } from "react-query";
import { fetchFaculties, fetchRoutine, fetchSlots } from "../utils/auth.api";
import Navbar from "@/components/Navigation/Navbar";

interface SlotType {
  startTime: string;
  endTime: string;
}

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

  const { data: facultiesList } = useQuery("faculties", fetchFaculties);

  const { data: slots } = useQuery("slots", fetchSlots);

  const { data: routineData, isLoading } = useQuery(
    ["routines", { faculty: selectedFaculty }],
    fetchRoutine,
    {
      enabled: !!selectedFaculty,
      refetchInterval: 60000,
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
    return slots.map((slot: SlotType) => {
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
      <Navbar />

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
            <option key={faculty.id} value={faculty.className}>
              {faculty.value}
            </option>
          ))}
        </select>
      </form>

      <table className="w-full table-auto" ref={tableRef}>
        {selectedFaculty && (
          <>
            {routineData && routineData?.length > 0 ? (
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4 ">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Day
                      </th>

                      {slots.map((slot: SlotType) => (
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
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={onDownload}
                >
                  Export Routine to excel
                </button>
              </div>
            ) : (
              <div className="text-center m-10">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <h1 className="m-10">Routine Not Generated yet...</h1>
                </div>
              </div>
            )}
          </>
        )}
      </table>
    </>
  );
};

export default ViewRoutine;
