import Router from "express";
import { TeacherController } from "../controller/teacher.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.post("/",authenticate, teacherController.saveTeacher);

teacherRouter.get("/:id", teacherController.getTeacherById);
