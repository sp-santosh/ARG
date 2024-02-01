import dataSource from "../../datasource.js";
const teacherRepository = dataSource.getRepository("Teacher");

export class TeacherRepository {
  async saveTeacher(teacher) {
    await teacherRepository.save(teacher);
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
}


