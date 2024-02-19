import { FacultyRepository } from "../database/repositories/faculty.repo.js";
import { SlotRepository } from "../database/repositories/slot.repo.js";
import { CollegeRepository } from "../database/repositories/college.repo.js";
import { ChromosomeRepository } from "../database/repositories/chromosome.repo.js";
import { FitnessRepository } from "../database/repositories/fitness.repo.js";
import { Fitness1Repository } from "../database/repositories/fitness1.repo.js";
import { Fitness2Repository } from "../database/repositories/fitness2.repo.js";
import { FinalDnaRepository } from "../database/repositories/finalDna.repo.js";
import { ActualDataRepository } from "../database/repositories/actualData.repo.js";

export class RoutineController{

    async createChromosome(req, res) {
        console.log("we are inside createChromosome");
        let chromosomeCreationCount = 0;
        const slotRepositoryInstance = new SlotRepository();
        const collegeRepositoryInstance = new CollegeRepository();
        const facultyRepositoryInstance = new FacultyRepository();
        while (chromosomeCreationCount < 6) {
            let chromosomeList = [];
            let locationCount = 0;
            for (let dayCount = 0; dayCount < 6; dayCount++) {
                for (let sectionCount = 1; sectionCount < 4; sectionCount++) {
                    for (let slotCount = 1; slotCount < 5; slotCount++) {
                        // Retrieving faculty information
                        const facultyId = sectionCount; // Assuming sectionCount is facultyId
                        const facultyName_slot = await facultyRepositoryInstance.findFacultyById(facultyId);
                        console.log("faculty name slot:" + facultyName_slot.className);

                        let leisureCount = 0;
                        // let token = 1;
                        // while (token === 1) {
                            const slotObj = await slotRepositoryInstance.findSlotById(slotCount);
                            const slotCode = slotObj.code;
                            const startTime = slotObj.startTime;
                            const endTime = slotObj.endTime;
                            const collegeObj = await collegeRepositoryInstance.findAll();
                            const collegeSize = collegeObj.length;
                            console.log("collegeSize:" + collegeSize);
                            let reference = Math.floor(Math.random() * collegeSize);
                            reference++;
                            console.log("reference:" + reference);
                            const newCollegeRepositoryInstance = new CollegeRepository();
                            const collegeData = await newCollegeRepositoryInstance.findCollegeById(reference);
                            console.log("college data" + collegeData.faculty);
                            const facultyName_db = collegeData.faculty;
                            console.log("Faculty Db:" + facultyName_db);

                            const determineFacultyCode = await facultyRepositoryInstance.findByClassName(facultyName_db);
                            console.log("F code:" + determineFacultyCode.code);
                            const facultyCode = determineFacultyCode.code;
                            const scode = collegeData.subjectCode;
                            console.log("subject code:" + scode);

                            if (scode === "1111" || scode === "10001" || scode === "10000") {
                                leisureCount++;
                                console.log("leisureCount:" + leisureCount);
                                // slotCount = slotCount - 1;
                                console.log("inside if condition");
                            } else if ((scode !== "1111" && scode !== "10001" && scode !== "10000") || leisureCount > 10) {
                                console.log("inside else condition" + facultyName_slot + "-----" + facultyName_db);

                                if (facultyName_slot.className === facultyName_db) {
                                    console.log("Inside if----------");
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
                        // }
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
            const chromosomeId = chromosome.id;
            console.log("chromosomeID:" + chromosomeId);
            await this.splitDna(chromosomeId);
            chromosomeCreationCount++;
        }
        
        res.status(200).json({ message: 'Chromosome created successfully' });
        // Redirecting to crossover action
        // crossOver();
    }

    async splitDna(id) {
        try {
            const chromosomeRepoInstance = new ChromosomeRepository();
            let chromosome = await chromosomeRepoInstance.findById(id);
            let chromos = chromosome.chromo.substring(1, chromosome.chromo.length - 1);
            
            let gene = chromos.split(",");
            console.log("genes" + gene);
            
            for (let i = 0; i < gene.length; i++) {
                console.log("gene" + i + ":" + gene[i]);
                
                let dna = gene[i].split(".");
                for (let j = 0; j < 3; j++) {
                    console.log("dna:" + dna[j]);
                }
                
                let fitness = new FitnessRepository();
                fitness.token = i;
                fitness.dnaC = dna[0].replace(/"/g, '');
                fitness.dnaT = dna[1];
                fitness.dnaS = dna[2];
                
                await fitness.save(fitness); 
            }
            
            await this.calculateFitness(id);
        } catch (error) {
            // Handle the error here
            console.error(error);
        }
    }

    async calculateFitness(id) {
        let fitnessValueH = 0;
        let fitnessValueS = 0;
    
        fitnessValueH = await this.hardConstraintH1();
        fitnessValueS = await this.softConstraintS1();
    
        console.log("fitnessHard:" + fitnessValueH);
        console.log("fitnessSoft:" + fitnessValueS);
    
        let totalFitness = fitnessValueH + fitnessValueS;
        console.log("Total Fitness:" + totalFitness);

    
        const chromosomeRepoInstance = new ChromosomeRepository();
        let chromo = await chromosomeRepoInstance.findById(id);
        chromo.fitness = totalFitness;
        chromo.fitnessHard = fitnessValueH;
        chromo.fitnessSoft = fitnessValueS;
    
        await chromo.save(chromo);
    
        // await new FitnessRepository.deleteMany({});
    }

    async hardConstraintH1() {
        let fitnessValue = 0;
        let fitnessValueH2 = 0;
        let dna = [];
        let fitnessRepo = new FitnessRepository();
        let fitnessCount = await fitnessRepo.findAll().length;
        for(let i = 0; i < fitnessCount; i++) {
            let fitness = await fitnessRepo.findByToken(i);
            dna[i] = fitness.dnaT;
            console.log("DNA " + i + fitness.dnaT);
        }
        let i, j, k, l;
        let ul;
        let ll = 0;
        let initial = 0;
        for(l = 0; l < 6; l++) {       //routine of 6 days a week
            for(i = initial; i < initial + 4; i++){
                ul = ll + 8;
                for(j = ll; j <= ul; j = j + 4){
                    for(k = j + 4; k <= ul; k = k + 4){     //+4 because same slot repeats after duration of 4
                        if(dna[j] == dna[k] && dna[j] != "11111"){        //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue - 5;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                        }
                    }
                }
                ll++;
            }
            ll = ll + 8;                //+8 because difference in routine between one section and last section is 8 periods here (will increase with increase in section)
            initial = initial + 12;     //+12 because routine of a day(eg sunday) consists of 12 dna (will increase will increase in section)
        }
        console.log("Fitness H1:" + fitnessValue);
        fitnessValueH2 = await this.hardConstraintH2(fitnessValue);
        return fitnessValueH2;
    }

    async softConstraintS1() {
        let fitnessValue = 0;
        let dna = [];
        let fitnessRepo = new FitnessRepository();
        
        let fitnessCount = await fitnessRepo.findAll().length;
        for(let i = 0; i < fitnessCount; i++) {
            let fitness = await fitnessRepo.findByToken(i);
            dna[i] = fitness.dnaS;
        }
        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] == dna[k]){
                        if(dna[j] == "1111") {
                            fitnessValue = fitnessValue + 10;
                        }
                        else {
                            fitnessValue = fitnessValue - 5;
                        }
                    }
                    else{
                        fitnessValue = fitnessValue + 10;
                    }
                }
            }
            ll = ul + 1;
            ul = ll + 3;
        }
        console.log("fitnessS1:" + fitnessValue);
        let fitnessvalueS1 = await this.softConstraintS2(fitnessValue);
        return fitnessvalueS1;
    }

    async hardConstraintH2(fitnessValue) {
        let fitnessValueH3 = 0;
        let fitnessRepo = new FitnessRepository();
        
        let fitnessCount = await fitnessRepo.findAll().length;
        for(let i = 0; i < fitnessCount; i++) {
            let code = await fitnessRepo.findByToken(i);
            let tcode = code.dnaT;
            if (tcode != "11111") {
                let collegeRepo = new CollegeRepository();
                let college = await collegeRepo.findByTeacherCode(tcode);
                let startTime;
                let endTime;
                if (i >= 0 && i <= 11) {
                    startTime = college.tueStartTime;
                    endTime = college.tueEndTime;
                } else if (i >= 12 && i <= 23) {
                    startTime = college.wedStartTime;
                    endTime = college.wedEndTime;
                } else if (i >= 24 && i <= 35) {
                    startTime = college.thurStartTime;
                    endTime = college.thurEndTime;
                } else if (i >= 36 && i <= 47) {
                    startTime = college.friStartTime;
                    endTime = college.friEndTime;
                } else if (i >= 48 && i <= 59) {
                    startTime = college.monStartTime;
                    endTime = college.monEndTime;
                } else {
                    startTime = college.sunStartTime;
                    endTime = college.sunEndTime;
                }
    
                let value = i % 4;
                let slotRepo = new SlotRepository();
                let slot = await slotRepo.findSlotById(value);
    
                let startTime1 = slot.startTime;
                let endTime1 = slot.endTime;
    
                if (startTime1 >= startTime && endTime1 <= endTime) {
                    fitnessValue = fitnessValue + 10;
                } else {
                    fitnessValue = fitnessValue - 5;
                }
            }
            else{
                fitnessValue = fitnessValue + 10;
            }
        }
        console.log("fitnessH2:" + fitnessValue);
    
        fitnessValueH3 = await this.hardConstraintH3(fitnessValue);
        return fitnessValueH3;
    }

    async hardConstraintH3(fitnessValue) {
        console.log("this is hard constraint h3");
        let collegeRepo = new CollegeRepository();
        let collegeWorkLoad = await collegeRepo.findAll();
        let facultyRepo = new FacultyRepository();
        
        
        let fitnessRepo = new FitnessRepository();
        let fitnessCount = await fitnessRepo.findAll().length;
        let size = collegeWorkLoad.length;
        for(let count = 0; count < size; count++){
            let comparisonCount = 0;      //This stores the number of occurence of the subject
            let collegeWorkLoad1 = await collegeRepo.findCollegeById(count + 1);
            let teacherCode = collegeWorkLoad1.teacherCode;
            let subjectCode = collegeWorkLoad1.subjectCode;
            let facultyCode1 = collegeWorkLoad1.faculty;
            let facultyCodeClass = await facultyRepo.findByClassName(facultyCode1);
            let facultyCode = facultyCodeClass.code;
            let workAllocated = collegeWorkLoad1.classesPerWeek;
            for(let loop = 0; loop < fitnessCount; loop++){
                let comparisonCollege = await fitnessRepo.findByToken(loop);       //retrieve gene from fitness1 table
                let rteacherCode = comparisonCollege.dnaT;
                let rsubjectCode = comparisonCollege.dnaS;
                let rfacultyCode = comparisonCollege.dnaC;
                if(rteacherCode != teacherCode || rsubjectCode != subjectCode || rfacultyCode != facultyCode){
                    // Do nothing
                }
                else{
                    comparisonCount++;
                }
            }
            if(workAllocated == comparisonCount - 1 || workAllocated == comparisonCount || workAllocated == comparisonCount + 1){
                fitnessValue = fitnessValue + 10;
            }
            else{
                let multiplier;
                if(comparisonCount < workAllocated){
                    multiplier = workAllocated - comparisonCount;
                }
                else{
                    multiplier = comparisonCount - workAllocated;
                }
                fitnessValue = fitnessValue - 5 * multiplier;
            }
        }
        console.log("fitness H3:" + fitnessValue);
        return fitnessValue;
    }
    
    async softConstraintS2(fitnessValue) {
        let insignificantLocation1 = 0;    //leisure period on 1st and last (4th) is not significant
        let insignificantLocation2 = 3;
        let leisure1 = "1111";
        let i, j;
        let k = 0;
        let fitnessRepo = new FitnessRepository();
        
        let fitnessCount = await fitnessRepo.findAll().length;
        for(i = 0; i < 18; i++){
            for(j = k; j < k + 4; j++){
                let fitness = await fitnessRepo.findByToken(j);
                let subjectCode = fitness.dnaS;
                if (subjectCode === leisure1){
                    if(j != insignificantLocation1 && j != insignificantLocation2) {
                        let fitness1 = await fitnessRepo.findByToken(j - 1);
                        let subjectCode1 = fitness1.dnaS; //Subject code one step behind location j
                        let fitness2 = await fitnessRepo.findByToken(j + 1);
                        let subjectCode2 = fitness2.dnaS; //Subject code one step ahead location j
                        if(subjectCode1 != leisure1 && subjectCode2 != leisure1){
                            fitnessValue = fitnessValue - 5;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                        }
                    }
                }
            }
            k = k + 4;
            insignificantLocation1 = insignificantLocation1 + 4;
            insignificantLocation2 = insignificantLocation2 + 4;
        }
        console.log("fitnessS2:" + fitnessValue);
        return fitnessValue;
    }


    async crossover(){
        let optimumFitness = 0;

        while (optimumFitness < threshold) {
            let chromosomeRepo = new ChromosomeRepository();
            let fitnessRepo = new FitnessRepository();
            let fitnessCount = fitnessRepo.findAll.length;
            let chromosome = await chromosomeRepo.findAll({ sort: "fitness", order: "desc" });
            let chromo = [];
            let fitness = [];
            chromo = chromosome.chromo;
            fitness = chromosome.fitness;
            for (let i = 0; i < 2; i++) {
                console.log("fitnessHIghhh:" + fitness[i]);
                console.log("Chromosome" + [i] + ":" + chromo[i]);
                console.log("size:" + chromo.length);
                let chromos = chromo[i].substring(1, chromo[i].length - 1).replace(/\s/g, "");

                let gene;
                let dna;
                gene = chromos.split(",");

                for (let j = 0; j < fitnessCount; j++) {
                    console.log("gene" + [j] + ":" + gene[j].replace(/\s/g, ""));
                    dna = gene[j].split("."); //split wrt "."
                    for (let k = 0; k < 4; k++) {
                        console.log("dna:" + dna[k].replace(/\s/g, ""));
                    }
                    if (i == 0) {
                        let fitness1 = new Fitness1Repository();
                        fitness1.token = j;
                        fitness1.dnaF = dna[0];
                        fitness1.dnaT = dna[1];
                        fitness1.dnaS = dna[2];
                        fitness1.dnaSl = dna[3];

                        await fitness1.save(fitness1);
                    } else {
                        let fitness2 = new Fitness1Repository();
                        fitness2.token = j;
                        fitness2.dnaF = dna[0];
                        fitness2.dnaT = dna[1];
                        fitness2.dnaS = dna[2];
                        fitness2.dnaSl = dna[3];

                        await fitness2.save(fitness2);
                    }
                }
                if(i == 0) {
                    await hardConstraintF1();
                }
                else {
                    await hardConstraintF2();
                }
            }
        }

        let randnum = Math.floor(Math.random() * 72);
        console.log("randnum:" + randnum);

        let seed1 = Math.floor(Math.random() * 100);
        let seed2 = Math.floor(Math.random() * 100);
        for (let i = 0; i < 72; i++) {
            let randnum1 = Math.floor(Math.random() * 10);
            let multiplier = 25;
            let increment = 1;
            let modulus = 72;
            let randnumFitness1 = (multiplier * seed1 + increment) % modulus;
            let randnumFitness2 = (multiplier * seed2 + increment) % modulus;
            seed1 = randnumFitness1;
            seed2 = randnumFitness2;

            let fitness1Repo = new Fitness1Repository();
            let fitnessDna1 = await fitness1Repo.findByToken(randnumFitness1);
            let dnaT1 = fitnessDna1.dnaT;
            let dnaS1 = fitnessDna1.dnaS;
            let dnaF1 = fitnessDna1.dnaF;

            let facultyRepo = new FacultyRepository();
            let findFaculty = await facultyRepo.findByCode(dnaF1);
            let facultyName1 = findFaculty.className;
            let timeReference1;
            let tStart1;
            let tEnd1;
            let indicator1 = fitnessDna1.indicator;

            let fitness2Repo = new Fitness2Repository();
            let fitnessDna2 = await fitness2Repo.findByToken(randnumFitness2);
            let dnaT2 = fitnessDna2.dnaT;
            let dnaS2 = fitnessDna2.dnaS;
            let dnaF2 = fitnessDna2.dnaF;

            let findFaculty2 = await facultyRepo.findByCode(dnaF2);
            let facultyName2 = findFaculty2.className;
            let timeReference2;
            let tStart2;
            let tEnd2;
            let indicator2 = fitnessDna2.indicator;
        }

        if(dnaF1 == dnaF2) {
            if ((indicator1 == 1) || (indicator2 == 1)) {
                if (randnum1 < 3) {
                    let collegeRepo = new CollegeRepository();
                    let collegeReference1 = await collegeRepo.findByTeacherCode(dnaT1);
                    let tStart1, tEnd1;
                    if (randnumFitness1 <= 11) {
                        tStart1 = collegeReference1.tueStartTime;
                        tEnd1 = collegeReference1.tueEndTime;
                    } else if (randnumFitness1 >= 12 && randnumFitness1 <= 23) {
                        tStart1 = collegeReference1.wedStartTime;
                        tEnd1 = collegeReference1.wedEndTime;
                    } else if (randnumFitness1 >= 24 && randnumFitness1 <= 35) {
                        tStart1 = collegeReference1.thurStartTime;
                        tEnd1 = collegeReference1.thurEndTime;
                    } else if (randnumFitness1 >= 36 && randnumFitness1 <= 47) {
                        tStart1 = collegeReference1.friStartTime;
                        tEnd1 = collegeReference1.friEndTime;
                    } else if (randnumFitness1 >= 48 && randnumFitness1 <= 59) {
                        tStart1 = collegeReference1.monStartTime;
                        tEnd1 = collegeReference1.monEndTime;
                    } else {
                        tStart1 = collegeReference1.sunStartTime;
                        tEnd1 = collegeReference1.sunEndTime;
                    }
        
                    let collegeReference2 = await collegeRepo.findByTeacherCode(dnaT2);
                    let tStart2, tEnd2;
                    if (randnumFitness2 <= 11) {
                        tStart2 = collegeReference2.tueStartTime;
                        tEnd2 = collegeReference2.tueEndTime;
                    } else if (randnumFitness2 >= 12 && randnumFitness2 <= 23) {
                        tStart2 = collegeReference2.wedStartTime;
                        tEnd2 = collegeReference2.wedEndTime;
                    } else if (randnumFitness2 >= 24 && randnumFitness2 <= 35) {
                        tStart2 = collegeReference2.thurStartTime;
                        tEnd2 = collegeReference2.thurEndTime;
                    } else if (randnumFitness2 >= 36 && randnumFitness2 <= 47) {
                        tStart2 = collegeReference2.friStartTime;
                        tEnd2 = collegeReference2.friEndTime;
                    } else if (randnumFitness2 >= 48 && randnumFitness2 <= 59) {
                        tStart2 = collegeReference2.monStartTime;
                        tEnd2 = collegeReference2.monEndTime;
                    } else {
                        tStart2 = collegeReference2.sunStartTime;
                        tEnd2 = collegeReference2.sunEndTime;
                    }
                }
            }
        }

        let slot1 = randnumFitness1 % 4;
        let slot2 = randnumFitness2 % 4;
        let slotReference1 = await Slot.findById(slot1);
        let slotReference2 = await Slot.findById(slot2);
        let slotStartTime1 = slotReference1.startTime;
        let slotEndTime1 = slotReference1.endTime;
        let slotStartTime2 = slotReference2.startTime;
        let slotEndTime2 = slotReference2.endTime;
        if ((tStart1 <= slotStartTime2) && (tEnd1 >= slotEndTime2)) {
            if ((tStart2 <= slotStartTime1) && (tEnd2 >= slotEndTime1)) {
                let temp1 = dnaT1;
                let temp2 = dnaS1;
                dnaT1 = dnaT2;
                dnaS1 = dnaS2;
                dnaT2 = temp1;
                dnaS2 = temp2;
            }
        }



        


    }

    async hardConstraintF1() {
        let fitnessValue = 0;
        let fitnessValueF11 = 0;
        let dna = [];
        let fitness1Repo = new Fitness1Repository();
        let fitness1RepoCount = await fitness1Repo.findAll().length;
    
        for(let i = 0; i < fitness1RepoCount; i++) {
            let fitness = await fitness1Repo.findByToken(i);
            dna[i] = fitness.dnaT;
        }
        let i, j, k, l;
        let ul;
        let ll = 0;
        let initial = 0;
        for(l = 0; l < 6; l++) {       //routine of 6 days a week
            for(i = initial; i < initial + 4; i++){
                ul = ll + 8;
                for(j = ll; j <= ul; j = j + 4){
                    for(k = j + 4; k <= ul; k = k + 4){
                        let fitness1 = await fitness1Repo.findByToken(j);
                        let fitness2 = await fitness1Repo.findByToken(k); //+4 because same slot repeats after duration of 4
    
                        if(dna[j] == dna[k] && dna[j] != "11111"){
                            //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue - 5;
                            fitness1.indicator = 1;
                            fitness2.indicator = 1;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                            fitness2.indicator = 0;
                            fitness1.indicator = 0;
                        }
                        await fitness1.save(fitness1);
                        await fitness2.save(fitness2);
                    }
                }
                ll++;
            }
            ll = ll + 8;                //+8 because difference in routine between one section and last section is 8 periods here (will increase with increase in section)
            initial = initial + 12;     //+12 because routine of a day(eg sunday) consists of 12 dna (will increase will increase in section)
        }
        fitnessValueF11 = await this.hardConstraintF11(fitnessValue);
        return fitnessValueF11;
    }

    async hardConstraintF11(fitnessValue) {
        let fitnessValueF111 = 0;
        let fitness1Repo = new Fitness1Repository();
        let fitness1Count = (await fitness1Repo.findAll()).length
        let collegeRepo = new CollegeRepository();
        let slotRepo = new SlotRepository();
        for(let i = 0; i < fitness1Count; i++) {
            let code = await fitness1Repo.findByToken(i);
            let tcode = code.dnaT;
            let presentindicator = code.indicator;
            if (presentindicator == 0){
                let fitness1 = await fitness1Count.findByToken(i);
                if (tcode != "11111") {
                    let college = await collegeRepo.findByTeacherCode(tcode);
                    let startTime;
                    let endTime;
                    if (i >= 0 && i <= 11) {
                        startTime = college.tueStartTime;
                        endTime = college.tueEndTime;
                    } else if (i >= 12 && i <= 23) {
                        startTime = college.wedStartTime;
                        endTime = college.wedEndTime;
                    } else if (i >= 24 && i <= 35) {
                        startTime = college.thurStartTime;
                        endTime = college.thurEndTime;
                    } else if (i >= 36 && i <= 47) {
                        startTime = college.friStartTime;
                        endTime = college.friEndTime;
                    } else if (i >= 48 && i <= 59) {
                        startTime = college.monStartTime;
                        endTime = college.monEndTime;
                    } else {
                        startTime = college.sunStartTime;
                        endTime = college.sunEndTime;
                    }
    
                    let value = i % 4;
    
                    let slot = await slotRepo.findById(value);
    
                    let startTime1 = slot.startTime;
                    let endTime1 = slot.endTime;
    
                    if (startTime1 >= startTime && endTime1 <= endTime) {
                        fitnessValue = fitnessValue + 10;
                        fitness1.indicator = 0;
                    } else {
                        fitnessValue = fitnessValue - 5;
                        fitness1.indicator = 1;
                    }
                } else {
                    fitnessValue = fitnessValue + 10;
                    fitness1.indicator = 0;
                }
                await fitness1Repo.save(fitness1);
            }
        }
        fitnessValueF111 = await this.hardConstraintF111(fitnessValue);
        return fitnessValueF111;
    }

    async hardConstraintF111(fitnessValue) {
        let collegeRepo = new CollegeRepository();
        let collegeWorkLoad = await collegeRepo.findAll();
        let facultyRepo = new FacultyRepository();
        let fitness1Repo = new Fitness1Repository();
        let size = collegeWorkLoad.length;
        for(let count = 0; count < size; count++){
            let comparisonCount = 0;      //This stores the number of occurence of the subject
            let collegeWorkLoad1 = await collegeRepo.findById(count + 1);
            let teacherCode = collegeWorkLoad1.teacherCode;
            let subjectCode = collegeWorkLoad1.subjectCode;
            let facultyCode1 = collegeWorkLoad1.faculty;
            let facultyCodeClass = await facultyRepo.findByClassName(facultyCode1);
            let facultyCode = facultyCodeClass.code;
            let workAllocated = collegeWorkLoad1.classesPerWeek;
            for(let loop = 0; loop < 72; loop++){
                let comparisonCollege = await fitness1Repo.findByToken(loop);       //retrieve gene from fitness1 table
                let presentIndicator = comparisonCollege.indicator;
                let rteacherCode = comparisonCollege.dnaT;
                let rsubjectCode = comparisonCollege.dnaS;
                let rfacultyCode = comparisonCollege.dnaF;
    
                if(rteacherCode != teacherCode || rsubjectCode != subjectCode || rfacultyCode != facultyCode){
                    // Do nothing
                }
                else{
                    comparisonCount++;
                }
                let indicatorWorkLoad = presentIndicator;
                if(comparisonCount > workAllocated + 1 || comparisonCount == 0){
                    indicatorWorkLoad = 1;
                }
                else{
                    if(presentIndicator == 0) {
                        indicatorWorkLoad = 0;
                    }
                }
                comparisonCollege.indicator = indicatorWorkLoad;
                await comparisonCollege.save(comparisonCollege);
            }
            if(workAllocated == comparisonCount - 1 || workAllocated == comparisonCount || workAllocated == comparisonCount + 1){
                fitnessValue = fitnessValue + 10;
            }
            else{
                let multiplier;
                if(comparisonCount < workAllocated){
                    multiplier = workAllocated - comparisonCount;
                }
                else{
                    multiplier = comparisonCount - workAllocated;
                }
                fitnessValue = fitnessValue - 5 * multiplier;
            }
        }
        return fitnessValue;
    }

    async softConstraintFS1() {
        let fitnessValue1 = 0;
        let dna = [];
        let fitness1Repo = new Fitness1Repository();
        let fitness1Count = await fitness1Repo.findAll().length;
        for(let i = 0; i < fitness1Count; i++) {
            let fitness = await fitness1Repo.findByToken(i);
            dna[i] = fitness.dnaS;
        }
        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] == dna[k]){
                        if(dna[j] == "1111") {
                            fitnessValue1 = fitnessValue1 + 10;
                        }
                        else {
                            fitnessValue1 = fitnessValue1 - 5;
                        }
                    }
                    else{
                        fitnessValue1 = fitnessValue1 + 10;
                    }
                }
            }
            ll = ul + 1;
            ul = ll + 3;
        }
        let fitnessvalueFS1 = await this.softConstraintFS11(fitnessValue1);
        return fitnessvalueFS1;
    }

    async softConstraintFS11(fitnessValue) {
        let insignificantLocation1 = 0;    //leisure period on 1st and last (4th) is not significant
        let insignificantLocation2 = 3;
        let leisure1 = "1111";
        let i, j;
        let k = 0;
        let fitness1Repo = new Fitness1Repository();
        let fitness1Count = await fitness1Repo.findAll().length;
        for(i = 0; i < 18; i++){
            for(j = k; j < k + 4; j++){
                let fitness = await fitness1Repo.findByToken(j);
                let subjectCode = fitness.dnaS;
                if (subjectCode === leisure1){
                    if(j != insignificantLocation1 && j != insignificantLocation2) {
                        let fitness1 = await fitness1Repo.findByToken(j - 1);
                        let subjectCode1 = fitness1.dnaS; //Subject code one step behind location j
                        let fitness2 = await fitness1Repo.findByToken(j + 1);
                        let subjectCode2 = fitness2.dnaS; //Subject code one step ahead location j
                        if(subjectCode1 != leisure1 && subjectCode2 != leisure1){
                            fitnessValue = fitnessValue - 5;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                        }
                    }
                }
            }
            k = k + 4;
            insignificantLocation1 = insignificantLocation1 + 4;
            insignificantLocation2 = insignificantLocation2 + 4;
        }
    
        return fitnessValue;
    }

    async hardConstraintF2() {
        let fitnessValue = 0;
        let fitnessValueF22 = 0;
        let dna = [];
        let fitness2 = new Fitness2Repository();
        let fitness2Count = await fitness2.findAll().length;
        for(let i = 0; i < fitness2Count; i++) {
            let fitness = await fitness2.findByToken(i);
            dna[i] = fitness.dnaT;
        }
        let i, j, k, l;
        let ul;
        let ll = 0;
        let initial = 0;
        for(l = 0; l < 6; l++) {       //routine of 6 days a week
            for(i = initial; i < initial + 4; i++){
                ul = ll + 8;
                for(j = ll; j <= ul; j = j + 4){
                    for(k = j + 4; k <= ul; k = k + 4){
                        let fitness1 = await fitness2Count.findByToken(j);
                        let fitness2 = await fitness2Count.findByToken(k); //+4 because same slot repeats after duration of 4
                        if(dna[j] == dna[k] && dna[j] != "11111"){        //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue - 5;
                            fitness1.indicator = 1;
                            fitness2.indicator = 1;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                            fitness1.indicator = 0;
                            fitness2.indicator = 0;
                        }
                        await fitness1.save(fitness1);
                        await fitness2.save(fitness2);
                    }
                }
                ll++;
            }
            ll = ll + 8;                //+8 because difference in routine between one section and last section is 8 periods here (will increase with increase in section)
            initial = initial + 12;     //+12 because routine of a day(eg sunday) consists of 12 dna (will increase will increase in section)
        }
        fitnessValueF22 = await this.hardConstraintF22(fitnessValue);
        return fitnessValueF22;
    }
    
    async hardConstraintF22(fitnessValue) {
        let fitnessValueF222 = 0;
        let fitness2Repo = new Fitness2Repository();
        let slotRepo = new SlotRepository();
        let collegeRepo = new CollegeRepository();
        let fitness2Count = await fitness2Repo.findAll().length;
        for(let i = 0; i < 72; i++) {
            let code = await fitness2Repo.findByToken(i);
            let tcode = code.dnaT;
            let presentIndicator = code.indicator;
            let fitness1 = await fitness2Repo.findByToken(i);
            fitness1.indicator = presentIndicator;
            if (tcode != "11111") {
                let college = await collegeRepo.findByTeacherCode(tcode);
                let startTime;
                let endTime;
                if (i >= 0 && i <= 11) {
                    startTime = college.tueStartTime;
                    endTime = college.tueEndTime;
                } else if (i >= 12 && i <= 23) {
                    startTime = college.wedStartTime;
                    endTime = college.wedEndTime;
                } else if (i >= 24 && i <= 35) {
                    startTime = college.thurStartTime;
                    endTime = college.thurEndTime;
                } else if (i >= 36 && i <= 47) {
                    startTime = college.friStartTime;
                    endTime = college.friEndTime;
                } else if (i >= 48 && i <= 59) {
                    startTime = college.satStartTime;
                    endTime = college.satEndTime;
                } else {
                    startTime = college.sunStartTime;
                    endTime = college.sunEndTime;
                }
    
                let value = i % 4;
    
                let slot = await slotRepo.findById(value);
    
                let startTime1 = slot.startTime;
                let endTime1 = slot.endTime;
    
                if (startTime1 >= startTime && endTime1 <= endTime) {
                    fitnessValue = fitnessValue + 10;
                    if(presentIndicator == 0) {
                        fitness1.indicator = 0;
                    }
                } else {
                    fitnessValue = fitnessValue - 5;
                    fitness1.indicator = 1;
                }
            }
            else{
                fitnessValue = fitnessValue + 10;
                if(presentIndicator == 0) {
                    fitness1.indicator = 0;
                }
            }
            await fitness1.save(fitness1);
        }
        fitnessValueF222 = await this.hardConstraintF222(fitnessValue);
        return fitnessValueF222;
    }
    
    async hardConstraintF222(fitnessValue) {
        let collegeRepo = new CollegeRepository();
        let facultyRepo = new FacultyRepository();
        let fitness2Repo = new Fitness2Repository();
        let collegeWorkLoad = await collegeRepo.findAll();
        let size = collegeWorkLoad.length;
        for(let count = 0; count < size; count++){
            let comparisonCount = 0;      //This stores the number of occurence of the subject
            let collegeWorkLoad1 = await collegeRepo.findById(count + 1);
            let teacherCode = collegeWorkLoad1.teacherCode;
            let subjectCode = collegeWorkLoad1.subjectCode;
            let facultyCode1 = collegeWorkLoad1.faculty;
            let facultyCodeClass = await facultyRepo.findByClassName(facultyCode1);
            let facultyCode = facultyCodeClass.code;
            let workAllocated = collegeWorkLoad1.classesPerWeek;
            for(let loop = 0; loop < 72; loop++){
                let comparisonCollege = await fitness2Repo.findByToken(loop);       //retrieve gene from fitness1 table
                let rteacherCode = comparisonCollege.dnaT;
                let rsubjectCode = comparisonCollege.dnaS;
                let rfacultyCode = comparisonCollege.dnaF;
                let presentIndicator = comparisonCollege.indicator;
                if(rteacherCode != teacherCode || rsubjectCode != subjectCode || rfacultyCode != facultyCode){
                    // Do nothing
                }
                else{
                    comparisonCount++;
                }
                let indicatorWorkLoad = presentIndicator;
                if(comparisonCount > workAllocated + 1){
                    indicatorWorkLoad = 1;
                }
                else{
                    if(presentIndicator == 0) {
                        indicatorWorkLoad = 0;
                    }
                }
                comparisonCollege.indicator = indicatorWorkLoad;
                await comparisonCollege.save(comparisonCollege);
            }
            if(workAllocated == comparisonCount - 1 || workAllocated == comparisonCount || workAllocated == comparisonCount + 1){
                fitnessValue = fitnessValue + 10;
            }
            else{
                let multiplier;
                if(comparisonCount < workAllocated){
                    multiplier = workAllocated - comparisonCount;
                }
                else{
                    multiplier = comparisonCount - workAllocated;
                }
                fitnessValue = fitnessValue - 5 * multiplier;
            }
        }
        return fitnessValue;
    }
    
    async softConstraintFS2() {
        let fitnessValue1 = 0;
        let dna = [];

        let fitness2repo = new Fitness2Repository();
        let count = await fitness2repo.findAll().length;
    
        for(let i = 0; i < count; i++) {
            let fitness = await fitness2repo.findByToken(i);
            dna[i] = fitness.dnaS;
        }
        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] == dna[k]){
                        if(dna[j] == "1111") {
                            fitnessValue1 = fitnessValue1 + 10;
                        }
                        else {
                            fitnessValue1 = fitnessValue1 - 5;
                        }
                    }
                    else{
                        fitnessValue1 = fitnessValue1 + 10;
                    }
                }
            }
            ll = ul + 1;
            ul = ll + 3;
        }
        let fitnessvalueFS2 = await this.softConstraintFS22(fitnessValue1);
        return fitnessvalueFS2;
    }

    async softConstraintFS22(fitnessValue) {
        let insignificantLocation1 = 0;    //leisure period on 1st and last (4th) is not significant
        let insignificantLocation2 = 3;
        let leisure1 = "1111";
        let k = 0;
        let fitness2Repo = new Fitness2Repository();
        for(let i = 0; i < 18; i++){
            for(let j = k; j < k + 4; j++){
                let fitness = await fitness2Repo.findByToken(j);
                let subjectCode = fitness.dnaS;
                if (subjectCode === leisure1){
                    if(j !== insignificantLocation1 && j !== insignificantLocation2) {
                        let fitness1 = await fitness2Repo.findByToken(j - 1);
                        let subjectCode1 = fitness1.dnaS; //Subject code one step behind location j
                        let fitness2 = await fitness2Repo.findByToken(j + 1);
                        let subjectCode2 = fitness2.dnaS; //Subject code one step ahead location j
                        if((subjectCode1 !== leisure1) && (subjectCode2 !== leisure1)){
                            fitnessValue = fitnessValue; //-5
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                        }
                    }
                }
            }
            k = k + 4;
            insignificantLocation1 = insignificantLocation1 + 4;
            insignificantLocation2 = insignificantLocation2 + 4;
        }
    
        return fitnessValue;
    }
    
    async createChildChromosome(totalFitness1, totalFitness2, hfitnessValue1, sfitnessValue1, hfitnessValue2, sfitnessValue2) {
        let wholeCode;
        let myList = [];
        let wholeCode1;
        let myList1 = [];

        let fitness1Repo = new Fitness1Repository();
        for(let i = 0; i < 72; i++) {
            let fitness1 = await fitness1Repo.findByToken(i);
            let dnaF = fitness1.dnaF;
            let dnaT = fitness1.dnaT;
            let dnaS = fitness1.dnaS;
            let dnaSl = fitness1.dnaSl;
    
            wholeCode = dnaF + "." + dnaT + "." + dnaS + "." + dnaSl;
    
            myList.push(wholeCode);
        }
    
        let chromosome = new ChromosomeRepository();
        chromosome.chromo = myList;
        chromosome.fitness = totalFitness1;
        chromosome.fitnessHard = hfitnessValue1;
        chromosome.fitnessSoft = sfitnessValue1;
        console.log("mylist:", myList);
        await chromosome.save(chromosome);
        await fitness1Repo.deleteAll();
        
        let fitness2Repo = new Fitness2Repository();
        let count = await fitness2Repo.findAll().length;
        for(let i = 0; i < count; i++) {
            let fitness2 = await fitness2Repo.findByToken(i);
            let dnaF = fitness2.dnaF;
            let dnaT = fitness2.dnaT;
            let dnaS = fitness2.dnaS;
            let dnaSl = fitness2.dnaSl;
    
            wholeCode1 = dnaF + "." + dnaT + "." + dnaS + "." + dnaSl;
            myList1.push(wholeCode1);
        }
    
        let chromosome1 = new ChromosomeRepository();
        chromosome1.chromo = myList1;
        chromosome1.fitness = totalFitness2;
        chromosome1.fitnessHard = hfitnessValue2;
        chromosome1.fitnessSoft = sfitnessValue2;
        console.log("mylist1:", myList1);
    
        await chromosome1.save(chromosome1);
        await fitness2Repo.deleteAll();
    }
    
    async storeCode() {
        let optimumFitness = params.optimumFitness;
        console.log("optimumFitmess:", optimumFitness);
        let chromoRepo = new ChromosomeRepository();
        let chromosome = await chromoRepo.findByFitnessHard(optimumFitness);
        let chromosome1 = chromosome.chromo;
        let size = chromosome1.length;
        let chromos = chromosome.chromo.substring(1, size - 1);
        let gene;
        let dna;
        gene = chromos.split(",");
        for(let i = 0; i < 72; i++) {
            console.log("gene" + i + ":", gene[i].trim());
            dna = gene[i].split(".");
            for (let j = 0; j < 4; j++) {
                console.log("dna:", dna[j].trim());
            }
            let finalDna = new FinalDnaRepository();
            finalDna.faculty = dna[0];
            finalDna.teacher = dna[1];
            finalDna.subject = dna[2];
            finalDna.slot = dna[3];
            finalDna.token = i;
    
            await finalDna.save(finalDna);
        }
        // redirect(action: 'storeActualData'); // You'll need to replace this with the equivalent in your Node.js environment
    }

    async storeActualData() {
        let finalDnaRepo = new FinalDnaRepository();
        let slotRepo = new SlotRepository();
        let subjectRepo = new SubjectRepository();
        let facultyRepo = new FacultyRepository();
        let collegeRepo = new CollegeRepository();

        let count = await finalDnaRepo.findAll().length;
        for(let i = 0; i < count; i++){
            let finalDna = await finalDnaRepo.findByToken(i);
            let time = finalDna.slot.trim();
            let teacher = finalDna.teacher.trim();
            let subject = finalDna.subject.trim();
            let faculty = finalDna.faculty.trim();
    
            let slot = await slotRepo.findByCode(time);
            let startTime = slot.startTime;
            let endTime = slot.endTime;
    
            let subject1 = await subjectRepo.findByCode(subject);
            let sname = subject1.name;
    
            let faculty1 = await facultyRepo.findByCode(faculty);
            let faculty11 = faculty1.className;
    
            let teacher1 = await collegeRepo.findByTeacherCodeAndSubjectCodeAndFaculty(teacher, subject, faculty11);
            let tname = teacher1.teacher;
    
            let actualData = new ActualDataRepository();
    
            actualData.startTime = startTime;
            actualData.endTime = endTime;
            actualData.teacherName = tname;
            actualData.subjectName = sname;
            actualData.faculty = faculty11;
            actualData.token = i;
            if (i >= 0 && i <= 11) {
                actualData.day = "Tuesday";
            } else if (i >= 12 && i <= 23) {
                actualData.day = "Wednesday";
            } else if (i >= 24 && i <= 35) {
                actualData.day = "Thursday";
            } else if (i >= 36 && i <= 47) {
                actualData.day = "Friday";
            } else if (i >= 48 && i <= 59) {
                actualData.day = "Saturday";
            } else {
                actualData.day = "Monday";
            }
    
            await actualData.save(actualData);
        }
        // redirect(action: "viewRoutine"); // You'll need to replace this with the equivalent in your Node.js environment
    }
    
    

    
    

    
    
    


    
}