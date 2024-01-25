import Router from "express";
import { TeacherController } from "../controller/teacher.controller.js";

export const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.post("/", teacherController.saveTeacher);

teacherRouter.get("/:id", teacherController.getTeacherById);
