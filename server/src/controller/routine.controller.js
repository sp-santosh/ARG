const { v4: uuidv4 } = require('uuid');
import { FacultyRepository } from "../database/repositories/faculty.repo.js";
import { SlotRepository } from "../database/repositories/slot.repo.js";
import { CollegeRepository } from "../database/repositories/college.repo.js";
import { ChromosomeRepository } from "../database/repositories/chromosome.repo.js";

export class routineController{

    async createChromosome() {
        let chromosomeCreationCount = 0;
        while (chromosomeCreationCount < 6) {
            let chromosomeList = [];
            let locationCount = 0;
            for (let dayCount = 0; dayCount < 6; dayCount++) {
                for (let sectionCount = 0; sectionCount < 3; sectionCount++) {
                    for (let slotCount = 0; slotCount < 4; slotCount++) {
                        // Retrieving faculty information
                        const facultyId = sectionCount; // Assuming sectionCount is facultyId
                        const facultyName_slot = await FacultyRepository.findFacultyById(facultyId);
                        console.log("faculty name slot:" + facultyName_slot);

                        let leisureCount = 0;
                        let token = 1;
                        while (token === 1) {
                            const slotObj = await new SlotRepository.findSlotById(slotCount);
                            const slotCode = slotObj.code;
                            const startTime = slotObj.startTime;
                            const endTime = slotObj.endTime;
                            const collegeObj = await new CollegeRepository.findAll();
                            const collegeSize = collegeObj.length;
                            const reference = Math.floor(Math.random() * collegeSize);
                            const collegeData = await new CollegeRepository.findCollegeById(reference);
                            const facultyName_db = collegeData.faculty;
                            console.log("Faculty Db:" + facultyName_db);

                            const determineFacultyCode = await new FacultyRepository.findByClassName(facultyName_db);
                            const facultyCode = determineFacultyCode.code;
                            const scode = collegeData.subjectCode;
                            console.log("subject code:" + scode);

                            if (scode === "1111" || scode === "10001" || scode === "10000") {
                                leisureCount++;
                                console.log("leisureCount:" + leisureCount);
                                // slotCount = slotCount - 1;
                                console.log("inside if condition");
                            } else if ((scode !== "1111" && scode !== "10001" && scode !== "10000") || leisureCount > 10) {
                                console.log("inside else condition");
                                if (facultyName_slot === facultyName_db) {
                                    let teacherStartTime = collegeData.tueStartTime;
                                    let teacherEndTime = collegeData.tueEndTime;

                                    if (locationCount >= 12 && locationCount <= 23) {
                                        teacherStartTime = collegeData.wedStartTime;
                                        teacherEndTime = collegeData.wedEndTime;
                                    } else if (locationCount >= 24 && locationCount <= 35) {
                                        teacherStartTime = collegeData.thurStartTime;
                                        teacherEndTime = collegeData.thurEndTime;
                                    } else if (locationCount >= 36 && locationCount <= 47) {
                                        teacherStartTime = collegeData.friStartTime;
                                        teacherEndTime = collegeData.friEndTime;
                                    } else if (locationCount >= 48 && locationCount <= 59) {
                                        teacherStartTime = collegeData.sunStartTime;
                                        teacherEndTime = collegeData.sunEndTime;
                                    } else {
                                        teacherStartTime = collegeData.monStartTime;
                                        teacherEndTime = collegeData.monEndTime;
                                    }
                                    console.log("Teacher available time:" + teacherStartTime + " " + teacherEndTime);
                                    console.log("Slot time              " + startTime + " " + endTime);
                                    const allocatedRepetition = collegeData.classesPerWeek;
                                    console.log("Same faculty");
                                    if ((teacherStartTime <= startTime) && (teacherEndTime >= endTime)) {
                                        console.log("Within Available Time");
                                        console.log("Allocated workload " + allocatedRepetition);
                                        console.log("Within workload");
                                        const cSubjectCode = collegeData.subjectCode;
                                        const cTeacherCode = collegeData.teacherCode;
                                        locationCount = 0;
                                        chromosomeList.push(`${facultyCode}.${cTeacherCode}.${cSubjectCode}.${slotCode}`);
                                        console.log("Gene formed :" + chromosomeList);
                                        break;
                                    }
                                }
                            } else {
                                slotCount--;
                            }
                        }
                    }
                }
            }
            // Saving chromosome to the database
            const chromosome = new ChromosomeRepository();
            chromosome.chromo = chromosomeList;
            try {
                // Save the chromosome object
                await chromosome.saveChromosome(chromosome);
                console.log("Chromosome saved successfully!");
            } catch (error) {
                console.error("Error saving chromosome:", error);
            }
            // await splitDna(chromosomeId);
            chromosomeCreationCount++;
        }
        // Redirecting to crossover action
        // crossOver();
    }
}