import dataSource from "../../datasource.js";
const teacherRepository = dataSource.getRepository("Teacher");

export class TeacherRepository {
  async saveTeacher(teacher) {
    await teacherRepository.save(teacher);
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
