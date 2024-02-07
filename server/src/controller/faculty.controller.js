export class FacultyController {
    async getFaculties() {}
    async createFaculty() {}
    async updateFaculty() {}
    async deleteFaculty() {}

    async getFaultyById(req, res) {
        try {
          const teacher = await new Facult().findTeacherById(
            req.params.id
          );
          res.status(200).json(teacher);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}