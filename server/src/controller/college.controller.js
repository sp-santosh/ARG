import { CollegeRepository } from "../database/repositories/college.repo.js";
import { FacultyRepository } from "../database/repositories/faculty.repo.js";
import { SubjectRepository } from "../database/repositories/subject.repo.js";
import { TeacherRepository } from "../database/repositories/teacher.repo.js";

export class CollegeController {
  async saveCollege(req, res) {
    try {
      const payload = req.body;

      const faculty = await new FacultyRepository().findFacultyById(
        payload.faculty
      );
      const teacher = await new TeacherRepository().findTeacherById(
        payload.teacher
      );
      const subject = await new SubjectRepository().findSubjectById(
        payload.subject
      );

      let classesPerWeek = 6;

      const days = ["sun", "mon", "tue", "wed", "thur", "fri"];

      for (const day of days) {
        if (teacher[`${day}StartTime`] === "00:00:00") {
          classesPerWeek--;
        }
      }

      const collegeData = {
        faculty: faculty.className,
        semester: subject.semester,
        subjectCode: subject.code,
        subject: subject.name,
        teacherCode: teacher.code,
        teacher: teacher.name,
        shortName: teacher.shortName,
        type: teacher.type,
        sunStartTime: teacher.sunStartTime,
        sunEndTime: teacher.sunEndTime,
        monStartTime: teacher.monStartTime,
        monEndTime: teacher.monEndTime,
        tueStartTime: teacher.tueStartTime,
        tueEndTime: teacher.tueEndTime,
        wedStartTime: teacher.wedStartTime,
        wedEndTime: teacher.wedEndTime,
        thurStartTime: teacher.thurStartTime,
        thurEndTime: teacher.thurEndTime,
        friStartTime: teacher.friStartTime,
        friEndTime: teacher.friEndTime,
        classesPerWeek,
      };

      await new CollegeRepository().saveCollege(collegeData);
      res.status(200).json({
        message: "College Created Successfully!!!",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
