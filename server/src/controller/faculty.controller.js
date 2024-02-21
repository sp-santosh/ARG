import { FacultyRepository } from "../database/repositories/faculty.repo.js";

export class FacultyController {
  async createFaculty() {}
  async updateFaculty() {}
  async deleteFaculty() {}

  async getFaultyById(req, res) {
    try {
      const teacher = await new Facult().findTeacherById(req.params.id);
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getFaculties(req, res) {
    try {
      const faculties = await new FacultyRepository().findAllFaculties();
      res.status(200).json(faculties);
    } catch (err) {
      res.status(500).json({ message: err.message });
      subject;
    }
  }
}
