import dataSource from "../../datasource.js";
const collegeRepository = dataSource.getRepository("College");
export class CollegeRepository{
    async findCollegeById(id) {
        return collegeRepository.findOne({ where: { id } });
      }
    
      async findAll(){
        return collegeRepository.find();
      }

      async findByCollegeCode(code){
        return collegeRepository.findOne({where : { code }});
      }

      async findByTeacherCode(teacherCode){
        return collegeRepository.findOne({where : {teacherCode}});
      }

      async findByTeacherCodeAndSubjectCodeAndFaculty(teacher, subject, faculty){
        return await collegeRepo.findOne({where : {teacherCode: teacher, subjectCode: subject, faculty: faculty}});
    }
}