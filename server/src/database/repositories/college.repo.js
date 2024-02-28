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
    return await collegeRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await collegeRepository.find();
  }

  async findByCollegeCode(code) {
    return await collegeRepository.findOne({ where: { code } });
  }

  async findByTeacherCode(teacherCode) {
    return await collegeRepository.findOne({ where: { teacherCode } });
  }

  async findByTeacherCodeAndSubjectCodeAndFaculty(teacher, subject, faculty) {
    return await collegeRepository.findOne({
      where: { teacherCode: teacher, subjectCode: subject, faculty: faculty },
    });
  }
}
