import dataSource from "../../datasource.js";
const teacherRepository = dataSource.getRepository("Teacher");
// Function to convert integer to binary
function intToBinary(n) {
  return n.toString(2);
}
export class TeacherRepository {
  async saveTeacher(teacher) {
    const test = await teacherRepository.save({...teacher,code:"-"});
    const binaryCode=intToBinary(test.id);

    console.log({test,binaryCode});
    await teacherRepository.update(Number(test.id), {...teacher,code:binaryCode});
  }

  async updateTeaher(teacher) {
    const teacherFound = await teacherRepository.findOne({
      where: { id: teacher.id },
    });

    await teacherRepository.update(Number(teacher.id), teacher);
  }

  async findTeacherById(id) {
    return teacherRepository.findOne({ where: { id } });
  }

  async findTeacherByName(name) {
    return teacherRepository.findOne({ where: { name } });
  }

  async findAllTeachers() {
    return teacherRepository.find();
  }

  async deleteTeacher(id) {
    const teacher = await teacherRepository.findOne({ where: { id } });

    return teacherRepository.remove(teacher);
  }
}
