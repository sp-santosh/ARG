import Router from "express";
import { TeacherController } from "../controller/teacher.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.post("/", authenticate, teacherController.saveTeacher);

teacherRouter.get("/:id", authenticate, teacherController.getTeacherById);
teacherRouter.get("/", authenticate, teacherController.getTeacher);
teacherRouter.put("/:id", authenticate, teacherController.putTeacher);
teacherRouter.delete("/:id", authenticate, teacherController.deleteTeacher);
