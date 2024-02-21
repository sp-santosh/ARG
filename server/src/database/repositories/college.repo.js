import dataSource from "../../datasource.js";
const collegeRepository = dataSource.getRepository("College");

function intToBinary(n) {
  return n.toString(2);
}
export class CollegeRepository {
  async saveCollege(college) {
    const initialSave = await collegeRepository.save({ ...college, code: "-" });

    const binaryCode = intToBinary(initialSave.id);

    return await collegeRepository.update(Number(initialSave.id), {
      code: binaryCode,
    });
  }

  async findCollegeById(id) {
    return collegeRepository.findOne({ where: { id } });
  }

  async findAll() {
    return collegeRepository.find();
  }

  async findByCollegeCode(code) {
    return collegeRepository.findOne({ where: { code } });
  }

  async findByTeacherCode(teacherCode) {
    return collegeRepository.findOne({ where: { teacherCode } });
  }

  async findByTeacherCodeAndSubjectCodeAndFaculty(teacher, subject, faculty) {
    return await collegeRepo.findOne({
      where: { teacherCode: teacher, subjectCode: subject, faculty: faculty },
    });
  }
}
