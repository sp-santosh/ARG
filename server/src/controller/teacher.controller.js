import { TeacherRepository } from "../database/repositories/teacher.repo.js";

export class TeacherController {
  async saveTeacher(req, res) {
    try {
      const teacher = req.body;

      console.log("payload", teacher);
      // Make sure payload.teacher exists and has the correct structure
      if (!teacher) {
        throw new Error("Teacher data is missing or improperly formatted");
      }
      await new TeacherRepository().saveTeacher(teacher);
      res.status(200).json({
        message: "Teacher created successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error adding teacher." });
    }
  }

  async getTeacherById(req, res) {
    try {
      const teacher = await new TeacherRepository().findTeacherById(
        req.params.id
      );
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async putTeacher(req, res) {
    // TODO FIND AND UPDATE
    try {
      const teacher = req.body;

      await new TeacherRepository().updateTeaher(teacher);
      res.status(200).json({
        message: "Teacher created successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error adding teacher." });
    }
  }

  async deleteTeacher(req, res) {
    try {
      await new TeacherRepository().deleteTeacher(req.params.id);
      res.status(200).json({
        message: "Teacher deleted successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error deleting teacher." });
    }
  }

  async getTeachers(req, res) {
    try {
      const teachers = await new TeacherRepository().findAllTeachers();
      res.status(200).json(teachers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
