"use client";

import { useRef } from "react";
import { DownloadTableExcel, useDownloadExcel } from "react-export-table-to-excel";


interface RoutineType {
    monday: Slot[];
    tuesday: Slot[];
    wednesday: Slot[];
    thursday: Slot[];
    friday: Slot[];
    saturday: Slot[];
    sunday: Slot[];
  }
  

  interface Slot {
    id: string;
    day: string;
    subjectName: string;
    teacherName: string;
    faculty: string;
    slot:string
}


const ViewRoutine = ()=>{



    const isLoading = false;


    const test = {
       
        sunday: [
            {
                id: "11",
                day: "Sunday",
                subjectName: "Physics",
                teacherName: "David Brown",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "12",
                day: "Sunday",
                subjectName: "Math",
                teacherName: "Emily Davis",
                faculty: "Mathematics",
                slot: "slot2"
            },
            {
                id: "13",
                day: "Sunday",
                subjectName: "English",
                teacherName: "Oliver Wilson",
                faculty: "Arts",
                slot: "slot3"
            },
            {
                id: "14",
                day: "Sunday",
                subjectName: "Geography",
                teacherName: "Sophia Martinez",
                faculty: "Social Sciences",
                slot: "slot4"
            }
        ],
        monday: [
            {
                id: "15",
                day: "Monday",
                subjectName: "Chemistry",
                teacherName: "Daniel Johnson",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "16",
                day: "Monday",
                subjectName: "Biology",
                teacherName: "Emma Anderson",
                faculty: "Science",
                slot: "slot2"
            },
            {
                id: "17",
                day: "Monday",
                subjectName: "History",
                teacherName: "William Thompson",
                faculty: "Social Sciences",
                slot: "slot3"
            },
            {
                id: "18",
                day: "Monday",
                subjectName: "Computer Science",
                teacherName: "Olivia Harris",
                faculty: "Technology",
                slot: "slot4"
            }
        ],
        tuesday: [
            {
                id: "19",
                day: "Tuesday",
                subjectName: "Physics",
                teacherName: "James Clark",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "20",
                day: "Tuesday",
                subjectName: "Math",
                teacherName: "Ava Lewis",
                faculty: "Mathematics",
                slot: "slot2"
            },
            {
                id: "21",
                day: "Tuesday",
                subjectName: "English",
                teacherName: "Noah Walker",
                faculty: "Arts",
                slot: "slot3"
            },
            {
                id: "22",
                day: "Tuesday",
                subjectName: "Geography",
                teacherName: "Isabella Green",
                faculty: "Social Sciences",
                slot: "slot4"
            }
        ],
        wednesday: [
            {
                id: "23",
                day: "Wednesday",
                subjectName: "Chemistry",
                teacherName: "Liam Hall",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "24",
                day: "Wednesday",
                subjectName: "Biology",
                teacherName: "Mia Young",
                faculty: "Science",
                slot: "slot2"
            },
            {
                id: "25",
                day: "Wednesday",
                subjectName: "History",
                teacherName: "Benjamin Lee",
                faculty: "Social Sciences",
                slot: "slot3"
            },
            {
                id: "26",
                day: "Wednesday",
                subjectName: "Computer Science",
                teacherName: "Charlotte Turner",
                faculty: "Technology",
                slot: "slot4"
            }
        ],
        thursday: [
            {
                id: "27",
                day: "Thursday",
                subjectName: "Physics",
                teacherName: "Lucas King",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "28",
                day: "Thursday",
                subjectName: "Math",
                teacherName: "Harper Scott",
                faculty: "Mathematics",
                slot: "slot2"
            },
            {
                id: "29",
                day: "Thursday",
                subjectName: "English",
                teacherName: "Ethan Adams",
                faculty: "Arts",
                slot: "slot3"
            },
            {
                id: "30",
                day: "Thursday",
                subjectName: "Geography",
                teacherName: "Amelia Baker",
                faculty: "Social Sciences",
                slot: "slot4"
            }
        ],
        friday: [
            {
                id: "31",
                day: "Friday",
                subjectName: "Chemistry",
                teacherName: "Logan Hill",
                faculty: "Science",
                slot: "slot1"
            },
            {
                id: "32",
                day: "Friday",
                subjectName: "Biology",
                teacherName: "Abigail Morris",
                faculty: "Science",
                slot: "slot2"
            },
            {
                id: "33",
                day: "Friday",
                subjectName: "History",
                teacherName: "Henry Turner",
                faculty: "Social Sciences",
                slot: "slot3"
            },
            {
                id: "34",
                day: "Friday",
                subjectName: "Computer Science",
                teacherName: "Ella Collins",
                faculty: "Technology",
                slot: "slot4"
            }
        ]
    }

    const tableRef = useRef(null);


    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Routine',
        sheet: 'routine'
    })




 


    return (
        <>
<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">



        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto" ref={tableRef}>
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Day
                </th>

                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Slot 1
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Slot 2
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Slot 3
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Slot 4
                </th>
              </tr>
            </thead>
            <tbody>
                {Object.keys(test).map((day) => (
                    <tr key={day}>
                        <td className="py-4 px-4 font-medium text-black dark:text-white">{day}</td>
                        <td className="py-4 px-4 font-medium text-black dark:text-white">{test?.[day]?.[0].subjectName} - {test?.[day]?.[0].teacherName}</td>
                        <td className="py-4 px-4 font-medium text-black dark:text-white">{test?.[day]?.[1].subjectName} - {test?.[day]?.[1].teacherName}</td>
                        <td className="py-4 px-4 font-medium text-black dark:text-white">{test?.[day]?.[2].subjectName} - {test?.[day]?.[2].teacherName}</td>
                        <td className="py-4 px-4 font-medium text-black dark:text-white">{test?.[day]?.[3].subjectName} - {test?.[day]?.[3].teacherName}</td>

              </tr>
                ))}







            
            </tbody>
          </table>
        </div>



      </div>   
      
      
        <button onClick={onDownload}> Export excel </button>
</>
)
}

export default ViewRoutine 
