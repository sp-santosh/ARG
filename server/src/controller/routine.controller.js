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
        let chromosomeCreationCount = 0;
        const slotRepositoryInstance = new SlotRepository();
        const collegeRepositoryInstance = new CollegeRepository();
        const facultyRepositoryInstance = new FacultyRepository();
        while (chromosomeCreationCount < 6) {
            let chromosomeList = [];
            let locationCount = 0;
            for (let dayCount = 0; dayCount < 6; dayCount++) {
                let leisureCount = 0;
                for (let sectionCount = 0; sectionCount < 3; sectionCount++) {
                    
                    for (let slotCount = 0; slotCount < 4; slotCount++) {
                        // Retrieving faculty information
                        const facultyId = sectionCount; // Assuming sectionCount is facultyId
                        const facultyName_slot = await facultyRepositoryInstance.findFacultyById(facultyId);

                        // let token = 1;
                        // while (token === 1) {
                            const slotObj = await slotRepositoryInstance.findSlotById(slotCount);
                            const slotCode = slotObj.code;
                            const startTime = slotObj.startTime;
                            const endTime = slotObj.endTime;
                            const collegeObj = await collegeRepositoryInstance.findAll();
                            const collegeSize = collegeObj.length;
                            let reference = Math.floor(Math.random() * collegeSize);
                            reference++;
                            const newCollegeRepositoryInstance = new CollegeRepository();
                            const collegeData = await newCollegeRepositoryInstance.findCollegeById(reference);
                            const facultyName_db = collegeData.faculty;

                            const determineFacultyCode = await facultyRepositoryInstance.findByClassName(facultyName_db);
                            const facultyCode = determineFacultyCode.code;
                            const scode = collegeData.subjectCode;
                            if (scode === "100000000" || scode === "100000001" || scode === "100000011") {
                                leisureCount = leisureCount + 1;
                                //slotCount = slotCount - 1
                            } else if ((scode !== "100000000" && scode !== "100000001" && scode !== "100000011") || leisureCount > 10) {
                                if (facultyName_slot.className === facultyName_db) {
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
                                    const allocatedRepetition = collegeData.classesPerWeek;
                                    if ((teacherStartTime <= startTime) && (teacherEndTime >= endTime)) {
                                        const cSubjectCode = collegeData.subjectCode;
                                        const cTeacherCode = collegeData.teacherCode;
                                        chromosomeList.push(`${facultyCode}.${cTeacherCode}.${cSubjectCode}.${slotCode}`);
                                        break;
                                    }
                                }
                             } else {
                                slotCount--;
                            }
                            
                    locationCount++;
                    }
                }
                
            }
            // Saving chromosome to the database
            const chromosome = new ChromosomeRepository();
            chromosome.chromo = chromosomeList;
            try {
                // Save the chromosome object
                await chromosome.saveChromosome(chromosome);
            } catch (error) {
                console.error("Error saving chromosome:", error);
            }
            const chromosomeId = chromosome.id;
            await this.splitDna(chromosomeId);
            chromosomeCreationCount++;
        }
        
        res.status(200).json({ message: 'Chromosome created successfully' });
        // Redirecting to crossover action
        await this.crossOver();
    }

    async splitDna(id) {
        try {
            const chromosomeRepoInstance = new ChromosomeRepository();
            let chromosome = await chromosomeRepoInstance.findById(id);
            let chromos = chromosome.chromo.substring(1, chromosome.chromo.length - 1);
            
            let gene = chromos.split(",");
            
            for (let i = 0; i < gene.length; i++) {
                
                let dna = gene[i].split(".");
                
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
        let fitnessRepo = new FitnessRepository();
    
        fitnessValueH = await this.hardConstraintH1();
        fitnessValueS = await this.softConstraintS1();
    
        let totalFitness = fitnessValueH + fitnessValueS;
    
        const chromosomeRepoInstance = new ChromosomeRepository();
        let chromo = await chromosomeRepoInstance.findById(id);
        chromo.fitness = totalFitness;
        chromo.fitnessHard = fitnessValueH;
        chromo.fitnessSoft = fitnessValueS;
    
        await chromosomeRepoInstance.saveChromosome(chromo);
        let fitnessList =  await fitnessRepo.findAll();
        let fitnessCount = fitnessList.length;
        if(fitnessCount > 0){
            
        await fitnessRepo.deleteAll();
        }
    }

    async hardConstraintH1() {
        let fitnessValue = 0;
        let fitnessValueH2 = 0;
        let dna = [];
        let fitnessRepo = new FitnessRepository();
        let fitnessList = await fitnessRepo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaT);
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
                        if(dna[j] === dna[k] && dna[j] !== "1111111") {      //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue;// - 5;
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
        fitnessValueH2 = await this.hardConstraintH2(fitnessValue);
        return fitnessValueH2;
    }

    async softConstraintS1() {
        let fitnessValue = 0;
        let dna = [];
        let fitnessRepo = new FitnessRepository();
        
         let fitnessList = await fitnessRepo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaT);
        }

        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] === dna[k]){
                        if(dna[j] === '100000000')
                        {
                            
                            fitnessValue = fitnessValue + 10;
                        }else{
                            
                            fitnessValue = fitnessValue;
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
        let fitnessvalueS1 = await this.softConstraintS2(fitnessValue);
        return fitnessvalueS1;
    }

    async hardConstraintH2(fitnessValue) {
        let fitnessValueH3 = 0;
        let fitnessRepo = new FitnessRepository();
        
        let fitnessList = await fitnessRepo.findAll();
        let fitnessCount = fitnessList.length;
        for(let i = 0; i < fitnessCount; i++) {
            let code = await fitnessRepo.findByToken(i);
            if(code){
                let tcode = code.dnaT;
                if(tcode !== '1111111'){
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
                    fitnessValue = fitnessValue;// - 5;
                }
                }
            }
        }
    
        fitnessValueH3 = await this.hardConstraintH3(fitnessValue);
        return fitnessValueH3;
    }

    async hardConstraintH3(fitnessValue) {
        let collegeRepo = new CollegeRepository();
        let collegeWorkLoad = await collegeRepo.findAll();
        let facultyRepo = new FacultyRepository();
        
        
        let fitnessRepo = new FitnessRepository();
        let fitnessList = await fitnessRepo.findAll();
        let fitnessCount = fitnessList.length;
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
                let comparisonCollege = await fitnessRepo.findByToken(loop);
                
                if(comparisonCollege){      //retrieve gene from fitness1 table
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
            }
            if(workAllocated === comparisonCount - 1 || workAllocated === comparisonCount || workAllocated === comparisonCount + 1){

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
                fitnessValue = fitnessValue - 5;// * multiplier;
            }
        }
        return fitnessValue;
    }
    
    async softConstraintS2(fitnessValue) {
        let insignificantLocation1 = 0;
        let insignificantLocation2 = 3;
        let leisure1 = "100000000";
        let i, j;
        let k = 0;
        let fitnessRepo = new FitnessRepository();
        for(i = 0; i < 18; i++){
            for(j = k; j < k + 4; j++){
                let fitness = await fitnessRepo.findByToken(j);
                if(fitness){
                    let subjectCode = fitness.dnaS;
                    if(subjectCode === leisure1){
                        console.log("subuject code === liesure s2");
                    if(j != insignificantLocation1 && j != insignificantLocation2) {
                        let fitness1 = await fitnessRepo.findByToken(j - 1);
                        let fitness2 = await fitnessRepo.findByToken(j + 1);
                        if(fitness1 && fitness2){
                            let subjectCode1 = fitness1.dnaS; //Subject code one step behind location j
                            let subjectCode2 = fitness2.dnaS; //Subject code one step ahead location j
                            if(subjectCode1 !== leisure1 && subjectCode2 !== leisure1){
                                fitnessValue = fitnessValue;
                            } else {
                                fitnessValue = fitnessValue + 10;
                            }
                        }
                        
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

    async calculateThreshold() {
        let collegeRepo = new CollegeRepository();
        let collegeThreshold = await collegeRepo.findAll();
        const thresholdFinal = 720 + 720 + collegeThreshold.length * 10 - 100;
        const threshold = thresholdFinal;
        console.log('Threshold: ' + threshold);
        return threshold;
    }
    


    async crossOver(){
        let optimumFitness = 0;
        let threshold = await this.calculateThreshold();
        while (optimumFitness < threshold) {
            let chromosomeRepo = new ChromosomeRepository();
            let fitnessRepo = new FitnessRepository();
            let slotRepo = new SlotRepository();
            let chromosome = await chromosomeRepo.findAll();
            console.log("Chromosome: " + JSON.stringify(chromosome));
            let chromo = chromosome.map(c => c.chromo);
            for (let i = 0; i < 2; i++) {
                let chromos = chromo[i].substring(1, chromo[i].length - 1).replace(/\s/g, "");

                let gene;
                let dna;
                gene = chromos.split(",");

                for (let j = 0; j < gene.length; j++) {
                    dna = gene[j].split("."); //split wrt "."
                    
                    if (i === 0) {
                        let fitness1 = new Fitness1Repository();
                        fitness1.token = j;
                        fitness1.dnaF = dna[0].replace(/"/g, '');
                        fitness1.dnaT = dna[1];
                        fitness1.dnaS = dna[2];
                        fitness1.dnaSl = dna[3].replace(/"/g, '');;

                        await fitness1.save(fitness1);
                    } else {
                        let fitness2 = new Fitness2Repository();
                        fitness2.token = j;
                        fitness2.dnaF = dna[0].replace(/"/g, '');;
                        fitness2.dnaT = dna[1];
                        fitness2.dnaS = dna[2];
                        fitness2.dnaSl = dna[3].replace(/"/g, '');;

                        await fitness2.save(fitness2);
                    }
                }
            }

                let randnum = Math.floor(Math.random() * 72);

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
                let fitness2Repo = new Fitness2Repository();
                let fitnessDna2 = await fitness2Repo.findByToken(randnumFitness2);
                if(fitnessDna1 && fitnessDna2){
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

                
                let dnaT2 = fitnessDna2.dnaT;
                let dnaS2 = fitnessDna2.dnaS;
                let dnaF2 = fitnessDna2.dnaF;

                let findFaculty2 = await facultyRepo.findByCode(dnaF2);
                let facultyName2 = findFaculty2.className;
                let timeReference2;
                let tStart2;
                let tEnd2;
                let indicator2 = fitnessDna2.indicator;
                
                let collegeRepo = new CollegeRepository();

                if(dnaF1 === dnaF2) {
                    if ((indicator1 === 1) || (indicator2 === 1)) {
                    if (randnum1 < 3) {
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
                        } else if (randnumFitness2 >= 60 && randnumFitness2 <= 71) {
                            tStart2 = collegeReference2.sunStartTime;
                            tEnd2 = collegeReference2.sunEndTime;
                        }

                let slot1 = randnumFitness1 % 4;
                let slot2 = randnumFitness2 % 4;
                let slotReference1 = await slotRepo.findSlotById(slot1);
                let slotReference2 = await slotRepo.findSlotById(slot2);
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
                } else {
                    if (randnum1 < 2) {
                        //cross over with probability 2/10 if indicator indicates it is fit
                        let collegeReference1 = await collegeRepo.findByTeacherCode(dnaT1);
                        if (randnumFitness1 <= 11) {
                            tStart1 = collegeReference1.tueStartTime;
                            tEnd1 = collegeReference1.tueEndTime;
                        }
                        if (randnumFitness1 >= 12 && randnumFitness1 <= 23) {
                            tStart1 = collegeReference1.wedStartTime;
                            tEnd1 = collegeReference1.wedEndTime;
                        }
                        if (randnumFitness1 >= 24 && randnumFitness1 <= 35) {
                            tStart1 = collegeReference1.thurStartTime;
                            tEnd1 = collegeReference1.thurEndTime;
                        }
                        if (randnumFitness1 >= 36 && randnumFitness1 <= 47) {
                            tStart1 = collegeReference1.friStartTime;
                            tEnd1 = collegeReference1.friEndTime;
                        }
                        if (randnumFitness1 >= 48 && randnumFitness1 <= 59) {
                            tStart1 = collegeReference1.monStartTime;
                            tEnd1 = collegeReference1.monEndTime;
                        }
                        if (randnumFitness1 >= 60 && randnumFitness1 <= 71) {
                            tStart1 = collegeReference1.sunStartTime;
                            tEnd1 = collegeReference1.sunEndTime;
                        }

                        let collegeReference2 = await collegeRepo.findByTeacherCode(dnaT2);
                        if (randnumFitness2 <= 11) {
                            tStart2 = collegeReference2.tueStartTime;
                            tEnd2 = collegeReference2.tueEndTime;
                        }
                        if (randnumFitness2 >= 12 && randnumFitness2 <= 23) {
                            tStart2 = collegeReference2.wedStartTime;
                            tEnd2 = collegeReference2.wedEndTime;
                        }
                        if (randnumFitness2 >= 24 && randnumFitness2 <= 35) {
                            tStart2 = collegeReference2.thurStartTime;
                            tEnd2 = collegeReference2.thurEndTime;
                        }
                        if (randnumFitness2 >= 36 && randnumFitness2 <= 47) {
                            tStart2 = collegeReference2.friStartTime;
                            tEnd2 = collegeReference2.friEndTime;
                        }
                        if (randnumFitness2 >= 48 && randnumFitness2 <= 59) {
                            tStart2 = collegeReference2.monStartTime;
                            tEnd2 = collegeReference2.monEndTime;
                        }
                        if (randnumFitness2 >= 60 && randnumFitness2 <= 71) {
                            tStart2 = collegeReference2.sunStartTime;
                            tEnd2 = collegeReference2.sunEndTime;
                        }
                        let slot1 = randnumFitness1 % 4;
                        let slot2 = randnumFitness2 % 4;
                        let slotReference1 = await slotRepo.findSlotById(slot1);
                        let slotReference2 = await slotRepo.findSlotById(slot2);
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
                        }
                    }


                    fitnessDna1.dnaT = dnaT1;
                    fitnessDna1.dnaS = dnaS1;
                    fitnessDna2.dnaT = dnaT2;
                    fitnessDna2.dnaS = dnaS2;

                    fitness1Repo.save(fitnessDna1);
                    fitness2Repo.save(fitnessDna2);
                }
                }
                    await this.mutation();

                    let hfitnessValue1 = await this.hardConstraintF1();
                    let sfitnessValue1 = await this.softConstraintFS1();

                    let hfitnessValue2 = await this.hardConstraintF2();
                    let sfitnessValue2 = await this.softConstraintFS2();

                    let totalFitness1 = hfitnessValue1 + sfitnessValue1;
                    let totalFitness2 = hfitnessValue2 + sfitnessValue2;

                    await this.createChildChromosome(totalFitness1, totalFitness2, hfitnessValue1, sfitnessValue1, hfitnessValue2, sfitnessValue2);
                    console.log("hfv1= " + hfitnessValue1 + ">?" + "hfv2" + hfitnessValue2);
                    if(hfitnessValue1 > hfitnessValue2) {
                        optimumFitness = hfitnessValue1;
                    } else {
                        optimumFitness = hfitnessValue2;
                    }
                    console.log("optimum fitness new: " + optimumFitness);

        }

                if(optimumFitness >= threshold) {
                    // Assuming you have a function `redirect` defined elsewhere in your code
                    await this.storeCode(optimumFitness);
                }

    }

    async mutation(){
        console.log("-------------*****-------mutation Initiated****------**********");
        let fitness11;
        let fitness22;

        let startTime;
        let endTime;
        let facultyNameSlot;
        let facultyName;
        let facultyName1;
        let token = 1;
        let fitness1Repo = new Fitness1Repository();
        let facultyRepo = new FacultyRepository();
        let fitness2repo  = new Fitness2Repository();
        let collegeRepo = new CollegeRepository();
        let slotRepo = new SlotRepository();
        for(let mutatechromosome=0; mutatechromosome<2; mutatechromosome++) { 
            for (let i = 0; i < 72; i++) {
                let faculty11;
                let tCode;
                let sCode;

                let random = Math.random();
                let randnum2 = Math.floor(random * 10);   //mutation probability
                //operation for chromosome in fitness1 table
                fitness11 = await fitness1Repo.findByToken(i);
                fitness22 = await fitness2repo.findByToken(i);  

                if(fitness11 && fitness22){

                faculty11 = fitness11.dnaF;  //faculty code of gene
                facultyNameSlot = await facultyRepo.findByCode(faculty11);       //retrieve faculty of gene
                facultyName = facultyNameSlot.className;
                
                tCode = fitness11.dnaT;          //teacher code of gene
                sCode = fitness11.dnaS;          //subject code of gene
   //if condition vitra read nagareko le bahira define gareko
                if (mutatechromosome === 1) {     //mutation operation for chromosome in fitness2
                    let faculty111 = fitness22.dnaF;
                    let facultyNameSlot1 = await facultyRepo.findByCode(faculty111);
                    facultyName = facultyNameSlot1.className;
                    
                    tCode = fitness22.dnaT;
                    sCode = fitness22.dnaS;

                }
                if (randnum2 < 1) {        //mutation operation if it is within the mutation probability i.e. 20%
                    let college = await collegeRepo.findAll();
                    let size = college.length;
                    let randnum3 = Math.floor(Math.random() * size);
                
                    let college1 = await collegeRepo.findCollegeById(randnum3 + 1);
                
                    let facultyCollege = college1.faculty;   //mutated data ko faculty
                
                    let teacherCode = college1.teacherCode;  //mutated data ko teacher code
                    let subjectCode = college1.subjectCode;  //mutated data ko subject code
                
                        if (facultyCollege !== facultyName) { //apply mutation only if faculty matches
                            
                            randnum3 = Math.floor(Math.random() * size);
                            college1 = await collegeRepo.findCollegeById(randnum3 + 1);
                
                            facultyCollege = college1.faculty;
                            teacherCode = college1.teacherCode;
                            subjectCode = college1.subjectCode;
                        } else {
                            if (i >= 0 && i <= 11) {
                                //0-11 denotes 12 components of chromosome which represents routine of tuesday for 3 sections
                                startTime = college1.tueStartTime;
                                endTime = college1.tueEndTime;
                            } else if (i >= 12 && i <= 23) {
                                startTime = college1.wedStartTime;
                                endTime = college1.wedEndTime;
                            } else if (i >= 24 && i <= 35) {
                                startTime = college1.thurStartTime;
                                endTime = college1.thurEndTime;
                            } else if (i >= 36 && i <= 47) {
                                startTime = college1.friStartTime;
                                endTime = college1.friEndTime;
                            } else if (i >= 48 && i <= 59) {
                                startTime = college1.monStartTime;
                                endTime = college1.monEndTime;
                            } else {
                                startTime = college1.sunStartTime;
                                endTime = college1.sunEndTime;
                            }
                            let slot = i % 4;
                            let slotReference = await slotRepo.findSlotById(slot);
                            let slotStartTime = slotReference.startTime;
                            let slotEndTime = slotReference.endTime;
                            if ((slotStartTime >= startTime) && (slotEndTime <= endTime)) {
                                tCode = teacherCode;
                                sCode = subjectCode;
                                break;
                            } else {
                                randnum3 = Math.floor(Math.random() * size);
                                college1 = collegeRepo.findCollegeById(randnum3 + 1);
                                facultyCollege = college1.faculty;
                                teacherCode = college1.teacherCode;
                                subjectCode = college1.subjectCode;
                            }
                        }

                            if (mutatechromosome === 0) {
                                fitness11.dnaT = tCode;
                                fitness11.dnaS = sCode;
                                fitness1Repo.save(fitness11);
                            } else {
                                fitness22.dnaT = tCode;
                                fitness22.dnaS = sCode;
                                fitness2repo.save(fitness22);
                            }
                        }
                    }
                    }
                }
    }

    async hardConstraintF1() {
        let fitnessValue = 0;
        let fitnessValueF11 = 0;
        let dna = [];
        let fitness1Repo = new Fitness1Repository();
        let fitnessList = await fitness1Repo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaT);
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
                        if(fitness1 && fitness2) {
                        if(dna[j] === dna[k] && dna[j] !== "1111111") {
                            //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue;// - 5;
                            fitness1.indicator = 1;
                            fitness2.indicator = 1;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                            fitness2.indicator = 0;
                            fitness1.indicator = 0;
                        }
                        await fitness1Repo.save(fitness1);
                        await fitness1Repo.save(fitness2);
                    }
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
        let collegeRepo = new CollegeRepository();
        let slotRepo = new SlotRepository();
        for(let i = 0; i < 72; i++) {
            let code = await fitness1Repo.findByToken(i);
            if(code){
            let tcode = code.dnaT;
            let presentindicator = code.indicator;
            if (presentindicator === 0){
                let fitness1 = await fitness1Repo.findByToken(i);
                if (tcode !== "1111111") {
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
    
                    let slot = await slotRepo.findSlotById(value);
    
                    let startTime1 = slot.startTime;
                    let endTime1 = slot.endTime;
    
                    if (startTime1 >= startTime && endTime1 <= endTime) {
                        fitnessValue = fitnessValue + 10;
                        fitness1.indicator = 0;
                    } else {
                        fitnessValue = fitnessValue; //- 5;
                        fitness1.indicator = 1;
                    }
                } else {
                    fitnessValue = fitnessValue + 10;
                    fitness1.indicator = 0;
                }
                await fitness1Repo.save(fitness1);
            }
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
        let fitness1List = await fitness1Repo.findAll();
        let fitness1Count = fitness1List.length;
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
            for(let loop = 0; loop < fitness1Count; loop++){
                let comparisonCollege = await fitness1Repo.findByToken(loop); 
                if(comparisonCollege){      //retrieve gene from fitness1 table
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
                    if(presentIndicator === 0) {
                        indicatorWorkLoad = 0;
                    }
                }
                comparisonCollege.indicator = indicatorWorkLoad;
                await fitness1Repo.save(comparisonCollege);
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
                fitnessValue = fitnessValue - 5;// * multiplier;
            }
        }
        return fitnessValue;
    }

    async softConstraintFS1() {
        let fitnessValue1 = 0;
        let dna = [];
        let fitness1Repo = new Fitness1Repository();
        let fitnessList = await fitness1Repo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaS);
        }
        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] === dna[k]){
                        if(dna[j]==="1111111")
                        {
                            fitnessValue1=fitnessValue1+10
                        }
                        else {
                            fitnessValue1 = fitnessValue1 //- 5
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
        let leisure1 = "100000000";
        let i, j;
        let k = 0;
        let fitness1Repo = new Fitness1Repository();
        for(i = 0; i < 18; i++){
            for(j = k; j < k + 4; j++){
                let fitness = await fitness1Repo.findByToken(j);
                if(fitness){
                let subjectCode = fitness.dnaS;
                if (subjectCode === leisure1){
                    if(j != insignificantLocation1 && j != insignificantLocation2) {
                        let fitness1 = await fitness1Repo.findByToken(j - 1);
                        let subjectCode1 = fitness1.dnaS; //Subject code one step behind location j
                        let fitness2 = await fitness1Repo.findByToken(j + 1);
                        let subjectCode2 = fitness2.dnaS; //Subject code one step ahead location j
                        if(subjectCode1 != leisure1 && subjectCode2 != leisure1){
                            fitnessValue = fitnessValue;// - 5;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                        }
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
        let fitness2Repo = new Fitness2Repository();
        let fitnessList = await fitness2Repo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaT);
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
                        
                        let fitness1 = await fitness2Repo.findByToken(j);
                        let fitness2 = await fitness2Repo.findByToken(k);
                        if(fitness1 && fitness2){ //+4 because same slot repeats after duration of 4
                        if(dna[j] === dna[k] && dna[j]!=="1111111"){        //slot comparison for same day same period (teacher code)
                            fitnessValue = fitnessValue; //- 5;
                            fitness1.indicator = 1;
                            fitness2.indicator = 1;
                        }
                        else{
                            fitnessValue = fitnessValue + 10;
                            fitness1.indicator = 0;
                            fitness2.indicator = 0;
                        }
                        await fitness2Repo.save(fitness1);
                        await fitness2Repo.save(fitness2);
                    }
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
        for(let i = 0; i < 72; i++) {
            let code = await fitness2Repo.findByToken(i);
            if(code){
            let tcode = code.dnaT;
            let presentIndicator = code.indicator;
            let fitness1 = await fitness2Repo.findByToken(i);
            fitness1.indicator = presentIndicator;
            if (tcode !== "1111111") {
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
    
                let slot = await slotRepo.findSlotById(value);
    
                let startTime1 = slot.startTime;
                let endTime1 = slot.endTime;
    
                if (startTime1 >= startTime && endTime1 <= endTime) {
                    fitnessValue = fitnessValue + 10;
                    if(presentIndicator == 0) {
                        fitness1.indicator = 0;
                    }
                } else {
                    fitnessValue = fitnessValue; //- 5;
                    fitness1.indicator = 1;
                }
            }
            else{
                fitnessValue = fitnessValue + 10;
                if(presentIndicator == 0) {
                    fitness1.indicator = 0;
                }
            }
            await fitness2Repo.save(fitness1);
        }
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
            let collegeWorkLoad1 = await collegeRepo.findCollegeById(count + 1);
            let teacherCode = collegeWorkLoad1.teacherCode;
            let subjectCode = collegeWorkLoad1.subjectCode;
            let facultyCode1 = collegeWorkLoad1.faculty;
            let facultyCodeClass = await facultyRepo.findByClassName(facultyCode1);
            let facultyCode = facultyCodeClass.code;
            let workAllocated = collegeWorkLoad1.classesPerWeek;
            for(let loop = 0; loop < 72; loop++){
                let comparisonCollege = await fitness2Repo.findByToken(loop); 
                if(comparisonCollege){
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
                await fitness2Repo.save(comparisonCollege);
            }
            }
            if(workAllocated === comparisonCount - 1 || workAllocated === comparisonCount || workAllocated === comparisonCount + 1){
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
                fitnessValue = fitnessValue - 5;// * multiplier;
            }
        }
        return fitnessValue;
    }
    
    async softConstraintFS2() {
        let fitnessValue1 = 0;
        let dna = [];

        let fitness2repo = new Fitness2Repository();
        let fitnessList = await fitness2repo.findAll();
    
        for (let fitness of fitnessList) {
            dna.push(fitness.dnaS);
        }
        let i = 0;
        let ll = i;
        let ul = ll + 3;
        for(i = 0; i < 18; i++){
            for(let j = ll; j < ul; j++){
                for(let k = j + 1; k <= ul; k++){
                    if(dna[j] == dna[k]){
                        if(dna[j] == "100000000") {
                            fitnessValue1 = fitnessValue1 + 10;
                        }
                        else {
                            fitnessValue1 = fitnessValue1; //- 5;
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
        let leisure1 = "100000000";
        let k = 0;
        let fitness2Repo = new Fitness2Repository();
        for(let i = 0; i < 18; i++){
            for(let j = k; j < k + 4; j++){
                let fitness = await fitness2Repo.findByToken(j);
                if(fitness){
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
        let fitness1List = await fitness1Repo.findAll();
        let fitness1Count = fitness1List.length;
        if (fitness1Count > 0){
            for(let i = 0; i < fitness1Count; i++) {
                let fitness1 = await fitness1Repo.findByToken(i);
                if(fitness1){
                    let dnaF = fitness1.dnaF;
                    let dnaT = fitness1.dnaT;
                    let dnaS = fitness1.dnaS;
                    let dnaSl = fitness1.dnaSl;
            
                    wholeCode = dnaF + "." + dnaT + "." + dnaS + "." + dnaSl;
                    myList.push(wholeCode);
                }
            }
        
    
        let chromosome = new ChromosomeRepository();
        chromosome.chromo = myList;
        chromosome.fitness = totalFitness1;
        chromosome.fitnessHard = hfitnessValue1;
        chromosome.fitnessSoft = sfitnessValue1;
        await chromosome.saveChromosome(chromosome);
        await fitness1Repo.deleteAll();
        }
        
        let fitness2Repo = new Fitness2Repository();
        let fitness2List = await fitness2Repo.findAll();
        let fitness2Count = fitness2List.length;
        if (fitness2Count > 0){
            for(let i = 0; i < fitness2Count; i++) {
                let fitness2 = await fitness2Repo.findByToken(i);
                if(fitness2){
                let dnaF = fitness2.dnaF;
                let dnaT = fitness2.dnaT;
                let dnaS = fitness2.dnaS;
                let dnaSl = fitness2.dnaSl;
        
                wholeCode1 = dnaF + "." + dnaT + "." + dnaS + "." + dnaSl;
                myList1.push(wholeCode1);
                }
            }
        
            let chromosome1 = new ChromosomeRepository();
            chromosome1.chromo = myList1;
            chromosome1.fitness = totalFitness2;
            chromosome1.fitnessHard = hfitnessValue2;
            chromosome1.fitnessSoft = sfitnessValue2;
        
            await chromosome1.saveChromosome(chromosome1);
            await fitness2Repo.deleteAll();
        }
    }
    
    async storeCode(optimumFitness) {
        console.log("optimumFitmess:", optimumFitness);
        let chromoRepo = new ChromosomeRepository();
        let chromosome = await chromoRepo.findByFitnessHard(optimumFitness);
        let chromosome1 = chromosome.chromo;
        let size = chromosome1.length;
        let chromos = chromosome.chromo.substring(1, size - 1);
        let gene;
        let dna;
        gene = chromos.split(",");
        for(let i = 0; i < gene.length; i++) {
            dna = gene[i].split(".");
            let finalDna = new FinalDnaRepository();
            finalDna.faculty = dna[0];
            finalDna.teacher = dna[1];
            finalDna.subject = dna[2];
            finalDna.slot = dna[3];
            finalDna.token = i;
    
            await finalDna.save(finalDna);
        }
       await this.storeActualData();
    }

    async storeActualData() {
        let finalDnaRepo = new FinalDnaRepository();
        let slotRepo = new SlotRepository();
        let subjectRepo = new SubjectRepository();
        let facultyRepo = new FacultyRepository();
        let collegeRepo = new CollegeRepository();

        for(let i = 0; i < 72; i++){
            let finalDna = await finalDnaRepo.findByToken(i);
            if(finalDna){
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
                actualData.day = "Sunday";
            } else {
                actualData.day = "Monday";
            }
    
            await actualData.save(actualData);
        }
        }
        // redirect(action: "viewRoutine"); // You'll need to replace this with the equivalent in your Node.js environment
    }
    
}