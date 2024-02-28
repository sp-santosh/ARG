import dataSource from "../../datasource.js";
const facultyRepository = dataSource.getRepository("Faculty");
export class FacultyRepository {
  async findFacultyById(id) {
    return await facultyRepository.findOne({ where: { id } });
  }

  async findByClassName(className) {
    return await facultyRepository.findOne({ where: { className } });
  }

  async findByCode(code) {
    return await facultyRepository.findOne({ where: { code } });
  }

  async findAllFaculties() {
    return await facultyRepository.find();
  }
}
