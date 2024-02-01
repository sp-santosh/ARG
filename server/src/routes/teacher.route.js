import Router from "express";
import { TeacherController } from "../controller/teacher.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.post("/",authenticate, teacherController.saveTeacher);

teacherRouter.get("/:id", teacherController.getTeacherById);
teacherRouter.get("/", teacherController.getTeachers);
teacherRouter.put("/:id", authenticate, teacherController.putTeacher);
teacherRouter.delete("/:id", authenticate, teacherController.deleteTeacher)