import dataSource from "../../datasource.js";
const facultyRepository = dataSource.getRepository("Faculty");
export class FacultyRepository{
    async findFacultyById(id) {
        return facultyRepository.findOne({ where: { id } });
      }

    async findByClassName(className){
        return facultyRepository.findOne({ where : { className }});
    }
}