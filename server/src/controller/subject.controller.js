import { SubjectRepository } from "../database/repositories/subject.repo.js";

export class SubjectController {
  async saveSubject(req, res) {
    try {
      const subject = req.body;

      console.log("payload", subject);
      // Make sure payload.subject exists and has the correct structure
      if (!subject) {
        throw new Error("Subject data is missing or improperly formatted");
      }
      await new SubjectRepository().saveSubject(subject);
      res.status(200).json({
        message: "Subject created successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error adding subject." });
    }
  }

  async getSubjectById(req, res) {
    try {
      const subject = await new SubjectRepository().findSubjectById(
        req.params.id
      );
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  async putSubject(req, res) {
    // TODO FIND AND UPDATE
    try {
      const subject = req.body;

      await new SubjectRepository().updateSubject(subject);
      res.status(200).json({
        message: "Subject created successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error adding subject." });
    }
  }

  async deleteSubject(req, res) {
    try {
      await new SubjectRepository().deleteSubject(req.params.id);
      res.status(200).json({
        message: "Subject deleted successfully!",
      });
    } catch (err) {
      console.error("Error object:", err);
      res.status(500).json({ message: "Error deleting teacher." });
    }
  }

  async getSubject(req, res) {
    try {
      const teachers = await new SubjectRepository().findAllTSubject();
      res.status(200).json(teachers);
    } catch (err) {
      res.status(500).json({ message: err.message });subject

    }

}
}
